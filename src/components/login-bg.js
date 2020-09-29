import images from "../assets/images";
const { default: styled } = require("styled-components");

const FooterLogoContainer = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
`;

const FooterLogo = styled.img`
  width: 46.51px;
  height: 35px;
  margin: 0.2rem;
`;
const CustomIntro = styled.p`
  font-style: normal;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "normal")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
  color: ${({ color }) => (color ? color : "#fff")};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "1")};
`;

const LoginBg = styled.section`
  width: calc(100vw - 48px);
  background: #2a4b5a;
  height: calc(100vh - 48px);
  border-radius: 10px;
`;

const LogoContainer = styled.div`
  background-image: url(${images.logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 132px;
  width: 115px;
`;

const LoginSectionOne = styled.div`
  height: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginBgWhite = styled.section`
  background: #fff;
  width: 100%;
  height: calc(100vh - 100px);
  border-radius: 0 10px 0px 0px;
`;

const Input = styled.input`
  border: 3px solid #c4c4c4 !important;
  border-radius: 30px !important;
  padding: 4px 4px 4px 22px !important;
  margin-bottom: 20px !important;
  font-family: Open Sans, sans-serif;
  font-size: 20px !important;
  font-weight: bold;
  ::placeholder {
    color: rgba(0, 0, 0, 0.36);
    font-family: Open Sans, sans-serif;
    font-size: 20px;
    font-weight: bold;
  }
`;

const LoginForm = styled.form`
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
`;

const FormLegend = styled.legend`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  color: #2a4b5a;
  text-align: center;
  margin-bottom: 20px;
  font-size: 30px;
  letter-spacing: 0.05em;
`;

const SubmitButton = styled.button`
  background: #006d3a;
  border: 1px solid #006d3a;
  border-radius: 32px;
  color: #fff;
  padding: 15px 15px;
  width: 198px;
  font-size: 24px;
  line-height: 33px;
  margin-top: 20px;
  letter-spacing: 0.05em;
`;

const StyledColorOrange = styled.span`
  color: #fa6400;
`;

const SignupLink = styled.a`
  color: #fa6400 !important;
  margin-left: 4px;
  :hover {
    text-decoration: underline !important;
    cursor: pointer;
  }
`;

export {
  LoginBg,
  LoginBgWhite,
  Input,
  LoginForm,
  FormLegend,
  SubmitButton,
  SignupLink,
  StyledColorOrange,
  LoginSectionOne,
  LogoContainer,
  CustomIntro,
  FooterLogoContainer,
  FooterLogo,
};
