import React from "react";
import styled from "styled-components";

export default React.memo(() => {
  return <Container></Container>;
});

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  overflow-y: auto;
`;
