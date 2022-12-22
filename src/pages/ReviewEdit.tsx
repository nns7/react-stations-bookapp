import { MenuBook } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { Book } from "../common/book.type";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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

const ReviewEdit = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [cookies] = useCookies();
  const [book, setBook] = React.useState<null | Book>(null);
  const { id } = useParams();
  const { control, handleSubmit, reset } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .put(`${process.env.REACT_APP_API_URL}/books/${id}`, data, options)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`書籍レビューの更新に失敗しました。 ${err}`);
        setErrorOpen(true);
      });
  };

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
        setErrorMessage(`書籍情報の取得に失敗しました。 ${err}`);
      });
  }, []);

  React.useEffect(() => {
    reset({
      title: book?.title,
      url: book?.url,
      detail: book?.detail,
      review: book?.review,
    });
  }, [reset, book]);

  function onDelete() {
    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .delete(`${process.env.REACT_APP_API_URL}/books/${id}`, options)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`書籍レビューの削除に失敗しました。 ${err}`);
        setErrorOpen(true);
      });
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOepn = () => {
    setDialogOpen(true);
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
          {book ? (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <MenuBook />
              </Avatar>
              <Typography component="h1" variant="h5">
                書籍レビュー編集
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
                      defaultValue={book.title}
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
                          defaultValue={book.title}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="url"
                      control={control}
                      defaultValue={book.url}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          label="書籍URL"
                          error={fieldState.invalid}
                          helperText={fieldState.error?.message}
                          autoComplete="book-url"
                          defaultValue={book.url}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="detail"
                      control={control}
                      defaultValue={book.detail}
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
                          defaultValue={book.detail}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="review"
                      control={control}
                      defaultValue={book.review}
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
                          defaultValue={book.review}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid item xs={12} sm={4} md={4}>
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      color="error"
                      fullWidth
                      onClick={handleDialogOepn}
                    >
                      削除
                    </Button>
                  </Grid>
                  <Grid item xs={false} sm={1} md={2} />
                  <Grid item xs={12} sm={4} md={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      color="warning"
                      fullWidth
                    >
                      更新
                    </Button>
                  </Grid>

                  <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle id="alert-dialog-title" color="error">
                      {"本当に削除しますか？"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText
                        id="alert-dialog-description"
                        color="inherit"
                      >
                        削除すると元に戻せません。本当に削除しますか？
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDialogClose} autoFocus>
                        キャンセル
                      </Button>
                      <Button
                        onClick={() => {
                          handleDialogClose();
                          onDelete();
                        }}
                      >
                        削除
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>

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
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Grid>

      <Footer />
    </Grid>
  );
};

export default ReviewEdit;
