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
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "../components/Footer";
import axios from "axios";
import { useCookies } from "react-cookie";
import { compressImage } from "../common/compress";
import { RootState } from "../common/rootState.type";
import { useDispatch, useSelector } from "react-redux";
import { changeName, uploadIcon } from "../components/authSlice";

const Profile = () => {
  const [putUserMessage, setPutUserMessage] = React.useState<string>();
  const [putUserMessageOpen, setPutUserMessageOpen] =
    React.useState<boolean>(false);
  const [isPutUserError, setIsPutUserError] = React.useState<boolean>(false);
  const [postIconsMessage, setPostIconsMessage] = React.useState<string>();
  const [postIconsMessageOpen, setPostIconsMessageOpen] =
    React.useState<boolean>(false);
  const [isPostIconsError, setIsPostIconsError] =
    React.useState<boolean>(false);
  const [cookies] = useCookies();
  const [iconImage, setIconImage] = React.useState<undefined | string>(
    undefined
  );
  const [fileImage, setFileImage] = React.useState<File | null>(null);
  const loginUserName = useSelector(
    (state: RootState) => state.auth.userInfo.name
  );
  const loginUserIconUrl = useSelector(
    (state: RootState) => state.auth.userInfo.iconUrl
  );
  const dispatch = useDispatch();

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
      .then((res) => {
        setPutUserMessage(`ユーザー情報の更新に成功しました。`);
        setPutUserMessageOpen(true);
        setIsPutUserError(false);
        // storeに保持しているユーザー名を更新
        dispatch(changeName(res.data.name));
      })
      .catch((err) => {
        setPutUserMessage(`ユーザー情報の更新に失敗しました。 ${err}`);
        setPutUserMessageOpen(true);
        setIsPutUserError(true);
      });
  };

  const postUploads = async () => {
    if (fileImage === null) return;

    const formData = new FormData();
    try {
      const compressedFile = await compressImage(fileImage);
      formData.append("icon", compressedFile);
    } catch (err) {
      setPostIconsMessage(`アイコンの更新に失敗しました。 ${err}`);
      setPostIconsMessageOpen(true);
      setIsPostIconsError(true);
      return;
    }

    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/uploads`, formData, options)
      .then((res) => {
        setPostIconsMessage(`アイコンの更新に成功しました。`);
        setPostIconsMessageOpen(true);
        setIsPostIconsError(false);
        setFileImage(null);
        // storeに保持しているアイコンURLを更新
        dispatch(uploadIcon(res.data.iconUrl));
      })
      .catch((err) => {
        setPostIconsMessage(`アイコンの更新に失敗しました。 ${err}`);
        setPostIconsMessageOpen(true);
        setIsPostIconsError(true);
      });
  };

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
              {loginUserIconUrl !== undefined || iconImage !== undefined ? (
                <Avatar
                  src={iconImage ? iconImage : loginUserIconUrl}
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
                {loginUserName ? (
                  <>
                    <TextField
                      autoComplete="user-name"
                      name="newName"
                      required
                      fullWidth
                      id="newName"
                      label="名前"
                      autoFocus
                      defaultValue={loginUserName}
                    />
                    <input
                      hidden
                      name="currentName"
                      id="currentName"
                      value={loginUserName}
                      readOnly
                    />
                  </>
                ) : (
                  <></>
                )}
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

            <Collapse in={putUserMessageOpen}>
              <Alert
                severity={isPutUserError ? "error" : "success"}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setPutUserMessageOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {putUserMessage}
              </Alert>
            </Collapse>

            <Collapse in={postIconsMessageOpen}>
              <Alert
                severity={isPostIconsError ? "error" : "success"}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setPostIconsMessageOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {postIconsMessage}
              </Alert>
            </Collapse>
          </Box>
        </Box>
      </Grid>

      <Footer />
    </Grid>
  );
};

export default Profile;
