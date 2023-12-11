import { memo } from 'react';
import AppLogo from 'ui/components/AppLogo';

const VideoCallHeader = () => (
  <header className="video-call__header">
    <AppLogo className="video-call__header-logo" />
    <div className="video-call-title">Join Video Call</div>
  </header>
);

export default memo(VideoCallHeader);
