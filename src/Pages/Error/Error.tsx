import { Box, Container } from "@mui/material";

const Error = () => {
  console.log("error");
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center">
        <h6>Page is under maintainance</h6>
      </Box>
    </Container>
  );
};

export default Error;
