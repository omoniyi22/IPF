import React from "react";
import {
  HeaderContainer,
  HeaderLogoContaienr,
  HeaderContentContainer,
  Image,
  HeaderText,
  Login,
} from "./styles";
import images from "../../assets/images";

import { Link } from "react-router-dom";
const LandingHeader = () => {
  return (
    <HeaderContainer>
      <HeaderLogoContaienr>
        <Image src={images.logo} alt="ipf-logo" />
      </HeaderLogoContaienr>
      <HeaderContentContainer>
        <HeaderText>Indian Professional Forum, Nigeria</HeaderText>
      </HeaderContentContainer>
      <HeaderLogoContaienr>
        <Image src={images.merge} alt="ipf-logo" />
        <Link to="/login">
          <Login>Login</Login>
        </Link>
      </HeaderLogoContaienr>
    </HeaderContainer>
  );
};

export default LandingHeader;
