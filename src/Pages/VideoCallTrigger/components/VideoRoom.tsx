import { useEffect, useMemo, useState } from "react";
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
        .catch((error) => {
          setError(error);
        });
    };

    if (!isEnter) enter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    console.log(error);
    return <Error />;
  }

  if (!isEnter) return null;
  return (
    <>
      {onCall && (
        <div className="video-call-wrapvideo">
          <Overlay>
            <GroupCall room={onCall} />
          </Overlay>
        </div>
      )}
    </>
  );
};

export default VideoRoom;
