import SplashLoader from "components/templates/Loader/SplashLoader";

const Error = () => {
  console.log("error");
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
  );
};

export default Error;
