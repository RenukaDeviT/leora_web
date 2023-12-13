import EndSplash from "components/templates/Loader/EndSplash";

const EndSession = () => {
  console.log("session ended");
  return (
    <EndSplash>
      <h6 className="content">
        "Congratulations! Session successfully completed. You've done a
        fantastic job!"
      </h6>
    </EndSplash>
  );
};

export default EndSession;
