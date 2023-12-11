import { memo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { routePaths } from 'utils/constants';

const PrivateRoutes = () => {
    const navigate = useNavigate();
      // navigate to Dashboard
        navigate(routePaths.videoCall);
     
    return <Outlet />;
  };
  
  export default memo(PrivateRoutes);