import { Button } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/userContext";

export default function Home() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src="https://c.tenor.com/mGrDJAi-URQAAAAC/panda-bear.gif"
        alt="stoopid"
        style={{ padding: "50px" }}
      />
      Random Stuff to put in here
      <div style={{ padding: "20px" }} />
      <Button variant="contained" sx={{ fontSize: "16px" }}>
        {isLoggedIn ? (
          <Link to="/">Open React Chat App</Link>
        ) : (
          <Link to="/login">Log into React Chat App</Link>
        )}
      </Button>
    </div>
  );
}

const Link = styled(NavLink)`
  color: white;
  text-decoration: none;
`;
