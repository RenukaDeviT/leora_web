import { Box, Container } from "@mui/material";

const EndSession = () => {
  console.log("session ended");
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center">
        <h6>Session Ended, Thank you!</h6>
      </Box>
    </Container>
  );
};

export default EndSession;
