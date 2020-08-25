import styled from "styled-components";
import images from "../../assets/images";

//Landing Header section

const HeaderContainer = styled.div`
  height: 30vh;
  background-color: #2a4b5c;
  display: flex;
  padding: 0rem 1.4rem;
`;

const HeaderLogoContaienr = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeaderContentContainer = styled.div`
  width: 60%;
`;

const Image = styled.img`
  height: 140px;
  width: 135px;
`;

const HeaderText = styled.h1`
  color: #fff;
  word-break: normal;
  text-align: center;
  font-weight: bold;
  font-size: 4rem;
`;

//FOOTER
const FooterContainer = styled.div`
  height: 10vh;
  background-color: #2a4b5c;
  padding: 0rem 1.4rem;
`;

//Main Content

const LandingContentContainer = styled.div`
  display: flex;
  height: 60vh;
  // padding: 0rem 1.4rem;
  background: #fff;
`;

const ContentSectionA = styled.div`

  width: 40%;
  padding : 0rem 0.9rem;
  // background-image: url(${images.logo});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  filter: brightness(0.78);
`;

const ContentOffset = styled.div`
  opacity: 1;
`;

const UL = styled.ul`
  opacity: 1;
`;
const LI = styled.li`
  color: #000;
  font-weight: bold;
  font-size: 1.1rem;
`;

const CarouselSection = styled.div`
  width: 60%;
  background: #bfccd4;
  box-shadow: 10px 10px 9px -5px rgba(117, 117, 125, 0.78);
  -webkit-box-shadow: 10px 10px 9px -5px rgba(117, 117, 125, 0.78);
  -moz-box-shadow: 10px 10px 9px -5px rgba(117, 117, 125, 0.78);
`;

const Login = styled.a`
  color: #fff !important;
  font-weight: bold;
  font-size: 1.4rem;
  position: relative;
  top: 0.4rem;
  cursor: pointer;

  &:hover {
    color: green !important;
  }
`;

export {
  HeaderContainer,
  HeaderLogoContaienr,
  HeaderContentContainer,
  Image,
  HeaderText,
  FooterContainer,
  LandingContentContainer,
  ContentSectionA,
  UL,
  ContentOffset,
  LI,
  CarouselSection,
  Login,
};
