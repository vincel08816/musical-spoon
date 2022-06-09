import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BaseView from "./appComponents/BaseView";
import { UserProvider } from "./contexts/userContext";
import AddFriend from "./Pages/AddFriend";
import Chat from "./Pages/Chat";
import Home from "./Pages/Home/";
import * as User from "./Pages/User";

// {!} TODO: Add Not found page if I have time...

const theme = createTheme({});

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
      <Route path="/add-friend" exact element={<AddFriend />} />
      <Route path="/c" exact element={<Chat />} />
      <Route path="/c/:id" exact element={<Chat />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Wrapper>
  );
}
