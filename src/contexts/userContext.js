import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkCookie = async () => {
      try {
        const result = await axios.get("/auth");
        setUserData(result.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    checkCookie();
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
