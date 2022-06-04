import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BaseView from "./appComponents/BaseView";
import { UserProvider } from "./contexts/userContext";
import Home from "./Pages/Home/";
import * as User from "./Pages/User";

const theme = createTheme({});

const NotFound = () => <div>404 Not Found</div>;

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <UserProvider>
      <BrowserRouter>
        <BaseView>
          <Routes>{children}</Routes>
        </BaseView>
      </BrowserRouter>
    </UserProvider>
  </ThemeProvider>
);

export default function App() {
  return (
    <Wrapper>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" exact element={<User.Login />} />
      <Route path="/signup" exact element={<User.SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Wrapper>
  );
}
