// import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import VideoCall from 'Pages/VideoCallTrigger/VideoCallTrigger';
import { routePaths } from 'utils/constants';

// const VideoCall = lazy(() => import('Pages/VideoCallTrigger/VideoCallTrigger'));
const Router = () => (
    <Routes>
        <Route path={routePaths.home} element={<VideoCall />} />
        <Route path="*" element={<div> Not Found or You do not have permission.</div>}/>
    </Routes>
);

export default Router;