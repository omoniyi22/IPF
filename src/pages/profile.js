import React, { Component, useState } from "react";
import { TextInput, FormButton } from "../components/components";
import Axios from "axios";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import Dashboard from "../hoc/Dashboard";
import PhoneNumber from "../components/General/phoneInput";
import styled from "styled-components";
import Images from "../assets/images";
import AppWrapper from "../components/appWrapper";
import { api, attachApiToken } from "../services/api";
import { phoneNumberRegx, emailRegx } from "../utils/regex";

class ManageProfile extends Component {
  state = {
    phone1_whatsapp: 0,
    phone2_whatsapp: 0,
    email1_primary: false,
    email2_primary: false,
    msg: "",
    type: "default",
    openSnackbar: false,
    passport: "",
    phoneNumber: "",
    phoneNumber2: "",
    emailAddress: "",
    emailAddress2: "",
    avatar: "",
  };
  componentDidMount() {
    this.getUserDetail();
  }
  getUserDetail = async () => {
    try {
      this.props.showLoader(true);
      const authApi = await attachApiToken(api);
      const response = await authApi.get("/auth/details");
      const data = response.data.data;
      this.setState({ ...data }, () => this.props.showLoader());
    } catch (error) {
      this.props.showLoader();
    }
  };
  submit = async (e) => {
    e.preventDefault();
    try {
      const {
        phone2_whatsapp,
        phone1_whatsapp,
        phoneNumber,
        phoneNumber2,
        email1_primary,
        email2_primary,
        emailAddress,
        emailAddress2,
        avatar,
        passport,
      } = this.state;
      if (
        !phoneNumberRegx.test(phoneNumber) ||
        !phoneNumberRegx.test(phoneNumber2)
      ) {
        return this.handleFireSnackbar("Phone Number is not valid", "error");
      }
      if (!emailRegx.test(emailAddress) || !emailRegx.test(emailAddress2)) {
        return this.handleFireSnackbar("Email Address is not valid", "error");
      }

      if (!avatar) {
        return this.handleFireSnackbar(
          "Please add your profile picture",
          "error"
        );
      }

      if (!passport) {
        return this.handleFireSnackbar(
          "Please add your passport number ",
          "error"
        );
      }

      if (this.state.passport.length !== 8) {
        return this.handleFireSnackbar("Passport number  is invalid", "error");
      }

      const data = {
        ...this.state,
        email1_primary: email1_primary ? true : false,
        email2_primary: email2_primary ? true : false,
      };

      this.props.showLoader(true);

      const authApi = await attachApiToken(api);
      await authApi.patch("/auth/edit", data);
      this.props.showLoader();
      this.handleFireSnackbar("Update Successful", "success");
    } catch (error) {
      let _error = "Some errors were encountered";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        _error = error.response.data.message;
      }

      this.handleFireSnackbar(_error, "error");
      this.props.showLoader();
    }
  };

  handleFireSnackbar = (msg, type = "default") => {
    this.setState({
      msg,
      openSnackbar: true,
      type,
    });
  };
  handleOnChange = (e, phone = false) => {
    if (phone) {
      const { name, value } = e;
      console.log(e, "I AM HERE");
      this.setState({
        [name]: value,
      });

      return;
    }
    const {
      target: { name, value },
    } = e;
    this.setState({
      [name]: value,
    });
  };
  uploadWidget = () => {
    const $this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: "dnevwxinm", upload_preset: "onfjtj7b", tags: ["xmas"] },
      function (error, result) {
        if (error) {
          return console.log(error);
        }
        $this.setState({
          avatar: result[0].url,
        });
      }
    );
  };

  onClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };
  render() {
    const { msg, type, openSnackbar } = this.state;
    return (
      <Dashboard>
        <AppWrapper
          open={openSnackbar}
          message={msg}
          type={type}
          onClose={this.onClose}
        >
          <div className="profile container-fluid py-3">
            <div className="row justify-content-center my-4">
              <div className="circle-avatar text-center d-flex align-items-center justify-content-center">
                {this.state.avatar ? (
                  <img
                    className="img-avatar"
                    src={this.state.avatar}
                    alt="profile"
                  />
                ) : (
                  <span>
                    <i
                      style={{ fontSize: 200, color: "#bdbdbd" }}
                      className="material-icons"
                    >
                      account_circle
                    </i>
                  </span>
                )}
                <span onClick={this.uploadWidget} className="camera-button">
                  <i className="material-icons">camera_enhance</i>
                </span>
              </div>
            </div>
            <BadgeContainer>
              {this.state.position && (
                <>
                  <CustomBadge />
                  {this.state.position && (
                    <Position className="mr-2">{this.state.position}</Position>
                  )}
                  <Position>{this.state.position_duration || "null"}</Position>
                </>
              )}
            </BadgeContainer>
            <form onSubmit={this.submit} className="mt-3 px-3">
              <div className="row">
                <div className="col-lg-6">
                  <label>First Name</label>
                  <TextInput
                    name={"firstName"}
                    onChange={this.handleOnChange}
                    value={this.state.firstName}
                  />
                </div>
                <div className="col-lg-6">
                  <label>Last Name</label>
                  <TextInput
                    name={"lastName"}
                    onChange={this.handleOnChange}
                    value={this.state.lastName}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label>Email 1</label>
                  <TextInput
                    name={"emailAddress"}
                    onChange={this.handleOnChange}
                    value={this.state.emailAddress}
                    type="email"
                  />

                  <label className="">
                    <input
                      type="checkbox"
                      checked={this.state.email1_primary}
                      onChange={() => {
                        this.setState((prevState) => ({
                          email1_primary: !prevState.email1_primary,
                        }));
                      }}
                    />
                    <span>Primary Email?</span>
                  </label>
                </div>
                <div className="col-lg-6">
                  <label>Email 2</label>
                  <TextInput
                    name={"emailAddress2"}
                    onChange={this.handleOnChange}
                    value={this.state.emailAddress2}
                    type="email"
                  />

                  <label className="">
                    <input
                      type="checkbox"
                      checked={this.state.email2_primary}
                      onChange={() => {
                        this.setState((prevState) => ({
                          email2_primary: !prevState.email2_primary,
                        }));
                      }}
                    />
                    <span>Primary Email?</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label>Phone number 1</label>

                  <PhoneNumber
                    name={"phoneNumber"}
                    onChange={this.handleOnChange}
                    value={this.state.phoneNumber}
                  />
                  <label className="">
                    <input
                      type="checkbox"
                      checked={this.state.phone1_whatsapp}
                      onChange={() => {
                        this.setState({
                          phone1_whatsapp:
                            this.state.phone1_whatsapp === 0 ? 1 : 0,
                        });
                      }}
                    />
                    <span>Whatsapp number?</span>
                  </label>
                </div>
                <div className="col-lg-6">
                  <label>Phone number 2</label>

                  <PhoneNumber
                    name="phoneNumber2"
                    onChange={this.handleOnChange}
                    value={this.state.phoneNumber2}
                  />

                  <label className="">
                    <input
                      type="checkbox"
                      checked={this.state.phone2_whatsapp}
                      onChange={() =>
                        this.setState({
                          phone2_whatsapp:
                            this.state.phone2_whatsapp === 0 ? 1 : 0,
                        })
                      }
                    />
                    <span>Whatsapp number?</span>
                  </label>
                  {/* <TextInput
                  name={"phoneNumber2"}
                  onChange={this.handleOnChange}
                  value={this.state.phoneNumber2}
                /> */}
                  {/* <span>format: 2348070706069</span> */}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label>Passport No</label>
                  <TextInput
                    name={"passport"}
                    onChange={this.handleOnChange}
                    value={this.state.passport}
                  />
                </div>
                <div className="col-lg-6">
                  <label>Date of Birth</label>
                  <TextInput
                    name="dob"
                    onChange={this.handleOnChange}
                    value={this.state.dob}
                    type="date"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label>Street 1</label>
                  <TextInput
                    name={"street1"}
                    onChange={this.handleOnChange}
                    value={this.state.street1}
                  />
                </div>
                <div className="col-lg-6">
                  <label>Street 2</label>
                  <TextInput
                    name={"street2"}
                    onChange={this.handleOnChange}
                    value={this.state.street2}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label>City</label>
                  <TextInput
                    name={"city"}
                    onChange={this.handleOnChange}
                    value={this.state.city}
                  />
                </div>
                <div className="col-lg-6">
                  <label>State</label>
                  <TextInput
                    name={"state"}
                    onChange={this.handleOnChange}
                    value={this.state.state}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label>Website</label>
                  <TextInput
                    name={"website"}
                    onChange={this.handleOnChange}
                    value={this.state.website}
                  />
                </div>
                <div className="col-lg-6">
                  <label>Position</label>
                  <TextInput
                    disabled
                    name={"role"}
                    onChange={this.handleOnChange}
                    value={this.state.position}
                  />
                </div>
              </div>
              <div className="my-4 text-center w-100">
                <FormButton type="submit">Update</FormButton>
              </div>
            </form>
          </div>
        </AppWrapper>
      </Dashboard>
    );
  }
}

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomBadge = styled.div`
  background-image: url(${Images.medal});
  background-repeat: no-repeat;
  background-postion: center;
  background-size: contain;
  height: 30px;
  width: 30px;
  margin-right: 0.7rem;
`;

const Position = styled.p`
  font-weight: bold;
  position: relative;
  top: 0.2rem;
  color: #373e9f;
  font-size: 1.2rem;
`;

export default connect(null, actions)(ManageProfile);
