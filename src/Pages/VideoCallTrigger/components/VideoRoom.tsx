import { useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import Overlay from "components/atoms/Overlay";
import GroupCall from "components/organisms/GroupCall";
import { StatefulRoom, useSbCalls } from "lib/sendbird-calls";

const VideoRoom = ({ room }: { room: StatefulRoom }) => {
  const [isEnter, setIsEnter] = useState(false);
  const { rooms } = useSbCalls();

  const onCall = useMemo(
    () => rooms.find((r) => !!r.localParticipant),
    [rooms]
  );

  const onExit = () => {
    room.exit();
  };

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
        });
    };

    if (!isEnter) enter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isEnter) return null;
  return (
    <>
      {onCall && (
        <Overlay>
          <GroupCall room={onCall} />
        </Overlay>
      )}
      <Button onClick={onExit}>Exit</Button>
    </>
  );
};

export default VideoRoom;
