import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ReviewAdd from "./pages/reviewAdd";
import ReviewDetail from "./pages/reviewDetail";
import ReviewEdit from "./pages/reviewEdit";
import SignUp from "./pages/signup";
import { themeOptions } from "./themeOptions";

const App = () => {
  const theme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Container maxWidth="xs">
          <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/signup`} element={<SignUp />} />
            <Route path={`/login`} element={<Login />} />
            <Route path={`/profile`} element={<Profile />} />
            <Route path={`/new`} element={<ReviewAdd />} />
            <Route path={`/detail/:id`} element={<ReviewDetail />} />
            <Route path={`/edit/:id`} element={<ReviewEdit />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
