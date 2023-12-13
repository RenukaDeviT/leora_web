import { Container, Grid, styled } from "@mui/material";
import LeoraMeditating from "ui/assets/images/Leora-meditating.png";
import CloudTop from "ui/assets/images/Cloud-top.png";
import CloudMiddle from "ui/assets/images/Cloud-middle.png";
import Logo from "ui/assets/images/Logo.png";
import React from "react";

const SplashLoader = ({ children }: { children: React.ReactElement }) => {
  console.log("session loading");
  return (
    <Root>
      <Container>
        <Grid container alignContent="center">
          <Grid
            item
            xs={12}
            md={6}
            alignSelf="center"
            textAlign="center"
            className="imageContainer"
          >
            <div className="logoContainer">
              <img className="logo hide-md" src={Logo} alt="Logo" />
            </div>
            <img
              className="leoraImage floating"
              src={LeoraMeditating}
              alt="leora"
            />
            <img className="top hide-sm" src={CloudTop} alt="Logo" />
            <img className="middle " src={CloudMiddle} alt="Logo" />
          </Grid>
          <Grid item xs={12} md={6} alignSelf="center" textAlign="center">
            <div className="logoContainer">
              <img className="logo hide-sm" src={Logo} alt="Logo" />
            </div>
            <div className="content">{children}</div>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
};

export default SplashLoader;

const Root = styled("main")(({ theme }) => ({
  backgroundColor: "#212242",
  color: "#fff",
  "& .MuiContainer-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  "& .leoraImage": {
    maxWidth: "100%",
    width: "20rem",
    position: "relative",
    zIndex: 2,
    [theme.breakpoints.down("md")]: {
      width: "15rem",
    },
  },
  "& .logo": {
    width: "10rem",
    zIndex: 2,
    marginBottom: "2rem",
  },
  "& .imageContainer": {
    position: "relative",
  },
  "& .logoContainer": {
    width: "100%",
  },
  "& .top": {
    position: "absolute",
    top: "10px",
    right: "128px",
    maxWidth: "100%",
  },
  "& .middle": {
    position: "absolute",
    bottom: "10px",
    left: "0px",
    maxWidth: "100%",
    [theme.breakpoints.down("md")]: {
      left: "25%",
    },
    [theme.breakpoints.down("sm")]: {
      left: "0px",
    },
  },
  [theme.breakpoints.down("md")]: {
    "& .hide-sm": {
      display: "none",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .hide-md": {
      display: "none",
    },
  },
  "& .content": {
    fontSize: `2rem`,
    lineHeight: `3rem`,
    [theme.breakpoints.down("md")]: {
      fontSize: `1rem`,
      lineHeight: `1.2rem`,
    },
  },
  "& .yellow": {
    color: "#f8cf0a",
  },
  // write floating animation styles here
  "& .floating": {
    animation: `floatAnimation 6s ease-in-out infinite`,
  },
}));
