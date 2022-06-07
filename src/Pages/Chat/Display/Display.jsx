import styled from "styled-components";
import Chatbox from "./ChatBox";
import Conversation from "./Conversation";
import Header from "./Header";

export default function Content() {
  return (
    <Container>
      <Header />
      <Conversation />
      <Chatbox />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
