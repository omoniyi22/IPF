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
      <HeaderContentContainer>
        <HeaderText>Indian Professionals Forum, Nigeria</HeaderText>

        <LoginButton>
          <Link to="/login">
            <Login>Login</Login>
          </Link>
        </LoginButton>
      </HeaderContentContainer>
    </HeaderContainer>
  );
};

export default LandingHeader;
