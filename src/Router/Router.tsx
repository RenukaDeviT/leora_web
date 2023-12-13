import { Route, Routes } from "react-router-dom";
import VideoCall from "Pages/VideoCallTrigger/VideoCallTrigger";
import { routePaths } from "utils/constants";
import Error from "Pages/Error/Error";
import EndSession from "Pages/EndSession/EndSession";

const Router = () => (
  <Routes>
    <Route path={routePaths.home} element={<VideoCall />} />
    <Route path={routePaths.endSession} element={<EndSession />} />

    <Route path="*" element={<Error />} />
  </Routes>
);

export default Router;
