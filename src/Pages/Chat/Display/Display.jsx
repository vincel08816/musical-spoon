import styled from "styled-components";
import Conversation from "./Conversation";
import Header from "./Header";

export default function Content() {
  return (
    <Container>
      <Header />
      <Conversation />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
