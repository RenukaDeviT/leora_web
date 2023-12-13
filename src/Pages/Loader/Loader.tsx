import { Box, Container, LinearProgress } from "@mui/material";

const Loader = () => {
  console.log("loading");
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center">
        <LinearProgress />
      </Box>
    </Container>
  );
};

export default Loader;
