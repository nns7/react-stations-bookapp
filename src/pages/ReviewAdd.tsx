import { MenuBook } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import Footer from "../components/Footer";

const ReviewAdd = () => {
  return (
    <Grid container component="main" maxWidth="xs">
      <Grid item xs={1} sm={1} md={2} />
      <Grid item xs={10} sm={10} md={8}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <MenuBook />
          </Avatar>
          <Typography component="h1" variant="h5">
            書籍レビュー投稿
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="book-title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="書籍名"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="url"
                  label="書籍URL"
                  name="url"
                  autoComplete="book-url"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="detail"
                  label="書籍詳細"
                  name="detail"
                  autoComplete="book-detail"
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="review"
                  label="レビュー"
                  id="review"
                  autoComplete="book-review"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              投稿
            </Button>
          </Box>
        </Box>
      </Grid>

      <Footer />
    </Grid>
  );
};

export default ReviewAdd;
