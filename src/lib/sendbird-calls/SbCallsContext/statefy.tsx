import type { LocalParticipant, RemoteParticipant, Room } from 'sendbird-calls';
import type { Action } from './reducer';
import type {
  StatefulLocalParticipant,
  StatefulRemoteParticipant,
  StatefulRoom,
} from './types';

export const statefyRoom = (
  room: Room,
  dispatch: React.Dispatch<Action>
): StatefulRoom => {
  const dispatchUpdate = (part: Partial<StatefulRoom>) => {
    const payload = {
      roomId: room.roomId,
      ...part,
    };
    dispatch({ type: 'UPDATE_ROOM', payload });
  };

  const updateRoom = () => {
    dispatchUpdate(statefyRoom(room, dispatch));
  };

  const updateLocalParticipant = (participant: Partial<StatefulLocalParticipant>) => {
    dispatch({
      type: 'UPDATE_ROOM_LOCAL_PARTICIPANT',
      payload: {
        roomId: room.roomId,
        participant,
      },
    });
  };
  const upsertRemoteParticipant = (participant: RemoteParticipant) => {
    dispatch({
      type: 'UPSERT_ROOM_REMOTE_PARTICIPANT',
      payload: {
        roomId: room.roomId,
        participant: statefyRemoteParticipant(participant),
      },
    });
  };

  const deleteRemoteParticipant = (participant: RemoteParticipant) => {
    dispatch({
      type: 'DELETE_ROOM_REMOTE_PARTICIPANT',
      payload: {
        roomId: room.roomId,
        participantId: participant.participantId,
      }
    })
  }

  const statefulLocalParticipants = room.localParticipant ? [statefyLocalParticipant(room.localParticipant, updateLocalParticipant)] : [];
  const statefulRemoteParticipants = room.remoteParticipants.map(statefyRemoteParticipant);
  const statefulParticipants = [...statefulLocalParticipants, ...statefulRemoteParticipants];

  room.on('remoteParticipantEntered', upsertRemoteParticipant);
  room.on('remoteParticipantStreamStarted', upsertRemoteParticipant);
  room.on('remoteParticipantExited', deleteRemoteParticipant);
  room.on('remoteAudioSettingsChanged', upsertRemoteParticipant);
  room.on('remoteVideoSettingsChanged', upsertRemoteParticipant);
  room.on('error', error => {
    // show(error.message, "error");
    localStorage.clear();
    localStorage.setItem('error', error.message);
    window.location.href = "/error";
  });
  return {
    roomId: room.roomId,
    roomType: room.roomType,
    createdAt: room.createdAt,
    createdBy: room.createdBy,
    participants: statefulParticipants,
    localParticipant: statefulLocalParticipants[0],
    remoteParticipants: statefulRemoteParticipants,
    enter(params) {
      return room.enter(params).then(() => {
        updateRoom();
      }).catch((error) => { 
        throw error.message;
      });
    },
    exit() {
      try {
      room.exit();
      updateRoom();
      }
      catch(error: any) {                
        localStorage.clear();
        localStorage.setItem('error', error);
        window.location.href = "/error";
      }
    },
  };
};

export const statefyLocalParticipant = (
  participant: LocalParticipant,
  update: (participant: Partial<StatefulLocalParticipant>) => any,
): StatefulLocalParticipant => {// eslint-disable-line arrow-body-style
  return {
    participantId: participant.participantId,
    enteredAt: participant.enteredAt,
    updatedAt: participant.updatedAt,
    exitedAt: participant.exitedAt,
    duration: participant.duration,
    isLocalParticipant: participant.isLocalParticipant,
    state: participant.state,
    user: participant.user, // TODO: Statefy user
    isAudioEnabled: participant.isAudioEnabled,
    isVideoEnabled: participant.isVideoEnabled,
    setMediaView(mediaView: HTMLMediaElement) {
      return participant.setMediaView(mediaView);
    },
    setLocalMediaView(mediaView: HTMLMediaElement) {
      return participant.setLocalMediaView(mediaView);
    },
    muteMicrophone() {
      participant.muteMicrophone();
      update({ isAudioEnabled: false });
    },
    unmuteMicrophone() {
      participant.unmuteMicrophone();
      update({ isAudioEnabled: true });
    },
    startVideo() {
      participant.startVideo();
      update({ isVideoEnabled: true });
    },
    stopVideo() {
      participant.stopVideo();
      update({ isVideoEnabled: false });
    },
  };
};

export const statefyRemoteParticipant = (
  participant: RemoteParticipant,
): StatefulRemoteParticipant => {// eslint-disable-line arrow-body-style
  return {
    participantId: participant.participantId,
    enteredAt: participant.enteredAt,
    updatedAt: participant.updatedAt,
    exitedAt: participant.exitedAt,
    duration: participant.duration,
    isLocalParticipant: participant.isLocalParticipant,
    state: participant.state,
    user: participant.user, // TODO: Statefy user
    isAudioEnabled: participant.isAudioEnabled,
    isVideoEnabled: participant.isVideoEnabled,
    setMediaView(mediaView: HTMLMediaElement) {
      return participant.setMediaView(mediaView);
    },
  };
};

