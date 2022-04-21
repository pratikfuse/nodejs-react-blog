import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { withError } from "../utils";

export interface IUserInfo {
  id: string;
  name: string;
  avatar: string;
}

interface IApplicationContext {
  loading: boolean;
  userInfo?: IUserInfo;
}

const initialValue = {
  loading: false,
};

export const ApplicationContext =
  createContext<IApplicationContext>(initialValue);

export const useApplication = (): IApplicationContext => {
  return useContext(ApplicationContext);
};
export const ApplicationContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({} as IUserInfo);

  const getUserInformation = useCallback(async () => {
    setLoading(true);
    const [error, user] = await withError(getUser());
    setLoading(false);
    if (error) {
        return;
    }
    setUserInfo(user);
  }, []);

  useEffect(() => {
    getUserInformation();
  }, [getUserInformation]);

  return (
    <ApplicationContext.Provider
      value={{
        loading,
        userInfo,
      }}
    >
      {loading ? <div>Loading</div> : children}
    </ApplicationContext.Provider>
  );
};
