import React from "react";
import { Route, Routes } from "react-router-dom";

interface IPrivateRoute {
  path: string;
  component: React.ReactNode;
}
export const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {
  return <Route {...rest} element={Component} />;
};
