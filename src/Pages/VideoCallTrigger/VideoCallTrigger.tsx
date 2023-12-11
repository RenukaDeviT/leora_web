import { memo } from 'react';
import VideoCallHeader from './components/VideoCallHeader';
import VideoCallImages from './components/VideoCallImages';
import StyledVideoCallTrigger from './VideoCallTrigger.styles';
import VideoCallTriggerForm from './components/VideoCallTriggerForm';

const VideoCallTrigger = () => (
    <StyledVideoCallTrigger className="sign-in">
      <VideoCallHeader />
      <VideoCallTriggerForm />
      <VideoCallImages />
    </StyledVideoCallTrigger>
  );

export default memo(VideoCallTrigger);
