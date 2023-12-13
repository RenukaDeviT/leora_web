import {
  CallButton,
  EndButton,
  MuteButton,
  SettingsButton,
  StartVideoButton,
  StopVideoButton,
  UnmuteButton,
} from "components/atoms/CallButtons";
import DeviceSettings from "components/organisms/DeviceSettings";
import MediaContent from "components/organisms/GroupCall/MediaContent";
import type { StatefulRoom } from "lib/sendbird-calls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { routePaths } from "utils/constants";

// Styles for the page
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--navy-900);
  display: flex;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const Footer = styled.div`
  height: 88px;
  padding: 0 48px;
  background-color: black;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

const UtilityButtons = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  ${CallButton} {
    width: 30px;
    height: 30px;
    background-size: 24px 24px;
    padding: 12px;
  }
`;

type GroupCallProps = {
  room: StatefulRoom;
};
const GroupCall = ({ room }: GroupCallProps) => {
  const [showDeviceSettings, setShowDeviceSettings] = useState(false);
  const { participants, localParticipant, remoteParticipants } = room; // eslint-disable-line @typescript-eslint/no-unused-vars

  const navigate = useNavigate();

  const onExit = () => {
    room.exit();
    navigate(routePaths.endSession);
  };

  return (
    <Wrapper>
      <Main>
        <MediaContent room={room} />

        <Footer>
          <UtilityButtons>
            <SettingsButton onClick={() => setShowDeviceSettings(true)} />
            {localParticipant.isAudioEnabled ? (
              <MuteButton onClick={() => localParticipant.muteMicrophone()} />
            ) : (
              <UnmuteButton
                onClick={() => localParticipant.unmuteMicrophone()}
              />
            )}
            {localParticipant.isVideoEnabled ? (
              <StopVideoButton onClick={() => localParticipant.stopVideo()} />
            ) : (
              <StartVideoButton onClick={() => localParticipant.startVideo()} />
            )}
            <EndButton onClick={onExit} />
          </UtilityButtons>
        </Footer>
        <DeviceSettings
          isOpen={showDeviceSettings}
          close={() => setShowDeviceSettings(false)}
        />
      </Main>
    </Wrapper>
  );
};

export default GroupCall;
