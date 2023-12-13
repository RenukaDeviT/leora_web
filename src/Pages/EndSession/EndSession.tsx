import SplashLoader from "components/templates/Loader/Index";

const EndSession = () => {
  console.log("session ended");
  return (
    <SplashLoader>
      <h6 className="content">
        "Congratulations! Session successfully completed. You've done a <br />
        fantastic job!"
      </h6>
    </SplashLoader>
  );
};

export default EndSession;
