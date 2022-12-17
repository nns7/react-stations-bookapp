import { MenuBook } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";

const ReviewAdd = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const [cookies] = useCookies();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get("title"),
      url: formData.get("url"),
      detail: formData.get("detail"),
      review: formData.get("review"),
    };
    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/books`, data, options)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`ユーザー作成に失敗しました。 ${err}`);
        setErrorOpen(true);
      });
  };

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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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

      <Grid item xs={1} sm={1} md={2} />
      <Grid item xs={10} sm={10} md={8}>
        <Box sx={{ width: "100%" }}>
          <Collapse in={errorOpen}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrorOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          </Collapse>
        </Box>
      </Grid>

      <Footer />
    </Grid>
  );
};

export default ReviewAdd;
