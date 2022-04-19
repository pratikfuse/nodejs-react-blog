import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/auth/login";
import { ArticleListPage } from "./pages/app/ArticleListPage";
import { ArticleViewPage } from "./pages/app/ArticleViewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/">
          <Route
            path="/article/:id"
            element={<ArticleViewPage />}
          />
          <Route path="" element={<ArticleListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
