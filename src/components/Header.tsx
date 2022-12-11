import * as React from "react";
import { AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function onHome() {
    navigate("/");
  }

  function onSignUp() {
    navigate("/signup");
  }

  function onLogin() {
    navigate("/login");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={onHome}>
          <MenuBookTwoToneIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          bookmail
        </Typography>
        <Button
          variant="contained"
          color="warning"
          sx={{ ml: 2 }}
          onClick={onSignUp}
        >
          新規会員登録
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{ ml: 2 }}
          onClick={onLogin}
        >
          ログイン
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
