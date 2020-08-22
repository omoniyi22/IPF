import React from "react";
import {
  FooterContainer,
  FooterText,
  FooterSection,
  FooterLogo,
  FooterLogoContainer,
  MainContainer,
  HeaderContainer,
} from "./styles";
import images from "../../assets/images";

const LandingFooter = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterLogoContainer>
          <FooterLogo src={images.indianFlag} />
          <FooterLogo src={images.naijaFlag} />
        </FooterLogoContainer>
      </FooterSection>
      <FooterText>&copy; 2020 IPF. All Rights Reserved. </FooterText>
    </FooterContainer>
  );
};

export default LandingFooter;
