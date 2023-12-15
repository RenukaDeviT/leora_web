import type {
  User as SBUser,
} from 'sendbird-calls';

import type {
  AudioInputDeviceInfo,
  AudioOutputDeviceInfo,
  VideoInputDeviceInfo,
  StatefulRoom,
} from './types';

/** Types */
export type State = {
  readonly user?: SBUser;
  readonly rooms: StatefulRoom[];
  readonly audioInputDeviceInfo: AudioInputDeviceInfo,
  readonly audioOutputDeviceInfo: AudioOutputDeviceInfo,
  readonly videoInputDeviceInfo: VideoInputDeviceInfo,
};

/** State */
export const initialState: State = {
  user: undefined,
  rooms: [],
  audioInputDeviceInfo: { current: undefined, available: [] },
  audioOutputDeviceInfo: { current: undefined, available: [] },
  videoInputDeviceInfo: { current: undefined, available: [] },
};
