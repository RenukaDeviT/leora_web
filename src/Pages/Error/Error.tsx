import SplashLoader from "components/templates/Loader/SplashLoader";
import { useEffect } from "react";
import { useAlert } from "context/Alert";

const Error = () => {    
  const { show, hide } = useAlert();

  useEffect(() => {
      const err = localStorage.getItem('error');
      if(err)
      {     
        show(err, "error"); 
         // Creating a timeout within the useEffect hook
         setTimeout(() => {
          hide();
        }, 15000);     
      }
  }, []);
  
  return (
    <SplashLoader>
      <>
        <h6 className="content yellow">
          "Oops! It seems there was an error during the video session.{" "}
        </h6>
        <h6 className="content">
          Our video session feature is undergoing maintenance to bring you even
          better service!"
        </h6>
      </>
    </SplashLoader>
  )
};

export default Error;
