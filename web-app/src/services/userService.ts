import { IUserInfo } from "../hooks/applicationContext";
import api from "./axios";

export const getUser = () => {
  return api.get<IUserInfo>('/auth/profile');
};
