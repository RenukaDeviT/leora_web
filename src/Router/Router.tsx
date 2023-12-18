import { Route, Routes } from "react-router-dom";
import VideoCall from "Pages/VideoCallTrigger/VideoCall";
import { routePaths } from "utils/constants";
import Error from "Pages/Error/Error";
import EndSession from "Pages/EndSession/EndSession";
import { SbCallsProvider } from 'lib/sendbird-calls/SbCallsContext';
import config from 'config';
import { ErrorBoundary } from "react-error-boundary";
import { AlertProvider } from "context/Alert";

const Router = () => (
  <ErrorBoundary fallback={<Error />}>
    <AlertProvider>
      <SbCallsProvider appId={config.appId}>
        <Routes>
          <Route path={routePaths.home} element={<VideoCall />} />
          <Route path={routePaths.endSession} element={<EndSession />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </SbCallsProvider>
    </AlertProvider>
  </ErrorBoundary>
);

export default Router;
