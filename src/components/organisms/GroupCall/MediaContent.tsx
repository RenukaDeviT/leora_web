import { useEffect, useState } from "react";
import {
  useSbCalls,
  type StatefulRoom,
} from "lib/sendbird-calls/SbCallsContext";
import styled, { css } from "styled-components";
import { normal } from "ui/styles/font";

// eslint no-useless-concat: "error"
const ParticipantsRow = styled.div<{ rows: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 15px;
  max-height: ${(props) => Math.ceil(100 / props.rows)}%;
  margin-bottom: 4px;
  &:last-child {
    margin-bottom: 0px;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ParticipantView = styled.div<{
  rows: number;
  width: number;
  height: number;
  isLocal?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--navy-800);
  border-radius: 20px;
  overflow: hidden;
  &:before {
    display: block;
    content: "";
    padding-top: 75%; /*What you want the height to be in relation to the width*/
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const ParticipantInfo = styled.div`
  display: flex;
  font-family: "Poppins", sans-serif;
  align-items: center;
  position: absolute;
  left: 15px;
  bottom: 15px;
  height: 24px;
  padding: 2px 8px;
  background-color: rgba(33, 34, 66, 0.7);
  border-radius: 5px;
  ${normal};
  color: var(--white);
  text-transform: uppercase;
`;

export const ParticipantOverlay = styled.div<{ fillBlack?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: var(--navy-800);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  ${(props) =>
    props.fillBlack
      ? css`
          background-color: black;
        `
      : ""};
`;

export const Avatar = styled.div<{ url?: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-image: url(${(props) =>
    props.url ? props.url : "/icons/icon-avatar.svg"});
`;

const ParticipantMutedIcon = styled.div`
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(/icons/icon-audio-off.svg);
  margin-right: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  max-height: calc(100vh - 40px - 88px);
  @media (max-width: 600px) {
    max-height: calc(100vh - 90px - 88px);
  }
  padding: 16px;
  > ${ParticipantView} {
    width: 100%;
  }
`;

type Props = { room: StatefulRoom };
const MediaContent = ({ room }: Props) => {
  const { participants, localParticipant, remoteParticipants } = room;
  const sbCalls = useSbCalls();
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
  }, []);

  if (!remoteParticipants.length) {
    const p = localParticipant;
    return (
      <Wrapper>
        <ParticipantView
          key={p.participantId}
          rows={1}
          width={windowDimensions.width}
          height={windowDimensions.height}
        >
          {/* eslint-disable jsx-a11y/media-has-caption */}
          {sbCalls.videoInputDeviceInfo.current?.deviceId ? (
            <video
              autoPlay
              playsInline
              muted={p.participantId === localParticipant.participantId}
              ref={(el) => {
                if (!el) return;
                p.setMediaView(el);
              }}
            />
          ) : (
            <ParticipantOverlay
              style={{ fontFamily: "'Poppins',sans-serif", color: "#fff" }}
            >
              Camera not available
            </ParticipantOverlay>
          )}
          {p.isVideoEnabled || (
            <ParticipantOverlay>
              <Avatar url={p.user.profileUrl} />
            </ParticipantOverlay>
          )}
          <ParticipantInfo style={{ fontFamily: "'Poppins',sans-serif" }}>
            {p.isAudioEnabled || <ParticipantMutedIcon />} {p.user.nickname}
          </ParticipantInfo>
        </ParticipantView>
      </Wrapper>
    );
  }

  const rows = Math.ceil(participants.length / 2);
  return (
    <Wrapper>
      {Array(rows)
        .fill(0)
        .map((x, i) => {
          const p1 = participants[i * 2];
          const p2 = participants[i * 2 + 1];

          return (
            <ParticipantsRow key={i} rows={rows}>
              {[p1, p2].map(
                (p) =>
                  p && (
                    <ParticipantView
                      rows={rows}
                      width={windowDimensions.width}
                      height={windowDimensions.height}
                      key={p.participantId}
                    >
                      {/* eslint-disable jsx-a11y/media-has-caption */}
                      <video
                        autoPlay
                        playsInline
                        muted={
                          p.participantId === localParticipant.participantId
                        }
                        ref={(el) => {
                          if (!el) return;
                          p.setMediaView(el);
                        }}
                      />
                      {p.isVideoEnabled || (
                        <ParticipantOverlay>
                          <Avatar url={p.user.profileUrl} />
                        </ParticipantOverlay>
                      )}
                      <ParticipantInfo
                        style={{ fontFamily: "'Poppins',sans-serif" }}
                      >
                        {p.isAudioEnabled || <ParticipantMutedIcon />}{" "}
                        {p.user.nickname}
                      </ParticipantInfo>
                    </ParticipantView>
                  )
              )}
            </ParticipantsRow>
          );
        })}
    </Wrapper>
  );
};
export default MediaContent;
