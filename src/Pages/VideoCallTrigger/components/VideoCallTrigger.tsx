import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import Loader from "Pages/Loader/Loader";
import Error from "Pages/Error/Error";
import ReconnectLoader from "Pages/ReconnectLoader/ReconnectLoader";
import { ErrorBoundary } from "react-error-boundary";
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (isLoading || !room) {
    return <Loader />;
  }

  return (
      <div>
        <ErrorBoundary fallback={<Error />}>        
          <Offline>
            <ReconnectLoader />
          </Offline>
          <Online>
          <StyledVideoCall className="video-call-main">
            <VideoRoom room={room} />
          </StyledVideoCall>
          </Online>
        </ErrorBoundary>
      </div>
  );
};

export default memo(VideoCallTrigger);
