import React from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Settingpage from "./pages/SettingPage/SettingPage";
import { ThemeProvider } from "./contexts/Theme";
import WorkSpacePage from "./pages/WorkSpacePage/WorkSpacePage";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";

const App = () => {
  return (
    <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard/:id"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setting"
              element={
                <ProtectedRoute>
                  <Settingpage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workspace/:id"
              element={
                <ProtectedRoute>
                  <WorkSpacePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      
    </ThemeProvider>
  );
};

export default App;
