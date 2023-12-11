import { InfoLabel, InputWithCopyButton, InputWithCopyIcon } from 'components/molecules/Info';
import { StatefulRoom } from 'lib/sendbird-calls/SbCallsContext';
import ReactModal from 'react-modal';

import Modal from 'components/templates/Modal';
import styled from 'styled-components';
import { normal } from 'ui/styles/font';

const Text = styled.div`
  ${normal};
  letter-spacing: -0.1px;
  color: var(--navy-900);
  margin-bottom: 30px;
`;

const RoomCreated = (props: ReactModal.Props & { close: () => void; room: StatefulRoom; }) =>  (
    <Modal
      title="Room created!"
      content={(
        <>
          <Text>Share the room ID for others to enter this room for group calls.</Text>
          <InputWithCopyButton text={props.room.roomId} title="Room ID" />
        </>
      )}
      footer={{}}
      {...props}
    />
  )

const CreatedByText = styled.div`
  ${normal};
  letter-spacing: -0.1px;
  color: var(--navy-900);
  margin-top: 10px;
`;

export const RoomInfo = (props: ReactModal.Props & { close: () => void; room: StatefulRoom; }) => (
    <Modal
      title="Room information"
      content={(
        <>
          <InputWithCopyIcon title="Room ID" text={props.room.roomId} />
          <div style={{ marginTop: 24 }}>
            <InfoLabel>Created by</InfoLabel>
            <CreatedByText>User ID : {props.room.createdBy}</CreatedByText>
          </div>
        </>
      )}
      footer={{
        confirm: { label: 'OK', onClick: () => { props.close() } }
      }}
      {...props}
    />
  )

export default RoomCreated;
