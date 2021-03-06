import styled from "styled-components";
export default function Conversation() {
  return <Container></Container>;
}

const Container = styled.div`
  flex: 1;
  border: 1px solid lightgrey;
  border-right: none;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-image: url("https://raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/art/bg_initial.jpg");
  background-position-y: -54px;
  background-attachment: fixed;
`;
