import * as React from "react";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ flexGrow: 1, pt: 2 }}
    >
      Copyright © bookmail.com All Rights Reserved.
    </Typography>
  );
};

export default Footer;
