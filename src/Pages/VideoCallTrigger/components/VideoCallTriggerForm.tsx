import { memo } from "react";
import { useSearchParams } from "react-router-dom";
// import CryptoJS, { AES } from 'crypto-js';
// import { decryption } from 'utils/constants';
import Loader from "Pages/Loader/Loader";
import Error from "Pages/Error/Error";
import VideoRoom from "./VideoRoom";
import useSBAuthenticate from "../hooks/useSBAuthenticate";

// const key = CryptoJS.enc.Hex.parse(decryption.key);
// const iv = CryptoJS.enc.Utf8.parse(decryption.iv);

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
          <div className="video-call-containervideo">
            <VideoRoom room={room} />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(VideoCallTriggerForm);
