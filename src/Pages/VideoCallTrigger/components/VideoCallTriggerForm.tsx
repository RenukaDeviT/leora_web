import { memo, useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';
// import CryptoJS, { AES } from 'crypto-js';
// import { decryption } from 'utils/constants';
import { EResponseStatusCodes, TUser } from 'utils/types';
import axios from 'axios';
import api from 'api';
import config from 'config';
import { useSbCalls } from 'lib/sendbird-calls';
import Overlay from 'components/atoms/Overlay';
import GroupCall from 'components/organisms/GroupCall';

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
  sbCalls.init(config.appId);
  const { rooms } = sbCalls;

  useEffect(() => {
    const room = rooms[rooms.length - 1];
    console.log(room);// eslint-disable-line no-console
  }, [rooms]);

  const onCall = useMemo(() => 
     rooms.find(r => !!r.localParticipant)
  , [rooms]);

  // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    const sessionId = searchParams.get('session_id');
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    // API type call identification
  const apiType =
  type === 'user' ? 'user_join_session_web' : 'practitioner_join_session';

    const [dbUser, setDbUser] = useState<TUser | null>(null);
    const [Loading, setIsLoading] = useState(false);// eslint-disable-line @typescript-eslint/no-unused-vars
const [isEnter, setEnter] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    console.log(sbCalls);// eslint-disable-line no-console
    // asynchronous function call to hit api
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
           const apiCall = async () => {
            setIsLoading(true);
            try {
              if(apiType === 'user_join_session_web')
              {
                // Call API request by passing parameters
              const { data : dbUser } = await api.videoGroupCallWeb.me({
                action: apiType,
                user_id: plainIdText,
                session_id: plainSessionText
              });
              // set response values
              if(dbUser)
              {
              // set response values
                setDbUser(dbUser);
              }
              else
              {
                setError('Error! User doesnot exists');
              }
              }
              else
              {
                // Call API request by passing parameters
              const { data : dbUser } = await api.videoGroupCallWeb.mePrac({
                action: apiType,
                practitioner_id: plainIdText,
                session_id: plainSessionText
              });

              if(dbUser)
              {
              // set response values
              setDbUser(dbUser);
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
            } finally {
              setIsLoading(false);
            }
  };
  useEffect(() => {
    if (sessionId && id) {
      apiCall();
    }
  }, [sessionId, id]);

  const userAuth = useEffect(() => {
    if(dbUser !== null)
    {
    //  The USER_ID below should be unique to your Sendbird application.
      const authOption = { userId: dbUser.sbUserId, accessToken: dbUser.sbUserCallAccessToken };
      setError(null);

      // Handle authentication
      const user = sbCalls.auth(authOption);
      if(user !== undefined)
      {
      enter(dbUser.roomId);
      }
      else
      {
        setError('Authorization failed');
      }
    }   
  },[dbUser])

  
  const enter = useCallback(async (roomId: string) => {
    try {
      console.log(roomId);// eslint-disable-line no-console
      const room = await sbCalls.fetchRoomById(roomId);
        room.enter({
          audioEnabled: true,
          videoEnabled: true,
          kickSiblings: true 
        }).then(() => {
          setEnter(true);
        }).catch(error => {
          setError(error.message);
        });      
    } catch (e) {
      console.error(e);
      setError('Check room ID and try again.');
    }
  }, [userAuth])

  return (
    <div className="video-call-wrapper">
      <div className="video-call-container">
          { error === null && !isEnter ?
          <div>
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
          :
          <div>
          { error === null && isEnter ?
          <div>
            {onCall &&
              <Overlay>
                <GroupCall room={onCall} />
              </Overlay>
            }
            </div>
           :  
           <div>
        <h1 className="video-call-title">Welcome</h1>
        <div className="dashboard__metrics-engaged-members-empty-wrapper">
           <p className="video-call-error">{error}</p>
          </div>
          </div>
          } 
          </div>
}
      </div>
      <div className='video-call__form-login-img-plug' />
    </div>
  );
};

export default memo(VideoCallTriggerForm);
