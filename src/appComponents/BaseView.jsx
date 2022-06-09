import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/userContext";
const rightBoxStyle = { flexDirection: "row-reverse" };

export default function BaseView({ children }) {
  const { isLoggedIn, setUserData, inChat } = useContext(UserContext);

  const getButton = () => {
    if (inChat)
      return (
        <Button
          variant="contained"
          sx={{ fontSize: "16px" }}
          onClick={() => {
            setUserData({});
            axios.delete("/auth/logout");
          }}
        >
          Logout
        </Button>
      );
    return (
      <Button variant="contained" sx={{ fontSize: "16px" }}>
        {isLoggedIn ? (
          <Link to="/c/">Open Chat</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </Button>
    );
  };

  return (
    <BaseStyle>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button sx={{ fontSize: "20px" }}>
              <Link to="/">React Chat App</Link>
            </Button>
          </Typography>
          <Box sx={{ rightBoxStyle }}>{getButton()}</Box>
        </Toolbar>
      </AppBar>
      <main style={{ display: "flex", justifyContent: "center" }}>
        {children}
      </main>
    </BaseStyle>
  );
}

const BaseStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const Link = styled(NavLink)`
  color: white;
  text-decoration: none;
`;
