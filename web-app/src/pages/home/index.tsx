import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";

export const Home: React.FC = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Outlet />
    </div>
  );
};
