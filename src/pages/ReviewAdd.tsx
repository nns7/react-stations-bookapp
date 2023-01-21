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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { appConfig } from "../common/config";

const schema = yup.object({
  title: yup.string().required("タイトルが入力されていません"),
  url: yup
    .string()
    .url("URL形式ではありません")
    .required("URLが入力されていません"),
  detail: yup.string().required("書籍詳細が入力されていません"),
  review: yup.string().required("レビューが入力されていません"),
});

type Inputs = yup.InferType<typeof schema>;

const ReviewAdd = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const [cookies] = useCookies();
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .post(`${appConfig.app.apiUrl}/books`, data, options)
      .then(() => {
        navigate(`${appConfig.app.baseUrl}/`);
      })
      .catch((err) => {
        setErrorMessage(`書籍レビューの投稿に失敗しました。 ${err}`);
        setErrorOpen(true);
      });
  };

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <MenuBook />
          </Avatar>
          <Typography component="h1" variant="h5">
            書籍レビュー投稿
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      autoComplete="book-title"
                      required
                      fullWidth
                      label="書籍名"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      autoFocus
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="url"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="書籍URL"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      autoComplete="book-url"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="detail"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="書籍詳細"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      autoComplete="book-detail"
                      multiline
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="review"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="レビュー"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      autoComplete="book-review"
                      multiline
                      rows={4}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="warning"
            >
              投稿
            </Button>
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
        </Box>
      </Grid>

      <Footer />
    </Grid>
  );
};

export default ReviewAdd;
