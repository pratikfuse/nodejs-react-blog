import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { withError } from "../utils";

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
  const [userInfo, setUserInfo] = useState<IUserInfo>({} as IUserInfo);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getUserInformation = useCallback(async () => {
    setLoading(true);
    const [error, user] = await withError(getUser());
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
      {loading ? <div>Loading</div> : children}
    </ApplicationContext.Provider>
  );
};
