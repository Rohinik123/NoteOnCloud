import React from "react";
import "../App.css";
import {
  Box,
  Typography,
  useMediaQuery,
  Grid,
  IconButton,
} from "@mui/material";
import photo from "../image/photo.jfif";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { styled } from "@mui/system";
import { keyframes } from "@mui/styled-engine";

// Define a keyframe animation for the text
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Define a styled component for the text
const AnimatedText = styled(Typography)`
  animation: ${fadeIn} 0.5s ease-out;
`;

const Abt = () => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      className="abt-box"
      width={isNotMobile ? "60%" : "100%"}
      p={"2rem"}
      m={"1rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      textAlign="center"
      backgroundColor="#DAF5FF"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            className="photo"
            src={photo}
            alt="Suraj Singhal"
            style={{
              width: "70%",

              borderRadius: "50%",
              objectFit: "cover",
              marginTop: "8rem",
              marginBottom: "18rem",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <AnimatedText variant="h4" mb={2}>
              About me
            </AnimatedText>
            <AnimatedText
              variant="body1"
              sx={{
                flexGrow: 1,
                maxWidth: "80%",
                marginBottom: "2rem",
                fontSize: "14px",
                color: "black",
              }}
            >
              Hi there! I'm <big className="bigg"> Rohini Kalne </big>, The
              Aspirant full-stack web developer . I'm a software engineer based
              in India and I love building things with code.
            </AnimatedText>

            <AnimatedText
              variant="body1"
              sx={{ marginBottom: "2rem", fontSize: "15px", color: "black" }}
            >
              <big className="bigg"> NoteOnCloud </big> is a free to use
              personal notebook on the cloud.
              {""}
              It is a best market web app where you can save your thoughts,
              TODOs, quick notes and Weather you are writting your personal
              notes or a whole book, this Cloud-Book has the expertise and
              experience to help you achieve goals.
              {""}
              Contact us today to learn more about how we can help your business
              succeed with cloud based solution.
            </AnimatedText>
            <Box display="flex" justifyContent="center" mt={2}>
              <IconButton
                href="https://www.linkedin.com/in/rohini-kalane-26a407219"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mr: 1 }}
              >
                <LinkedInIcon
                  sx={{ fontSize: isNotMobile ? 40 : 30, color: "black" }}
                />
              </IconButton>
              <IconButton
                href="https://github.com/ROHINI-KALANE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon
                  sx={{ fontSize: isNotMobile ? 40 : 30, color: "black" }}
                />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Abt;
