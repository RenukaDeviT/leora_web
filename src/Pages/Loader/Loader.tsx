import SplashLoader from "components/templates/Loader/SplashLoader";

const Loader = () => {
  console.log("loading");
  return (
    <SplashLoader>
      <>
        <h6 className="content">"Please wait while we connect you..."</h6>
      </>
    </SplashLoader>
  );
};

export default Loader;
