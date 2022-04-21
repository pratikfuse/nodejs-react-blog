import React from "react";
import { Route, Routes } from "react-router-dom";
import { ApplicationContextProvider } from "../../hooks/applicationContext";
import { ArticleListPage } from "./ArticleListPage";
import { ArticleViewPage } from "./ArticleViewPage";

export const HomeRouter: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <div className="wrapper">
        <Routes>
          <Route path={"/"} element={<ArticleListPage />} />
          <Route path="/:articleId" element={<ArticleViewPage />} />
        </Routes>
      </div>
    </ApplicationContextProvider>
  );
};
