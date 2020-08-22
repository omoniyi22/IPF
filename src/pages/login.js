import React, { Component } from "react";
import BlackBackground from "../components/black_bg";
import {
  LoginBg,
  LoginBgWhite,
  Input,
  SubmitButton,
  LoginForm,
  FormLegend,
  StyledColorOrange,
  LoginSectionOne,
  LogoContainer,
  CustomIntro,
  FooterLogoContainer,
  FooterLogo,
} from "../components/login-bg";
import { Link } from "react-router-dom";
import Axios from "axios";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import IpfLogo from "../assets/IPF_Logo.png";
import images from "../assets/images";

class Login extends Component {
  state = { emailAddress: "", password: "" };
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  submit = async (e) => {
    e.preventDefault();
    try {
      this.props.showLoader(true);
      const { emailAddress, password } = this.state;
      const response = await Axios.post("/api/v1/auth/login", {
        emailAddress,
        password,
      });
      const {
        data: {
          token,
          firstName,
          lastName,
          email,
          isAdmin,
          approved,
          position,
          phoneNumber,
          role,
          nrole,
        },
      } = response.data;
      localStorage.setItem("x-access-token", token);
      localStorage.setItem(
        "ipf-user",
        JSON.stringify({
          firstName,
          lastName,
          email,
          isAdmin,
          approved,
          position,
          phoneNumber,
          role,
          nrole,
        })
      );
      this.props.showLoader(false);
      if (isAdmin) {
        return this.props.history.push("/");
      }
      return this.props.history.push("/user/dashboard");
    } catch (error) {
      console.error(error);
      this.props.showLoader(false);
    }
  };
  render() {
    return (
      <div className="container-fluid" style={{ padding: 0 }}>
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
                          <FormLegend>Welcome</FormLegend>
                          <Input
                            value={this.state.emailAddress}
                            onChange={this.handleOnChange}
                            name="emailAddress"
                            placeholder="Username/Email"
                          />
                          <Input
                            value={this.state.password}
                            onChange={this.handleOnChange}
                            name="password"
                            type="password"
                            placeholder="password"
                          />
                          <div className="text-center">
                            <SubmitButton type="submit">Sign In</SubmitButton>
                          </div>
                          <div className="text-center mt-5">
                            <span>Don't have an account?</span>
                            <Link to="#">
                              <StyledColorOrange>Sign up</StyledColorOrange>
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
                <FormLegend>Welcome</FormLegend>
                <Input
                  value={this.state.emailAddress}
                  onChange={this.handleOnChange}
                  name="emailAddress"
                  placeholder="Username/Email"
                />
                <Input
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <div className="text-center">
                  <SubmitButton type="submit">Sign In</SubmitButton>
                </div>
                <div className="text-center mt-5">
                  <span>Don't have an account?</span>
                  <Link to="#">
                    <StyledColorOrange>Sign up</StyledColorOrange>
                  </Link>
                </div>
              </LoginForm>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Login);
