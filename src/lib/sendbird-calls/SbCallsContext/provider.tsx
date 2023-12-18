import {
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import type { AuthOption } from "sendbird-calls";
import SendbirdCall, { LoggerLevel, RoomType } from "sendbird-calls";
import { useAlert } from "context/Alert";
import CallContext, { initialContext } from "./context";
import type { ContextType } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./state";
import { statefyRoom } from "./statefy";

/**
 * Provider
 * ```tsx
 * <SbCallsProvider>
 *   <MyApp />
 * </Auth0Provider>
 * ```
 *
 * Provides the SbCallsProvider to its child components.
 */
const SbCallsProvider = ({
  appId,
  children,
}: {
  appId: string;
  children: ReactElement;
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { show } = useAlert();

  // Sendbird initilize
  const init = useCallback<ContextType["init"]>((nAppId) => {
    const listenerId = "device-change-listener";
    try {
      SendbirdCall.removeListener(listenerId);
    } catch (error) {
      console.log("SendbirdCall is not initialized yet to remove listener");
    }
    try {
    SendbirdCall.init(nAppId);
    SendbirdCall.setLoggerLevel(LoggerLevel.ERROR);
    SendbirdCall.addListener(listenerId, {
      onAudioInputDeviceChanged: (current, available) => {
        dispatch({
          type: "UPDATE_AUDIO_INPUT_DEVICE_INFO",
          payload: { current, available },
        });
      },
      onAudioOutputDeviceChanged: (current, available) => {
        dispatch({
          type: "UPDATE_AUDIO_OUTPUT_DEVICE_INFO",
          payload: { current, available },
        });
      },
      onVideoInputDeviceChanged: (current, available) => {
        dispatch({
          type: "UPDATE_VIDEO_INPUT_DEVICE_INFO",
          payload: { current, available },
        });
      },
    });
    SendbirdCall.updateMediaDevices({ audio: true, video: true });
  }
  catch {
    throw new Error('Sendbird not initialized');
  }
  }, []);

  useEffect(() => {
    if (appId) init(appId);
  }, [appId, init]);

  // Sendbird AUthentication
  const ringingListenerId = 'sb-call-listener';
  const auth = useCallback(async (authOption: AuthOption) => {
    try {
    const user = await SendbirdCall.authenticate(authOption);
    SendbirdCall.addListener(ringingListenerId, {
      onAudioInputDeviceChanged: (current, available) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
      onAudioOutputDeviceChanged: (current, available) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
      onVideoInputDeviceChanged: (current, available) => {},// eslint-disable-line @typescript-eslint/no-unused-vars
    });
    try {
    // Connect web socket
    await SendbirdCall.connectWebSocket();
    }
    catch {
      throw new Error('Socket fails');
    }
    dispatch({ type: "AUTH", payload: user });
    return user;
  }
  catch(err)
  {
    throw new Error("Authentication failure");
  }
  }, []);

  // Authentication deactivate
  const deauth = useCallback<ContextType["deauth"]>(() => {
    try {
    SendbirdCall.removeListener(ringingListenerId);
    SendbirdCall.deauthenticate();
    dispatch({ type: "DEAUTH" });
  }
  catch {
    throw new Error('Authentication deactivate');
  }
  }, []);

  /*
    Media Device Control
   */
  const updateMediaDevices = useCallback<ContextType["updateMediaDevices"]>(
    (constraints) => {
      try {
      SendbirdCall.updateMediaDevices(constraints);
      }
      catch {
        throw new Error('Error occurs while updating media device');
      }
    },
    []
  );

  const selectAudioInputDevice = useCallback<
    ContextType["selectAudioInputDevice"]
  >((mediaInfo: InputDeviceInfo) => {
    try {
    SendbirdCall.selectAudioInputDevice(mediaInfo);
    dispatch({
      type: "UPDATE_AUDIO_INPUT_DEVICE_INFO",
      payload: { current: mediaInfo },
    });
  }
  catch {
    throw new Error('Error occurs while updating audio input device');
  }
  }, []);

  const selectAudioOutputDevice = useCallback<
    ContextType["selectAudioOutputDevice"]
  >((mediaInfo: MediaDeviceInfo) => {
    try {
    SendbirdCall.selectAudioOutputDevice(mediaInfo);
    dispatch({
      type: "UPDATE_AUDIO_OUTPUT_DEVICE_INFO",
      payload: { current: mediaInfo },
    });
  }
  catch {
    throw new Error('Error occurs while updating audio output device');
  }
  }, []);

  const selectVideoInputDevice = useCallback<
    ContextType["selectVideoInputDevice"]
  >((mediaInfo: InputDeviceInfo) => {
    try {
    SendbirdCall.selectVideoInputDevice(mediaInfo);
    dispatch({
      type: "UPDATE_VIDEO_INPUT_DEVICE_INFO",
      payload: { current: mediaInfo },
    });
  }
  catch {
    throw new Error('Error occurs while updating video input device');
  }
  }, []);

  /*
    Rooms
   */
  const getCachedRoomById = useCallback<ContextType["getCachedRoomById"]>(
    (roomId) => state.rooms.find((x) => x.roomId === roomId),
    [state.rooms]
  );

  const fetchRoomById = useCallback<ContextType["fetchRoomById"]>(
    async (roomId) => {
      try {
      const room = await SendbirdCall.fetchRoomById(roomId);
      const statefulRoom = statefyRoom(room, dispatch, show);
      if (state.rooms.find((x) => x.roomId === room.roomId)) {
        dispatch({ type: "UPDATE_ROOM", payload: statefulRoom });
      } else {
        dispatch({ type: "ADD_ROOM", payload: statefulRoom });
      }
      return statefulRoom;
    }
    catch(err) {
      throw new Error("Error occurs while fetching the room");
    }
    },
    [state.rooms, show]
  );
  const callContext: ContextType = {
    ...initialContext,
    ...state,
    init,
    auth,
    deauth,
    isAuthenticated: !!state.user,

    // Media Device Control
    updateMediaDevices,
    selectAudioInputDevice,
    selectAudioOutputDevice,
    selectVideoInputDevice,

    // Rooms
    getCachedRoomById,
    fetchRoomById,
    RoomType,
  };

  return (
    <CallContext.Provider value={callContext}>{children}</CallContext.Provider>
  );
};

export default SbCallsProvider;
