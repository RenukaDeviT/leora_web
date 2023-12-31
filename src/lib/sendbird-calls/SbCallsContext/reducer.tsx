import { castDraft, produce } from 'immer';
import type { User as SBUser } from 'sendbird-calls';
import type { State } from './state';
import { initialState } from './state';
import type {
  StatefulRoom,
  AudioInputDeviceInfo,
  AudioOutputDeviceInfo,
  VideoInputDeviceInfo,
  StatefulLocalParticipant,
  StatefulRemoteParticipant,
} from './types';

/** Actions */
export type Action =
  | { type: 'AUTH'; payload: SBUser; }
  | { type: 'DEAUTH'; }
  | { type: 'ADD_ROOM'; payload: StatefulRoom; }
  | { type: 'UPDATE_ROOM', payload: Partial<StatefulRoom>; }
  | { type: 'UPDATE_ROOM_LOCAL_PARTICIPANT', payload: { roomId: string; participant: Partial<StatefulLocalParticipant>; }; }
  | { type: 'UPSERT_ROOM_REMOTE_PARTICIPANT', payload: { roomId: string; participant: Partial<StatefulRemoteParticipant>; }; }
  | { type: 'DELETE_ROOM_REMOTE_PARTICIPANT', payload: { roomId: string; participantId: string; }; }
  | { type: 'CLEAR_ROOMS'; }
  | { type: 'UPDATE_AUDIO_INPUT_DEVICE_INFO'; payload: Partial<AudioInputDeviceInfo>; }
  | { type: 'UPDATE_AUDIO_OUTPUT_DEVICE_INFO'; payload: Partial<AudioOutputDeviceInfo>; }
  | { type: 'UPDATE_VIDEO_INPUT_DEVICE_INFO'; payload: Partial<VideoInputDeviceInfo>; }

/** Reducer */
export const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case 'AUTH':
      return produce(prevState, draft => {
        const conx = draft;
        conx.user = action.payload;
      });
    case 'DEAUTH':
      return initialState;
    case 'ADD_ROOM':
      return produce(prevState, draft => {
        draft.rooms.push(castDraft(action.payload));
      });
    case 'UPDATE_ROOM':
      return produce(prevState, draft => {
        const index = draft.rooms.findIndex(c => c.roomId === action.payload.roomId);
        if (index === -1) return;
        Object.assign(draft.rooms[index], castDraft(action.payload));
      });
    case 'UPDATE_ROOM_LOCAL_PARTICIPANT':
      return produce(prevState, draft => {
        const { roomId, participant } = action.payload;
        const room = draft.rooms.find(c => c.roomId === roomId);
        if (!room) return;

        const pIndex = room.participants.findIndex(p => p.participantId === room.localParticipant.participantId);

        Object.assign(room.localParticipant, castDraft(participant));
        Object.assign(room.participants[pIndex], castDraft(participant));
      });
    case 'UPSERT_ROOM_REMOTE_PARTICIPANT':
      return produce(prevState, draft => {
        const { roomId, participant } = action.payload;
        const room = draft.rooms.find(c => c.roomId === roomId);
        if (!room) return;

        const index = room.remoteParticipants.findIndex(p => p.participantId === participant.participantId);
        const pIndex = room.participants.findIndex(p => p.participantId === participant.participantId);
        if (index === -1) {
          const srp = castDraft(participant as StatefulRemoteParticipant);
          room.remoteParticipants.push(srp);
          room.participants.push(srp);
          return;
        }

        Object.assign(room.remoteParticipants[index], castDraft(participant));
        Object.assign(room.participants[pIndex], castDraft(participant));
      });
    case 'DELETE_ROOM_REMOTE_PARTICIPANT':
      return produce(prevState, draft => {
        const { roomId, participantId } = action.payload;
        const room = draft.rooms.find(c => c.roomId === roomId);
        if (!room) return;
        const index = room.remoteParticipants.findIndex(p => p.participantId === participantId);
        if (index === -1) return;
        room.remoteParticipants.splice(index, 1);

        const pIndex = room.participants.findIndex(p => p.participantId === participantId);
        if (index === -1) return;
        room.participants.splice(pIndex, 1);
      });
    case 'CLEAR_ROOMS':
      return produce(prevState, draft => {
        const conx = draft;
        conx.rooms = castDraft(initialState.rooms);
      });
    case 'UPDATE_AUDIO_INPUT_DEVICE_INFO':
      return produce(prevState, draft => {
        const conx = draft;
        conx.audioInputDeviceInfo = { ...prevState.audioInputDeviceInfo, ...action.payload };
      });
    case 'UPDATE_AUDIO_OUTPUT_DEVICE_INFO':
      return produce(prevState, draft => {
        const conx = draft;
        conx.audioOutputDeviceInfo = { ...prevState.audioOutputDeviceInfo, ...action.payload };
      });
    case 'UPDATE_VIDEO_INPUT_DEVICE_INFO':
      return produce(prevState, draft => {
        const conx = draft;
        conx.videoInputDeviceInfo = { ...prevState.videoInputDeviceInfo, ...action.payload };
      });
    default:
      return prevState;
  }
};
