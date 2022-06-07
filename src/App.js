import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BaseView from "./appComponents/BaseView";
import { UserContext, UserProvider } from "./contexts/userContext";
import Chat from "./Pages/Chat";
import Home from "./Pages/Home/";
import * as User from "./Pages/User";

const theme = createTheme({});

const NotFound = () => <div>404 Not Found</div>;

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <UserProvider>
      <BrowserRouter>
        <BaseView>{children}</BaseView>
      </BrowserRouter>
    </UserProvider>
  </ThemeProvider>
);

const parseRoute = (filter, props, key) =>
  filter ? (
    <Route key={key + "N"} element={<Navigate to="/" />} {...props} />
  ) : (
    <Route key={key + "R"} {...props} />
  );

function UserRoutes() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      {[
        { path: "/login", exact: true, element: <User.Login /> },
        { path: "/signup", exact: true, element: <User.SignUp /> },
      ].map((props, index) => parseRoute(isLoggedIn, props, index + "uR"))}
      {[{ path: "/c/:id", exact: true, element: <Chat /> }].map(
        (props, index) => parseRoute(!isLoggedIn, props, index + "aR")
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Wrapper>
      <UserRoutes />
    </Wrapper>
  );
}
