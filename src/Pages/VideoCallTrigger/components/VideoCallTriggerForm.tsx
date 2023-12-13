import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "Pages/Loader/Loader";
import Error from "Pages/Error/Error";
import VideoRoom from "./VideoRoom";
import useSBAuthenticate from "../hooks/useSBAuthenticate";

const VideoCallTriggerForm = () => {
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
    console.log(error);
    return <Error />;
  }

  return (
    <div>
      {room && (
        <div className="video-call-wrapvideo">
          <VideoRoom room={room} />
        </div>
      )}
    </div>
  );
};

export default memo(VideoCallTriggerForm);
