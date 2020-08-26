import React from "react";
import LandingHeader from "../components/LandingPage/Header";
import HeaderFooter from "../components/LandingPage/footer";
import LandingContent from "../components/LandingPage/main";
import styled from "styled-components";

const LandingContainer = styled.div`
  border: 1px solid pink;
`;
const LandingPage = () => {
  return (
    <LandingContainer>
      <LandingHeader />
      <LandingContent />
      <HeaderFooter />
    </LandingContainer>
  );
};

export default LandingPage;