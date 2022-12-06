import * as React from "react";
import { AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton>
          <MenuBookTwoToneIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          bookmail
        </Typography>
        <Button variant="contained" color="warning" sx={{ ml: 2 }}>
          signup
        </Button>
        <Button variant="contained" color="inherit" sx={{ ml: 2 }}>
          login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
