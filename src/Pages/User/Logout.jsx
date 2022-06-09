import axios from "axios";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

// {!} Need to disconnect from sockets after logging out

export default function Logout() {
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    setUserData();
    axios.get("/auth/logout");
  });

  return <Navigate to="/" />;
}
