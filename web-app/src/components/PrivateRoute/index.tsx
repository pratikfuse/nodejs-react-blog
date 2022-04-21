import React, { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ApplicationContextProvider } from "../../hooks/applicationContext";
import { ArticleListPage } from "../../pages/home/ArticleListPage";
import { ArticleViewPage } from "../../pages/home/ArticleViewPage";

export const PrivateRoute: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);


  return (
    authenticated ? <Outlet /> : <Navigate replace={true} to={'/auth/login'}/>
  )
  return (
    <React.Fragment>
   
    </React.Fragment>
  );
};
