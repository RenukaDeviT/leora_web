import api from "api/api";
import axios from "axios";
// import { decrypt } from "lib/cryptojs/cryptojs";
import { StatefulRoom, useSbCalls } from "lib/sendbird-calls";
import { useState, useCallback, useEffect } from "react";
import { EResponseStatusCodes, TUser } from "utils/types";

// const plainSessionText = "07af7e8f-0667-44c4-9fee-e0aa8a77cb12";
// const plainIdText = "a886ab89-3e69-4ef6-80d3-479396dab6f7";

const useSBAuthenticate = ({
  type,
  sessionId,
  id,
}: {
  type: string | null;
  sessionId: string | null;
  id: string | null;
}) => {
  const sbCalls = useSbCalls();

  const [isLoading, setIsLoading] = useState(true); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<StatefulRoom | null>(null);

  // API type call identification
  const apiType =
    type === "user" ? "user_join_session_web" : "practitioner_join_session";

  const auth = useCallback(
    async (user: TUser) => {
      try {
      // set response values
      if (user) {
        // set response values
        // The USER_ID below should be unique to your Sendbird application.
        const authOption = {
          userId: user.sbUserId, // user.sbUserId
          accessToken: user.sbUserCallAccessToken, // user.sbUserCallAccessToken
        };

        // Handle authentication
        const sbUser = await sbCalls.auth(authOption);
        if (sbUser) {
          // Fetch room details
          const sbRoom = await sbCalls.fetchRoomById(user.roomId); // user.roomId
          // set room details
          setRoom(sbRoom);
        } else {
          setError("Authorization failed");
        }
      } else {
        setError("Error! User doesnot exists");
      }
    }
    catch
    {
      setError("Error occurs");  
      setIsLoading(false);
    }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // asynchronous function call to hit api
  const apiCall = useCallback(async () => {
    if (!id || !sessionId) return;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    // const { decryptId: user_id, decryptSessionId: session_id } = decrypt({ sessionId, id });// eslint-disable-line @typescript-eslint/no-unused-vars

    setIsLoading(true);
    try {
      if (apiType === "user_join_session_web") {
        // Call API request by passing parameters
        // need to change
        const { data: user } = await api.videoGroupCallWeb.user({
          action: apiType,
          user_id: id,
          session_id: sessionId,
        });
        // set response values        
        auth(user);
      } else {
        // Call API request by passing parameters
        const { data: user } = await api.videoGroupCallWeb.practitioner({
          action: apiType,
          practitioner_id: id,
          session_id: sessionId,
        });
        auth(user);
      }
      setIsLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (
          err.response?.status === EResponseStatusCodes.UnprocessableContent
        ) {
          setError("Please enter the correct url.");
        }
      }
      setIsLoading(false);
    }
  }, [apiType, auth, id, sessionId]);

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  return { room, error, isLoading };
};

export default useSBAuthenticate;
