import { Paper } from "@mui/material";
import React from "react";

function HomePage() {
  return (
    <Paper
      sx={{
        maxWidth: 1400,
        margin: "auto",
        overflow: "hidden",
        backgroundColor: "#e0e8eb",
      }}
      elevation={0}
    >
      Testavimas
    </Paper>
  );
}

export default HomePage;
