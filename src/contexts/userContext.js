import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get("/auth")
      .then((res) => setUserData(res.data))
      .then(setIsLoading(false));
  }, []);

  if (isLoading) return null;

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn: !!userData?.email,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
