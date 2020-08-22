import styled from "styled-components";
import images from "../../assets/images";

// Header Contianer

const HeaderContainer = styled.div`
  border: 1px solid red;
`;

// Main COntainer

const MainContainer = styled.div`
  border: 1px solid orange;
  background-image: url(${images.landing});
  background-position: center;
  height: 60%;
  background-repeat: no-repeat;
`;

const FooterLogoContainer = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
`;

const FooterLogo = styled.img`
  width: 46.51px;
  height: 35px;
`;

const FooterContainer = styled.footer`
  border: 1px solid orange;
  height: 100vh;
`;

const FooterSection = styled.div`
  border: 1px solid red;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  background: #2a4b5a;
`;

const FooterText = styled.p`
  font-style: normal;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  font-weight: 600;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
`;
export {
  FooterContainer,
  FooterText,
  FooterSection,
  FooterLogo,
  FooterLogoContainer,
  MainContainer,
  HeaderContainer,
};
