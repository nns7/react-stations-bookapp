import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Link as MUILink,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";
import title from "../image/title.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, signIn } from "../components/authSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "../common/rootState.type";
import { appConfig } from "../common/config";

const schema = yup.object({
  name: yup.string().required("名前が入力されていません"),
  email: yup
    .string()
    .email("メールアドレス形式ではありません")
    .required("メールアドレスが入力されていません"),
  password: yup
    .string()
    .required("パスワードが入力されていません")
    .min(4, "4文字以上ではありません"),
});

type Inputs = yup.InferType<typeof schema>;

const SignUp = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [, setCookie] = useCookies();
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    axios
      .post(`${appConfig.app.apiUrl}/users`, data)
      .then((res) => {
        const token: string = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        navigate(`${appConfig.app.baseUrl}/`);
        // storeにログインユーザー情報を保持
        getUser(token);
      })
      .catch((err) => {
        setErrorMessage(`ユーザー作成に失敗しました。 ${err}`);
        setErrorOpen(true);
      });
  };

  const getUser = (token: string) => {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios.get(`${appConfig.app.apiUrl}/users`, options).then((res) => {
      dispatch(login(res.data));
    });
  };

  React.useEffect(() => {
    if (auth) navigate(`${appConfig.app.baseUrl}/`);
  }, []);

  return (
    <Grid container component="main" maxWidth="xs">
      <Grid item xs={false} sm={false} md={2} />
      <Grid
        item
        xs={false}
        sm={4}
        md={3}
        sx={{
          backgroundImage: `url(${title})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contained",
          backgroundPosition: "center",
          "z-index": "-1",
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            新規会員登録
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
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="名前"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      autoComplete="given-name"
                      autoFocus
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="メールアドレス"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      autoComplete="email"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="パスワード"
                      type="password"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      autoComplete="new-password"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
            >
              会員登録
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MUILink
                  component={Link}
                  to={`/login`}
                  href="#"
                  variant="body2"
                >
                  すでにアカウントをお持ちの方はこちらからログイン
                </MUILink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={false} sm={false} md={2} />

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
      <Grid item xs={1} sm={1} md={2} />

      <Footer />
    </Grid>
  );
};

export default SignUp;
