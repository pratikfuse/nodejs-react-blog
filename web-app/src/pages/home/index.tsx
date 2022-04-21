import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { ApplicationContextProvider } from "../../hooks/applicationContext";

export const Home: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <div className="container-fluid">
        <Header />
        <Outlet />
      </div>
    </ApplicationContextProvider>
  );
};
