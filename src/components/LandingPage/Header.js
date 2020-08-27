import React from "react";
import {
  HeaderContainer,
  HeaderLogoContaienr,
  HeaderContentContainer,
  HeaderText,
  Login,
  LoginButton,
} from "./styles";
import images from "../../assets/images";

import { Link } from "react-router-dom";
const LandingHeader = () => {
  return (
    <HeaderContainer>
      {/* <HeaderLogoContaienr>
        <Image src={images.logo} alt="ipf-logo" />
      </HeaderLogoContaienr> */}
      <HeaderContentContainer>
        <HeaderText>Indian Professional Forum, Nigeria</HeaderText>

        <LoginButton>
          <Link to="/login">
            <Login>Login</Login>
          </Link>
        </LoginButton>
      </HeaderContentContainer>
      {/* <HeaderLogoContaienr>
        <Image src={images.merge} alt="ipf-logo" />
      </HeaderLogoContaienr> */}
    </HeaderContainer>
  );
};

export default LandingHeader;
