import React from "react";
import styled from "styled-components";

const TopBar = () => {
  return (
    <Container>
      <button>BUTTON 1</button>
      <button>BUTTON 1</button>
      <button>BUTTON 1</button>
    </Container>
  );
};

export default TopBar;

const Container = styled.div`
  height: 100%;
  background: black;
  color: white;
`;
