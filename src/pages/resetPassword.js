import React, { Component } from "react";
import { connect } from "react-redux";
import images from "../assets/images";
import IpfLogo from "../assets/IPF_Logo.png";
import AppWrapper from "../components/appWrapper";
import BlackBackground from "../components/black_bg";
import {
  CustomIntro,
  FooterLogo,
  FooterLogoContainer,
  FormLegend,
  Input,
  LoginBg,
  LoginBgWhite,
  LoginForm,
  LoginSectionOne,
  LogoContainer,
  StyledColorOrange,
  SubmitButton,
} from "../components/login-bg";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions";
import { resetPasswordCall } from "../services/requests";
class ResetPassword extends Component {
  state = {
    password: "",
    cPassword: "",
    msg: "",
    openSnack: false,
    type: "default",
  };

  ref = React.createRef()
  handleOnChange = (e) => {
    const { name, value } = e.target;

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if(strongRegex.test(value)) {
      this.ref.current.style.color = "green";
      this.ref.current.style.display = "inline-block";
      this.ref.current.innerText = "Strength : Strong";
    } else if(mediumRegex.test(value)) {
      this.ref.current.style.display = "inline-block";
    this.ref.current.style.color = "orange";
    this.ref.current.innerText = "Strength : Medium";
    
  } else {
    this.ref.current.style.display = "inline-block";
    this.ref.current.style.color = "red";
    this.ref.current.innerText = "Strength : Weak";

  }

    this.setState({
      [name]: value,
    });
  };
  submit = async (e) => {
    e.preventDefault();
    const { password, cPassword } = this.state;

    if(password.length < 6) {
      return this.fireSnackbar("Password must be 6 characters and above ", "error");
    }
    if (password !== cPassword) {
      return this.fireSnackbar("Password mismatch", "error");
    }

    try {
      const {
        match: { params },
      } = this.props;

      const { id, token } = params;

      if (!id || !token) {
        return;
      }

      this.props.showLoader(true);
      const response = await resetPasswordCall({ password, id, token });
      this.props.showLoader(false);
      this.fireSnackbar(response.data.message, "success");

      this.setState({
        password: "",
        cPassword: "",
      })
    } catch (error) {
      this.props.showLoader(false);

      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return this.fireSnackbar(error.response.data.message, "error");
      }
      this.fireSnackbar("Unsuccessfuly. Please try again", "error");
    }
  };

  fireSnackbar = (msg, type = "default") => {
    this.setState({
      msg,
      type,
      openSnack: true,
    });
  };

  render() {
    const { msg, openSnack, type } = this.state;
    return (
      <AppWrapper
        message={msg}
        open={openSnack}
        type={type}
        onClose={() => {
          this.setState({
            openSnack: false,
          });
        }}
      >
        <div className="container-fluid px-0  " style={{ padding: 0 }}>
          <div className="desktop">
            <BlackBackground>
              <div className="py-4 px-4">
                <LoginBg>
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <LoginSectionOne>
                        <LogoContainer />

                        <CustomIntro
                          fontWeight="bold"
                          color="#FA6400"
                          fontWeight="bold"
                          fontSize="24px"
                        >
                          Indian Professionals Forum, Nigeria
                        </CustomIntro>
                        <CustomIntro lineHeight="0.01">
                          Connecting Professionals and Beyond.......
                        </CustomIntro>
                      </LoginSectionOne>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <LoginBgWhite>
                        <div className="d-flex align-items-center w-100 h-100">
                          <LoginForm onSubmit={this.submit}>
                            <FormLegend>Reset Password</FormLegend>
                            <Input
                              type="password"
                              value={this.state.password}
                              onChange={this.handleOnChange}
                              name="password"
                              placeholder="New Password"
                            />
                            
                            <span style={{position :"relative", fontWeight : 'bold', display : "none",  bottom : "10px"}} ref={this.ref}>Strength : weak</span>

                            <Input
                              type="password"
                              value={this.state.cPassword}
                              onChange={this.handleOnChange}
                              name="cPassword"
                              placeholder="Confirm Password"
                            />
                            <div className="text-center">
                              <SubmitButton
                                type="submit"
                                disabled={!this.state.password}
                              >
                                Reset
                              </SubmitButton>
                            </div>

                            <div className="text-center mt-5">
                              <Link to="/login">
                                <StyledColorOrange>Login</StyledColorOrange>
                              </Link>

                              <br />

                              <Link to="/forgot">
                                <StyledColorOrange>
                                  Resend password reset link
                                </StyledColorOrange>
                              </Link>
                            </div>
                          </LoginForm>
                        </div>
                        <FooterLogoContainer>
                          <FooterLogo src={images.indianFlag} />
                          <FooterLogo src={images.naijaFlag} />
                        </FooterLogoContainer>
                      </LoginBgWhite>
                    </div>
                  </div>
                </LoginBg>
              </div>
            </BlackBackground>
          </div>
          <div className="mobile">
            <section
              className="p-5 d-flex flex-column align-items-center justify-content-center"
              style={{ background: "#2A4B5A" }}
            >
              <img
                className="mb-3"
                src={IpfLogo}
                alt="ipf"
                style={{ width: 200, height: 200, objectFit: "contain" }}
              />
              <h4 style={{ color: "#FA6400", fontWeight: "bolder" }}>
                India Professionals Forum, Nigeria
              </h4>
              <span className="text-italic">
                Connecting Professionals and Beyond
              </span>
            </section>
            <section>
              <div className="d-flex align-items-center w-100 h-100">
                <LoginForm onSubmit={this.submit}>
                  <FormLegend>Reset Password</FormLegend>
                  <Input
                    type="password"
                    value={this.state.password}
                    onChange={this.handleOnChange}
                    name="password"
                    placeholder="New Password"
                  />
                  <Input
                    type="password"
                    value={this.state.cPassword}
                    onChange={this.handleOnChange}
                    name="cPassword"
                    placeholder="Confirm Password"
                  />

                  <div className="text-center">
                    <SubmitButton disabled={!this.state.password} type="submit">
                      Reset
                    </SubmitButton>
                  </div>
                  <div className="text-center mt-5"></div>
                </LoginForm>
              </div>
            </section>
          </div>
        </div>
      </AppWrapper>
    );
  }
}

export default connect(null, actions)(ResetPassword);
