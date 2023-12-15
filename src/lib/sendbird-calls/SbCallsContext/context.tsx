import { createContext } from 'react';
import SendbirdCall, { RoomType } from 'sendbird-calls';
import { State, initialState } from './state';
import type { StatefulRoom } from './types';

/** Context */
export type ContextType = State & {
  isAuthenticated: boolean;
  init: (appId: string) => void;
  auth: typeof SendbirdCall.authenticate; // TODO: Stateful SbUser
  deauth: () => void;

  // Media Device Control
  updateMediaDevices: (constraints: { audio: boolean; video: boolean; }) => void;
  selectAudioInputDevice: (deviceInfo: InputDeviceInfo) => void;
  selectAudioOutputDevice: (deviceInfo: MediaDeviceInfo) => void;
  selectVideoInputDevice: (deviceInfo: InputDeviceInfo) => void;

  // Rooms
  getCachedRoomById: (roomId: string) => StatefulRoom | undefined,
  fetchRoomById: (roomId: string) => Promise<StatefulRoom>,
  RoomType: typeof RoomType,
};

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <AuthContext>.');
};

export const initialContext: ContextType = {
  ...initialState,
  isAuthenticated: false,
  init: stub,
  auth: stub,
  deauth: stub,

  // Media Device Control
  updateMediaDevices: stub,
  selectAudioInputDevice: stub,
  selectAudioOutputDevice: stub,
  selectVideoInputDevice: stub,

  // Rooms
  getCachedRoomById: stub,
  fetchRoomById: stub,
  RoomType,
};

const CallContext = createContext<ContextType>(initialContext);

export default CallContext;
