import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { ArticleListPage } from "./pages/home/ArticleListPage";
import { ArticleViewPage } from "./pages/home/ArticleViewPage";

export const MainRouter: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/" element={<ArticleListPage />} />
          <Route path="/post/:articleId" element={<ArticleViewPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
