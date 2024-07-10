import React, { useEffect } from "react";
import { Box } from "@mui/material";

// Define the keyframes for the animation
const keyframes = `
  @keyframes slide {
    0% {
      transform: translateX(-50%);
    }
    50% {
      transform: translateX(150%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

// Create a style element and append the keyframes
const addKeyframes = () => {
  const styleElement = document.createElement("style");
  styleElement.textContent = keyframes;
  document.head.appendChild(styleElement);
};

const ImageProcessing = () => {
  useEffect(() => {
    addKeyframes();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "300px",
        height: "300px",
        overflow: "hidden",
        border: "1px solid #ddd",
        margin: "auto", // Center horizontally
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/Assets/Process/image.png"
        alt="Processing"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)",
          animation: "slide 3s infinite",
        }}
      />
    </Box>
  );
};

export default ImageProcessing;