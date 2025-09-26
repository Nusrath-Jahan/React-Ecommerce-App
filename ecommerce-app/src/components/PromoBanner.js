import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function PromoBanner() {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        textAlign: "center",
        py: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          fontWeight: "bold",
          color: "white",
        }}
      >
        We{" "}
        <FavoriteIcon
          sx={{
            color: "red",
            fontSize: 28,
            animation: "heartbeat 1.5s infinite",
          }}
        />
        Best Sellers!!
      </Typography>

      {/* Heartbeat Animation */}
      <style>
        {`
    @keyframes heartbeat {
    0% {transform: scale(1);}
    25% {transform: scale(1.2);}
    40% {transform: scale(0.9);}
    60% {transform: scale(1.15);}
    100% {transform: scale(1);}
    }
    
    `}
      </style>
    </Box>
  );
}

export default PromoBanner;
