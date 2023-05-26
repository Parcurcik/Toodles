import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import ShortPage from "./pages/ShortPage";
import LongPage from "./pages/LongPage";
import CodePage from "./pages/CodePage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

const Router = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token && window.location.pathname !== "/registration") {
      navigate("/registration");
    }
    console.log(access_token);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/short" element={<ShortPage />} />
      <Route path="/long" element={<LongPage />} />
      <Route path="/code" element={<CodePage />} />
      <Route path="/registration" element={<RegisterPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;