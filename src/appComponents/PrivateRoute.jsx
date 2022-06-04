import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { UserContext } from "./contexts/userContext";

export const PrivateRoute = (props) => {
  const { isLoggedIn } = useContext(UserContext);
  return isLoggedIn ? <Route {...props} /> : <Navigate to="/login" />;
};
