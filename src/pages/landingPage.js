import React from "react";
import LandingHeader from "../components/LandingPage/Header";
import HeaderFooter from "../components/LandingPage/footer";
import LandingContent from "../components/LandingPage/main";
import styled from "styled-components";
import Vision from "../components/LandingPage/vision";

const LandingContainer = styled.div`
  width: 100vw;
`;
const LandingPage = () => {
  return (
    <LandingContainer>
      <LandingHeader />
      <LandingContent />
      <Vision />
      <HeaderFooter />
    </LandingContainer>
  );
};

export default LandingPage;
