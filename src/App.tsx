import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ReviewAdd from "./pages/ReviewAdd";
import ReviewDetail from "./pages/ReviewDetail";
import ReviewEdit from "./pages/ReviewEdit";
import SignUp from "./pages/SignUp";
import { themeOptions } from "./components/themeOptions";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "./common/rootState.type";
import { appConfig } from "./common/config";

const App = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={`${appConfig.app.baseUrl}/`} element={<Home />} />
          <Route
            path={`${appConfig.app.baseUrl}/signup`}
            element={<SignUp />}
          />
          <Route path={`${appConfig.app.baseUrl}/login`} element={<Login />} />
          {auth ? (
            <>
              <Route
                path={`${appConfig.app.baseUrl}/profile`}
                element={<Profile />}
              />
              <Route
                path={`${appConfig.app.baseUrl}/new`}
                element={<ReviewAdd />}
              />
              <Route
                path={`${appConfig.app.baseUrl}/detail/:id`}
                element={<ReviewDetail />}
              />
              <Route
                path={`${appConfig.app.baseUrl}/edit/:id`}
                element={<ReviewEdit />}
              />
            </>
          ) : (
            <></>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
