import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <Grid container component="main" maxWidth="xs">
      <Grid item xs={1} sm={1} md={2} />
      <Grid item xs={10} sm={10} md={8}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" color="error">
            ページが見つかりませんでした。
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={1} sm={1} md={2} />
      <Footer />
    </Grid>
  );
};

export default NotFound;
