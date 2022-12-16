import * as React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../common/rootState.type";
import { signOut } from "./authSlice";
import { useCookies } from "react-cookie";
import {
  AccountCircle,
  MenuBookTwoTone as MenuBookTwoToneIcon,
} from "@mui/icons-material";

const Header = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies();

  function onHome() {
    navigate("/");
  }

  function onSignUp() {
    navigate("/signup");
  }

  function onLogin() {
    navigate("/login");
  }

  function onProfile() {
    navigate("/profile");
  }

  function onLogout() {
    dispatch(signOut());
    removeCookie("token");
    navigate("/login");
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={onHome}>
          <MenuBookTwoToneIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          bookmail
        </Typography>
        {auth ? (
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleMenu}
              sx={{ p: 0 }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  onProfile();
                  handleClose();
                }}
              >
                プロフィール
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onLogout();
                  handleClose();
                }}
              >
                ログアウト
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
