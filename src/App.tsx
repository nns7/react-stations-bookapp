import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ReviewAdd from "./pages/reviewAdd";
import ReviewDetail from "./pages/reviewDetail";
import ReviewEdit from "./pages/reviewEdit";
import SignUp from "./pages/signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/signup`} element={<SignUp />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/profile`} element={<Profile />} />
        <Route path={`/new`} element={<ReviewAdd />} />
        <Route path={`/detail/:id`} element={<ReviewDetail />} />
        <Route path={`/edit/:id`} element={<ReviewEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
