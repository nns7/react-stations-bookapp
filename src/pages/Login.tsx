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
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Footer from "../components/Footer";
import { login, signIn } from "../components/authSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "../common/rootState.type";

const schema = yup.object({
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

const Login = () => {
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
      .post(`${process.env.REACT_APP_API_URL}/signin`, data)
      .then((res) => {
        const token: string = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        navigate("/");
        // storeにログインユーザー情報を保持
        getUser(token);
      })
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。 ${err}`);
        setErrorOpen(true);
      });
  };

  const getUser = (token: string) => {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios.get(`${process.env.REACT_APP_API_URL}/users`, options).then((res) => {
      dispatch(login(res.data));
    });
  };

  React.useEffect(() => {
    if (auth) navigate("/");
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
            ログイン
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
                      autoFocus
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
                      autoComplete="password"
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
              ログイン
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MUILink
                  component={Link}
                  to={`/signup`}
                  href="#"
                  variant="body2"
                >
                  会員登録がお済みでない方はこちらから登録
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

export default Login;
