import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [inChat, setInChat] = useState(false);

  useEffect(() => {
    axios
      .get("/auth")
      .then((res) => setUserData(res.data))
      .then(setIsLoading(false));
  }, []);

  useEffect(() => {
    const checkPath = () => {
      const pathname = window.location.pathname;
      console.log(userData?.email);

      if (pathname[0] && pathname[1] === "c") return true;
      if (pathname.length < 3) return false;
      for (let i = 0; i < 3; i++) if ("/c/"[i] !== pathname[i]) return false;
      return true;
    };
    setInChat(userData?.email && checkPath());
  }, [userData]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  if (isLoading) return null;

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn: !!userData?.email,
        inChat,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
