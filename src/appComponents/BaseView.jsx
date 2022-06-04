import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/userContext";
const rightBoxStyle = { flexDirection: "row-reverse" };

export default function BaseView({ children }) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <BaseStyle>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button sx={{ fontSize: "20px" }}>
              <Link to="/">React Chat App</Link>
            </Button>
          </Typography>
          <Box sx={{ rightBoxStyle }}>
            <Button variant="contained" sx={{ fontSize: "16px" }}>
              {isLoggedIn ? (
                <Link to="/">Open Chat</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </Button>
          </Box>
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
