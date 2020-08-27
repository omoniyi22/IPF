import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import images from "../assets/images";
import IpfLogo from "../assets/IPF_Logo.png";
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
  SubmitButton,
} from "../components/login-bg";
import * as actions from "../redux/actions";
import { forgotPasswordCall } from "../services/requests";
import AppWrapper from "../components/appWrapper";
class ForgotPassword extends Component {
  state = { account: "", msg: "", openSnack: false, type: "default" };
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      account: value,
    });
  };
  submit = async (e) => {
    e.preventDefault();
    try {
      this.props.showLoader(true);
      const { account } = this.state;
      const response = await forgotPasswordCall({ account });
      this.props.showLoader(false);
      this.fireSnackbar(response.data.message, "success");
    } catch (error) {
      this.props.showLoader(false);
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
                            <FormLegend>Reset Password</FormLegend>
                            <Input
                              value={this.state.account}
                              onChange={this.handleOnChange}
                              name="account"
                              placeholder="Member ID /Email address"
                            />
                            <div className="text-center">
                              <SubmitButton
                                type="submit"
                                disabled={!this.state.account}
                              >
                                Submit
                              </SubmitButton>
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
                    value={this.state.account}
                    onChange={this.handleOnChange}
                    name="account"
                    placeholder="Member ID /Email address"
                  />
                  <div className="text-center">
                    <SubmitButton disabled={!this.state.account} type="submit">
                      Submit
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

export default connect(null, actions)(ForgotPassword);
