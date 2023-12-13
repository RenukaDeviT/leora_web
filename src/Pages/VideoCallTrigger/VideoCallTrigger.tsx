import { memo } from "react";
import StyledVideoCallTrigger from "./VideoCallTrigger.styles";
import VideoCallTriggerForm from "./components/VideoCallTriggerForm";

const VideoCallTrigger = () => (
  <StyledVideoCallTrigger className="video-call-main">
    <VideoCallTriggerForm />
  </StyledVideoCallTrigger>
);

export default memo(VideoCallTrigger);
