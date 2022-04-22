import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getUser } from "../services/userService";
export interface IUserInfo {
  id: string;
  avatar: string;
  displayName: string;
  username: string;
}

interface IApplicationContext {
  loading: boolean;
  userInfo?: IUserInfo;
  isAuthenticated: boolean;
}

const initialValue: IApplicationContext = {
  loading: false,
  isAuthenticated: true
};

export const ApplicationContext =
  createContext<IApplicationContext>(initialValue);

export const useApplication = (): IApplicationContext => {
  return useContext(ApplicationContext);
};
export const ApplicationContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getUserInformation = useCallback(async () => {
    setLoading(true);
    const [error, user] = await getUser();
    setLoading(false);
    if (error) {
      return;
    }
    setUserInfo(user);
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    getUserInformation();
  }, [getUserInformation]);

  return (
    <ApplicationContext.Provider
      value={{
        loading,
        userInfo,
        isAuthenticated
      }}
    >
      {loading ? <Loader /> : children}
    </ApplicationContext.Provider>
  );
};
