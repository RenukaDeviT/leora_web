import {
  CallButton,
  EndButton,
  MuteButton,
  StartVideoButton,
  StopVideoButton,
  UnmuteButton,
} from "components/atoms/CallButtons";
import DeviceSettings from "components/organisms/DeviceSettings";
import MediaContent from "components/organisms/GroupCall/MediaContent";
import type { StatefulRoom } from "lib/sendbird-calls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { heavy, normal } from "ui/styles/font";
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
  justify-content: space-between;
  z-index: 10;
`;

const Button = styled.div`
  width: 80px;
  height: 50px;
  padding: 20px 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  ${normal};
  ${heavy}: letter-spacing: -0.1px;
  color: var(--white);
  margin-right: auto;
`;

const ButtonIcon = styled.div<{ src: string }>`
  background-image: ${(props) => css`url(${props.src})`};
  background-repeat: no-repeat;
  background-position: center;
  width: 24px;
  height: 24px;
`;

const UtilityButtons = styled.div`
  margin-right: auto;
  height: 100%;
  display: flex;
  align-items: center;
  ${CallButton} {
    width: 48px;
    height: 48px;
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
          <Button onClick={() => setShowDeviceSettings(true)}>
            <ButtonIcon src="/icons/ic-settings.svg" />
            Settings
          </Button>
          <UtilityButtons>
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
