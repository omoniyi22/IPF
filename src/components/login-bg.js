const { default: styled } = require("styled-components");


const LoginBg = styled.section`
    background: #2A4B5A;
    width: calc(100vw - 48px);
    height: calc(100vh - 48px);
    border-radius: 10px;
`

const LoginBgWhite = styled.section`
    background: #fff;
    width: 100%;
    height: calc(100vh - 100px);
    border-radius: 0 10px 0px 0px;
`

const Input = styled.input`
    border: 3px solid #C4C4C4 !important;
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
`

const LoginForm = styled.form`
    width: 80%;
    margin: 0 auto;
    padding: 10px 0;
`

const FormLegend = styled.legend`
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    color: #2A4B5A;
    text-align:center;
    margin-bottom: 20px;
    font-size: 30px;
    letter-spacing: 0.05em;
`

const SubmitButton = styled.button`
    background: #006D3A;
    border: 1px solid #006D3A;
    border-radius: 32px;
    color: #fff;
    padding: 15px 15px;
    width: 198px;
    font-size: 24px;
    line-height: 33px;
    margin-top: 20px;
    letter-spacing: 0.05em;
`

const StyledColorOrange = styled.span`
      color: #FA6400;
`

const SignupLink = styled.a`
        color: #FA6400 !important;
        margin-left: 4px; 
        :hover{
            text-decoration: underline !important;
            cursor: pointer;
        }
`

export  {
    LoginBg,
    LoginBgWhite,
    Input,
    LoginForm,
    FormLegend,
    SubmitButton,
    SignupLink,
    StyledColorOrange
};