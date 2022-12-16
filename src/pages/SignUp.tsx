import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
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
import { useDispatch } from "react-redux";
import { signIn } from "../components/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [, setCookie] = useCookies();
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("lastName") + " " + formData.get("firstName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, data)
      .then((res) => {
        const token: string = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`ユーザー作成に失敗しました。 ${err}`);
        setErrorOpen(true);
      });
  };

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
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="姓"
                  name="lastName"
                  autoComplete="family-name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="名"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="新規会員登録する場合は、プライバシーポリシーおよび利用規約に同意するものとします。"
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
