import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/userContext";
import Content from "./Display";
import Sidebar from "./Sidebar/Sidebar";

export default function Chat() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Container>
      <ChatContainer>
        <Sidebar />
        <Content />
      </ChatContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: center;
  width: 100%;
  justify-content: center;
  border-radius: 12px;
`;

const ChatContainer = styled.div`
  margin-top: 60px;
  width: 95%;
  height: calc(100vh - 150px);
  max-width: 1600px;
  max-height: 800px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 4px 6px 20px hsl(0, 0%, 65%);
  display: flex;
`;
