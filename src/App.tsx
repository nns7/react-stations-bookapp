import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ReviewAdd from "./pages/ReviewAdd";
import ReviewDetail from "./pages/ReviewDetail";
import ReviewEdit from "./pages/ReviewEdit";
import SignUp from "./pages/SignUp";
import { themeOptions } from "./components/themeOptions";

const App = () => {
  const theme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/signup`} element={<SignUp />} />
          <Route path={`/login`} element={<Login />} />
          <Route path={`/profile`} element={<Profile />} />
          <Route path={`/new`} element={<ReviewAdd />} />
          <Route path={`/detail/:id`} element={<ReviewDetail />} />
          <Route path={`/edit/:id`} element={<ReviewEdit />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
