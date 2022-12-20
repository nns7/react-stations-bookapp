import * as React from "react";
import {
  AccountCircle,
  Close as CloseIcon,
  PhotoCamera,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "../components/Footer";
import { User } from "../common/user.type";
import axios from "axios";
import { useCookies } from "react-cookie";
import { compressImage } from "../common/compress";

const Profile = () => {
  const [message, setMessage] = React.useState<string>();
  const [messageOpen, setMessageOpen] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [loginUserInfo, setLoginUserInfo] = React.useState<null | User>(null);
  const [cookies] = useCookies();
  const [iconImage, setIconImage] = React.useState<undefined | string>(
    undefined
  );
  const [fileImage, setFileImage] = React.useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("currentName") !== formData.get("newName")) {
      putUserInfo(formData);
    }

    if (fileImage !== null) postUploads();
  };

  const putUserInfo = (formData: FormData) => {
    const data = {
      name: formData.get("newName"),
    };
    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .put(`${process.env.REACT_APP_API_URL}/users`, data, options)
      .then(() => {
        setMessage(`ユーザー情報の更新に成功しました。`);
        setMessageOpen(true);
        setIsError(false);
      })
      .catch((err) => {
        setMessage(`ユーザー情報の更新に失敗しました。 ${err}`);
        setMessageOpen(true);
        setIsError(true);
      });
  };

  const postUploads = async () => {
    if (fileImage === null) return;

    const formData = new FormData();
    const compressedFile = await compressImage(fileImage);
    formData.append("icon", compressedFile);

    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/uploads`, formData, options)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, options)
      .then((res) => {
        setLoginUserInfo(res.data);
      })
      .catch((err) => {
        setMessage(`ユーザー情報の取得に失敗しました。 ${err}`);
        setMessageOpen(true);
        setIsError(true);
      });
  }, []);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    setIconImage(window.URL.createObjectURL(fileObject));
    setFileImage(fileObject);
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
          {loginUserInfo ? (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <AccountCircle />
              </Avatar>
              <Typography component="h1" variant="h5">
                ユーザー情報編集
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3, width: "100%", textAlign: "center" }}
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    name="icon"
                    id="icon"
                    onChange={onFileInputChange}
                  />
                  {loginUserInfo.iconUrl !== undefined ||
                  iconImage !== undefined ? (
                    <Avatar
                      src={iconImage ? iconImage : loginUserInfo.iconUrl}
                      sx={{ width: 200, height: 200 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 200, height: 200 }}>
                      <PhotoCamera sx={{ width: 180, height: 180 }} />
                    </Avatar>
                  )}
                </IconButton>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="user-name"
                      name="newName"
                      required
                      fullWidth
                      id="newName"
                      label="名前"
                      autoFocus
                      defaultValue={loginUserInfo.name}
                    />
                    <input
                      hidden
                      name="currentName"
                      id="currentId"
                      value={loginUserInfo.name}
                      readOnly
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="warning"
                  fullWidth
                >
                  更新
                </Button>

                <Collapse in={messageOpen}>
                  <Alert
                    severity={isError ? "error" : "success"}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setMessageOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {message}
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

export default Profile;
