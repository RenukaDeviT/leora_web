import { memo } from 'react';
import Logo from 'ui/assets/images/Logo.png';

// Parameter
type TProps = {
  className?: string;
};

// app logo
const AppLogo: React.FC<TProps> = ({ className = '' }) => (
  <img src={Logo} alt="logo" className={className} />
);

export default memo(AppLogo);
