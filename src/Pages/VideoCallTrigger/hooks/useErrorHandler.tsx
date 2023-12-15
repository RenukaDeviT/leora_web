
import { routePaths } from "utils/constants";
import { useNavigate } from 'react-router-dom';

const useErrorHandler = () => {
    const navigate = useNavigate();
        navigate(routePaths.home);
  };

  export default useErrorHandler;