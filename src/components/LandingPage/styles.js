import styled from "styled-components";
import images from "../../assets/images";

//Landing Header section

const HeaderContainer = styled.div`
  height: 30vh;
  display: flex;

  width: 100vw;

  background: url("${images.logo}"), url("${images.merge}");
  background-repeat: no-repeat;
  background-size: 6rem;
  background-position: center left 5%, center right 5%;
  background-color: #2a4b5c;

  @media (max-width: 768px) {
    background-size: 50px;
    height: 20vh;
  }
  justify-content: center;
  display: flex;
  align-items: center;

  position: relative;
`;

const HeaderLogoContaienr = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeaderContentContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 0rem 3rem;
  @media (max-width: 768px) {
    width: 82%;
  }
`;

const LoginButton = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 7rem;
  font-size: 15px;
  font-weight: 700;

  @media (max-width: 768px) {
    right: 1.5rem;
    * {
      font-size: 13px;
      font-weight: 700;
    }
  }

  @media (max-width: 992px) {
    right: 3rem;
  }
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

  @media (max-width: 992px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 500px) {
    font-size: 1.3rem;
  }
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
  width: 100%;
  // background: #fff;

  justify-content: space-between;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
  }
`;

const ContentSectionA = styled.div`
  width: 40%;
  padding: 0rem 0.9rem;

  filter: brightness(0.78);
  @media (max-width: 768px) {
    width: 100%;
  }
  position: relative;
`;

const ContentSectionBackground = styled.div`
  background-image: url(${images.logo});
  position: absolute;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  opacity: 0.1;
  width: 90%;
  height: 90%;
`;

const LI = styled.li`
  color: #000;
  font-weight: normal;
  font-size: 1.1rem;
  font-family: "verdana";
`;

const CarouselSection = styled.div`
  width: 60%;
  background: #bfccd4;
  box-shadow: 10px 10px 9px -5px rgba(117, 117, 125, 0.78);
  -webkit-box-shadow: 10px 10px 9px -5px rgba(117, 117, 125, 0.78);
  -moz-box-shadow: 10px 10px 9px -5px rgba(117, 117, 125, 0.78);

  @media (max-width: 768px) {
    width: 100%;

    .carousel {
      height: 30vh;

      img {
        height: 30vh;
        object-fit: cover;
        width: 100%;
      }
    }
  }
`;

const Login = styled.a`
  color: #fff !important;
  position: relative;
  top: 0.1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  left: 2rem;
  background: #f58634;

  &:hover {
    /* color: green !important; */
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
  LI,
  CarouselSection,
  Login,
  LoginButton,
  ContentSectionBackground,
};
