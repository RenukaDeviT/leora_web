import { memo } from 'react';
import LeoraMeditating from 'ui/assets/images/Leora-meditating.png';
import CloudTop from 'ui/assets/images/Cloud-top.png';
import CloudMiddle from 'ui/assets/images/Cloud-middle.png';

// combining styles, images and root directory
const images = [
  {
    src: LeoraMeditating,
    alt: 'leora-meditating',
    className: 'video-call__images-leora-meditating',
  },
  {
    src: CloudTop,
    alt: 'cloud-top',
    className: 'video-call__images-cloud-top',
  },
  {
    src: CloudMiddle,
    alt: 'cloud-middle',
    className: 'video-call__images-cloud-middle',
  },
];

const VideoCallImages = () => (
  <>
    {images.map((imgInfo, index) => (
      <img key={index} src={imgInfo.src} alt={imgInfo.alt} className={imgInfo.className} />
    ))}
  </>
);

export default memo(VideoCallImages);
