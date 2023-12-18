import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useAlert } from "context/Alert";

const Alert = () => {
  const { isVisible, message, hide, type } = useAlert();

  // Function to handle the close button click
  const handleClose = () => {
    // Hide the message and update localStorage
    hide();
  };

  // Render the message component conditionally based on isVisible
  return (
    <>
      <Snackbar
        open={isVisible}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert variant="filled" onClose={handleClose} severity={type}>
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Alert;
