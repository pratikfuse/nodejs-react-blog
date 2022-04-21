import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { authListener, removeAuthListener } from "./Auth/authHandler";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginPage } from "./pages/auth/login";
import { HomeRouter } from "./pages/home";
export const MainRouter: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authListener(navigate);
    return () => {
      removeAuthListener(navigate);
    };
  }, [navigate]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<HomeRouter />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
