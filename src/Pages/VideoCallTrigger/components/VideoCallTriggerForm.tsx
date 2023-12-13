import { memo, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';
// import CryptoJS, { AES } from 'crypto-js';
// import { decryption } from 'utils/constants';
import { EResponseStatusCodes } from 'utils/types';
import axios from 'axios';
import api from 'api';
import { StatefulRoom, useSbCalls } from 'lib/sendbird-calls';
import VideoRoom from "./VideoRoom";

// const key = CryptoJS.enc.Hex.parse(decryption.key);
// const iv = CryptoJS.enc.Utf8.parse(decryption.iv);

const plainSessionText = '07af7e8f-0667-44c4-9fee-e0aa8a77cb12';
const plainIdText = 'a886ab89-3e69-4ef6-80d3-479396dab6f7';

const VideoCallTriggerForm = () => {
    // Get values from query string
  const [searchParams] = useSearchParams();
  
  // sendbird call requirements
  const sbCalls  = useSbCalls();
  // Initialize send bird using constant app id from env file
  // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    const sessionId = searchParams.get('session_id');
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    // API type call identification
  const apiType =
  type === 'user' ? 'user_join_session_web' : 'practitioner_join_session';

    const [Loading, setIsLoading] = useState(false);// eslint-disable-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);
    const [room, setRoom] = useState<StatefulRoom | null>(null);
  
    // asynchronous function call to hit api
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
           const apiCall = useCallback(async () => {
            setIsLoading(true);
            try {
              if(apiType === 'user_join_session_web')
              {
                // Call API request by passing parameters
              const { data : user } = await api.videoGroupCallWeb.me({
                action: apiType,
                user_id: plainIdText,
                session_id: plainSessionText
              });
                // set response values
                if(user)
                {
                // set response values
                // The USER_ID below should be unique to your Sendbird application.
                const authOption = {
                  userId: 
                    "sendbird_desk_agent_id_766ff928-9f15-464a-954a-c37d3030e27a", // user.sbUserId
                  accessToken: "d555bd591c46aba79ebecc8c0106174064a7285b", // user.sbUserCallAccessToken
                };

                // Handle authentication
                const sbUser = await sbCalls.auth(authOption);
                if (sbUser) {
                  // Fetch room details
                  const sbRoom = await sbCalls.fetchRoomById(
                    "9138ebed-4f9a-4dcb-84af-c1e02c21d399"
                  ); // user.roomId
                  // set room details
                  setRoom(sbRoom);
                  } else {
                    setError("Authorization failed");
                  }
                }
                else
                {
                  setError('Error! User doesnot exists');
                }
              }
              else
              {
                // Call API request by passing parameters
              const { data : user } = await api.videoGroupCallWeb.mePrac({
                action: apiType,
                practitioner_id: plainIdText,
                session_id: plainSessionText
              });

                // set response values
                if(user)
                {
                // set response values
                // The USER_ID below should be unique to your Sendbird application.
                const authOption = {
                  userId: 
                    "sendbird_desk_agent_id_766ff928-9f15-464a-954a-c37d3030e27a", // user.sbUserId
                  accessToken: "d555bd591c46aba79ebecc8c0106174064a7285b", // user.sbUserCallAccessToken
                };

                // Handle authentication
                const sbUser = await sbCalls.auth(authOption);
                if (sbUser) {
                  // Fetch room details
                  const sbRoom = await sbCalls.fetchRoomById(
                    "9138ebed-4f9a-4dcb-84af-c1e02c21d399"
                  ); // user.roomId
                  // set room details
                  setRoom(sbRoom);
                  } else {
                    setError("Authorization failed");
                  }
                }
                else
                {
                  setError('Error! User doesnot exists');
                }
              }           
            }
          catch (err) {
              if (axios.isAxiosError(err)) {
                if (err.response?.status === EResponseStatusCodes.UnprocessableContent) {
                  setError('Please enter the correct url.');
                }
              }
            }
  }, [apiType]);

  useEffect(() => {
    if (sessionId && id) {
      apiCall();
    }
  }, [sessionId, id]);

  return (
    <div>
          { !room && !error ?
            <div className="video-call-wrapper">
            <div className="video-call-container">
            <h1 className="video-call-title">Welcome</h1>
            <div className="dashboard__metrics-engaged-members-empty-wrapper">
              <Box sx={{ width: '100%', marginTop: '20px' }}>
                <LinearProgress
                  className="dashboard__metrics-engaged-members-empty-loader"
                  color="secondary"
                />
              </Box>
          </div>
          </div>
          </div>
          :
          <div>
          { room ? (
            <div className="video-call-wrapvideo">
            <div className="video-call-containervideo">
            {room && <VideoRoom room={room} />}
            </div>
            </div>
           ) : ( 
           <div className="video-call-wrapper">
            <div className="video-call-container">
              <h1 className="video-call-title">Welcome</h1>
              <div className="dashboard__metrics-engaged-members-empty-wrapper">
           <p className="video-call-error">{error?.toString()}</p>
          </div>
          </div>
          </div>
          )} 
          </div>
          }
      <div className='video-call__form-login-img-plug' />
    </div>
  );
};

export default memo(VideoCallTriggerForm);
