import { useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Overlay from "components/atoms/Overlay";
import GroupCall from "components/organisms/GroupCall";
import { StatefulRoom, useSbCalls } from "lib/sendbird-calls";
import Error from "Pages/Error/Error";

const VideoRoom = ({ room }: { room: StatefulRoom }) => {
  const [isEnter, setIsEnter] = useState(false);
  const { rooms } = useSbCalls();

  const [error, setError] = useState(false);

  const onCall = useMemo(
    () => rooms.find((r) => !!r.localParticipant),
    [rooms]
  );

  useEffect(() => {
    const enter = async () => {
      room
        .enter({
          audioEnabled: true,
          videoEnabled: true,
          kickSiblings: true,
        })
        .then(() => {
          setIsEnter(() => true);
        })
        .catch((error: string) => {
          if (error.includes("The given client is already entered")) {
            room.exit();
            enter();
          } else if (error.includes("client has already entered")) {
            enter();
          } else setError(true);
        });
    };

    if (!isEnter) enter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <Error />;
  }

  if (!isEnter) return null;
  return (
    <>
      <ErrorBoundary fallback={<Error />}>
        {onCall && (
          <div className="video-call-wrapvideo">
            <Overlay className="video-container">
              <GroupCall room={onCall} />
            </Overlay>
          </div>
        )}
      </ErrorBoundary>
    </>
  );
};

export default VideoRoom;
