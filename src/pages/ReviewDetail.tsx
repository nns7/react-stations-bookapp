import { MenuBook } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import Footer from "../components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import { Book } from "../common/book.type";
import { useCookies } from "react-cookie";
import axios from "axios";

const ReviewDetail = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const [book, setBook] = React.useState<null | Book>(null);
  const [cookies] = useCookies();
  const { id } = useParams();

  React.useEffect(() => {
    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/books/${id}`, options)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        setErrorMessage(`書籍一覧の取得に失敗しました。 ${err}`);
      });
  }, []);

  return (
    <Grid container component="main" maxWidth="xs">
      <Grid item xs={false} sm={1} md={2} />
      <Grid item xs={12} sm={10} md={8}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {book ? (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <MenuBook />
              </Avatar>
              <Typography component="h1" variant="h5">
                書籍レビュー詳細
              </Typography>
              <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="title"
                      fullWidth
                      id="title"
                      label="書籍名"
                      value={book.title}
                      disabled
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="url"
                      label="書籍URL"
                      name="url"
                      value={book.url}
                      disabled
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="detail"
                      label="書籍詳細"
                      name="detail"
                      multiline
                      value={book.detail}
                      disabled
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="review"
                      label="レビュー"
                      id="review"
                      multiline
                      value={book.review}
                      disabled
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <CircularProgress />
          )}
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

export default ReviewDetail;
