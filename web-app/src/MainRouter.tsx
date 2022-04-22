import React, { Suspense } from "react";
import { ToastContainer } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ApplicationContextProvider } from "./hooks/applicationContext";
import { Home } from "./pages/home";
import { ArticleListPage } from "./pages/home/ArticleListPage";
import { ArticleViewPage } from "./pages/home/ArticleViewPage";
import { CreateArticlePage } from "./pages/home/CreateArticlePage";
import { UpdateArticlePage } from "./pages/home/UpdateArticlePage";
import { ProtectedRoute } from "./ProtectedRoute";

export const MainRouter: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>

      <ApplicationContextProvider>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route path="/" element={<ArticleListPage />} />
            <Route path="/post/:articleId" element={<ArticleViewPage />} />
            <Route path="/create" element={
              <ProtectedRoute>
                <CreateArticlePage />
              </ProtectedRoute>
            }
            />
            <Route path="post/:articleId/edit" element={
              <ProtectedRoute>
                <UpdateArticlePage />
              </ProtectedRoute>
            }
            />
          </Route>
        </Routes>
      </ApplicationContextProvider>
      <ToastContainer />
    </Suspense>
  );
};
