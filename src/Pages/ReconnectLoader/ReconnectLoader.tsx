import SplashLoader from "components/templates/Loader/SplashLoader";

const ReconnectLoader = () => {
  console.log("Reconnect Loading");
  return (
    <SplashLoader>
      <>
        <h6 className="content">"Reconnecting, Please wait..."</h6>
      </>
    </SplashLoader>
  );
};

export default ReconnectLoader;
