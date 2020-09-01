import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  text-align: center;
  margin: 3rem 0;
  flex-direction: column;

  div {
    padding: 0 20rem;
  }

  span {
  }

  @media (max-width: 990px) {
    margin: 1rem 0;
    div {
      padding: 0 0.7rem;
    }
  }
`;

const Header = styled.h3``;

const Vision = () => {
  return (
    <Container className="">
      <Header>IPF Vision</Header>

      <div>
        <span>
          Provide a platform for Indian Professionals to interact with
          experienced – top professionals, policymakers and respected
          personalities of their respective fields in Nigeria and abroad
        </span>
      </div>
    </Container>
  );
};

export default Vision;
