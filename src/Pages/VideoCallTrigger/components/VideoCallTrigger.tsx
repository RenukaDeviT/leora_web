import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "Pages/Loader/Loader";
import Error from "Pages/Error/Error";
import VideoRoom from "./VideoRoom";
import useSBAuthenticate from "../hooks/useSBAuthenticate";
import StyledVideoCall from "../VideoCall.styles";

const VideoCallTrigger = () => {
  // Get values from query string
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  const { isLoading, error, room } = useSBAuthenticate({ type, id, sessionId });

  if (error) {
    console.log(error);
    return <Error />;
  }

  if (isLoading || !room) {
    return <Loader />;
  }

  return (
    <StyledVideoCall className="video-call-main">
      <VideoRoom room={room} />
    </StyledVideoCall>
  );
};

export default memo(VideoCallTrigger);
