import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import bg01 from "../assets/bg01.png";
import images from "../assets/images";
import AppWrapper from "../components/appWrapper.js";
import { TextInput } from "../components/components";
import PhoneNumber from "../components/General/phoneInput";
import UserDashboard from "../hoc/UserDashboard";
import * as actions from "../redux/actions";
import {
  getClassificationCall,
  getIndustryCall,
  getQualificationCall,
} from "../services";
import { editProfileCall } from "../services/members";
import { emailRegx, phoneNumberRegx } from "../utils/regex";

class UserProfile extends Component {
  state = {
    phone1_whatsapp: 0,
    phone2_whatsapp: 0,
    email1_primary: false,
    email2_primary: false,
    city: "",
    dob: "",
    msg: "",
    passport: "",
    phoneNumber: "",
    phoneNumber2: "",
    emailAddress: "",
    emailAddress2: "",
    firstName: "",
    lastName: "",
    avatar:
      "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png",
    indusClass: [],
    industry: [],
    quals: [],
    qualifications: "",
    company_designation: "",
    type: "default",
    street1: "",
    street2: "",
    open: false,
    industryType: "",
    companyDetails: "",
    position: "Member",
    openSnackbar: true,
    industryClassification: "",
  };
  componentDidMount() {
    this.getUserDetails();
    this.getIndustyClassification();
    window.$(".modal").modal();
  }
  openModal = () => {
    window.$("#modal1").modal("open");
  };
  openCompanyModay = () => {
    window.$("#modal2").modal("open");
  };
  getUserDetails = async () => {
    try {
      this.props.showLoader(true);
      const token = localStorage.getItem("x-access-token");
      const response = await Axios.get("/api/v1/auth/details", {
        headers: { "x-access-token": token },
      });
      this.props.showLoader();
      const data = response.data.data;
      this.setState({ ...data });
    } catch (error) {
      this.props.showLoader();
    }
  };
  handleOnChange = (e, phone = false) => {
    if (phone) {
      const { name, value } = e;
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
        companyDetails,
        position,
      } = this.state;
      if (!phoneNumberRegx.test(phoneNumber)) {
        return this.openSnack("Phone Number is not valid", "error");
      }

      if (phoneNumber2 && !phoneNumberRegx.test(phoneNumber)) {
        return this.openSnack("Phone Number 2 is not valid", "error");
      }

      if (!emailRegx.test(emailAddress)) {
        return this.openSnack("Email Address is not valid", "error");
      }

      if (phoneNumber.length < 14) {
        return this.openSnack("Phone Number is not valid", "error");
      }

      if (phoneNumber2 && phoneNumber2.length < 14) {
        return this.openSnack("Phone Number(2) is not valid", "error");
      }

      if (!avatar) {
        return this.openSnack("Please add your profile picture", "error");
      }

      if (!passport) {
        return this.openSnack("Please add your passport number ", "error");
      }

      if (this.state.passport.length !== 8) {
        return this.openSnack("Passport number  is invalid", "error");
      }

      if (!this.state.dob) {
        return this.openSnack("Please add your date of birth", "error");
      }

      if (!this.state.street1) {
        return this.openSnack("Please add your street address", "error");
      }

      if (!this.state.company_designation) {
        return this.openSnack("Please add your company designation", "error");
      }

      if (!this.state.state) {
        return this.openSnack(
          "Please add the state you are residing in",
          "error"
        );
      }
      if (!this.state.industryType) {
        return this.openSnack("Please add your industry type", "error");
      }

      if (!this.state.state) {
        return this.openSnack(
          "Please add the state you are residing in",
          "error"
        );
      }

      if (!this.state.industryClassification) {
        return this.openSnack(
          "Please add your industry classification",
          "error"
        );
      }

      const data = {
        ...this.state,
        email1_primary: email1_primary ? true : false,
        email2_primary: email2_primary ? true : false,
      };

      this.props.showLoader(true);
      await editProfileCall(data);
      this.props.showLoader();
      this.openSnack("Update Successful", "success");
    } catch (error) {
      let _error = "Some errors were encountered";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        _error = error.response.data.message;
      }

      this.props.showLoader();
      this.openSnack(_error, "error");
    }
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
  uploadWidget2 = () => {
    const $this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: "dnevwxinm", upload_preset: "onfjtj7b", tags: ["xmas"] },
      function (error, result) {
        if (error) {
          return console.log(error);
        }
        $this.setState({
          companyLogo: result[0].url,
        });
      }
    );
  };
  viewEvent = () => {};
  updateCompany = async (e) => {
    try {
      if (this.state.companyDetails.trim() === "") {
        return this.openSnack("Please provide company details", "error");
      }

      const data = {
        ...this.state,
        phone1_whatsapp: this.state.phone1_whatsapp ? 1 : 0,
        phone2_whatsapp: this.state.phone2_whatsapp ? 1 : 0,
      };
      this.props.showLoader(true);
      const token = localStorage.getItem("x-access-token");
      const response = await Axios.patch("/api/v1/auth/edit", data, {
        headers: { "x-access-token": token },
      });
      this.props.showLoader();
      this.openSnack("Update Successful", "success");
    } catch (error) {
      this.props.showLoader();
      this.openSnack("Some errors were encountered", "error");
    }
  };

  openSnack = (msg, type = "default") => {
    this.setState({
      msg,
      open: true,
      type,
    });
  };

  getIndustyClassification = async () => {
    try {
      const [classRes, indusRes, qual] = await Promise.all([
        getClassificationCall(),
        getIndustryCall(),
        getQualificationCall(),
      ]);
      const industry = indusRes.data.data;
      const indusClass = classRes.data.data;
      const quals = qual.data.data;

      this.setState({
        indusClass,
        industry,
        quals,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      industryClassification,
      industryType,
      msg,
      type,
      open,
      firstName,
      lastName,
      email1_primary,
      email2_primary,
      emailAddress,
      emailAddress2,
      phoneNumber,
      phone1_whatsapp,
      passport,
      phone2_whatsapp,
      phoneNumber2,
      street1,
      street2,
      city,
      avatar,
      company_designation,
      dob,
      position,
      openSnackbar,
    } = this.state;

    return (
      <UserDashboard>
        <AppWrapper
          message={msg}
          type={type}
          open={open}
          onClose={() => {
            this.setState({
              open: false,
            });
          }}
        >
          <div className="">
            <div style={{ height: 250 }}>
              <img src={bg01} className="img-fluid h-100" alt="background" />
            </div>
            <div className="container-fluid user-profile-container">
              <div className="row">
                <div className="col-md-6" style={{ position: "relative" }}>
                  <div className="user-profile-score-card shadow bg-white ">
                    <div className="row justify-content-between border-bottom">
                      <div className="d-flex">
                        <h5 style={{ fontSize: 18 }} className="fw-bold">
                          Member ID:
                        </h5>
                        <h5 style={{ fontSize: 18 }} className="mx-2 fw-bold">
                          {this.state.memberNumber}
                        </h5>
                      </div>
                      {/* <div className="d-flex flex-grow-1 justify-content-end">
                        <h5
                          style={{ fontSize: 16 }}
                          onClick={this.openModal}
                          className="text-underline"
                        >
                          Edit Profile
                        </h5>
                      </div> */}
                    </div>
                    <div className="user-image-container">
                      <img
                        src={
                          this.state.avatar ||
                          "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png"
                        }
                        alt="img"
                        className="user-profile-image"
                      />
                    </div>
                    <div className="card-content-container">
                      <div className="row mb-0 mx-3 ">
                        <h5>Welcome, {firstName}</h5>
                      </div>
                      <div>
                        <span className="mx-3">
                          <i className="material-icons">
                            stay_current_portrait
                          </i>
                        </span>
                        <span classNam="px-3">{phoneNumber}</span>
                      </div>
                      <div className="row">
                        <span className="mx-3">
                          <i className="material-icons">mail</i>
                        </span>
                        <span classNam="px-3">{emailAddress}</span>
                      </div>
                      <div className="row justify-content-center">
                        <button className="waves-effect waves-light btn ">
                          Membership status:{" "}
                          {this.state.approved === 1 ? "Approved" : "Pending"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="" style={{ fontSize: 24 }}>
                        {/* Member Type */}
                      </h3>
                      <div className="shadow bg-white p-2">
                        <div className="row border-bottom">
                          <h5 className="w-100 fw-bold ">Upcoming Events</h5>
                        </div>
                        <div className="">
                          <Container>
                            <div className="no-notification">
                              <img
                                src={images.calenderBg}
                                alt="bg"
                                style={{ height: "100%", width: "100%" }}
                              />
                            </div>
                            <div>
                              <P>No Upcoming Events</P>
                            </div>
                          </Container>

                          {/* <EventRole
                            title="Annual Conference 2020"
                            details="June 15th, 2020"
                            onClick={this.viewEvent}
                          /> */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-12 mt-3">
                      <div className="shadow bg-blue p-1">
                        <div className="row">
                          <div className="col-md-8">
                            <p>
                              <h5
                                className="book-family fw-bold text-white"
                                style={{ fontSize: 18 }}
                              >
                                {" "}
                                2020 Innovation Conference
                              </h5>
                            </p>
                            <p>
                              <h5
                                className="book-family text-white"
                                style={{ fontSize: 16 }}
                              >
                                Interesting seakers, delicious food, do not miss
                                the event!
                              </h5>
                            </p>
                          </div>
                          <div className="col-md-4">
                            <div className="row h-100 align-items-center">
                              <span className="cs-bottom fw-bold">Sign Up</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <div className="col-md-4">
                  <div className="shadow bg-white p-2">
                    <div className="row border-bottom">
                      <h5 className="book-family w-100 fw-bold ">
                        Upcoming Events
                      </h5>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-md-8">
                  <div className="shadow bg-white p-2">
                    <div className="row border-bottom">
                      <h5 className="book-family w-100 fw-bold ">
                        Upcoming Events
                      </h5>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
              <h4>{"Update Profile"}</h4>
              <div className="container-fluid mt-3">
                <div className="row justify-content-center">
                  <div className="circle-avatar text-center d-flex align-items-center justify-content-center">
                    {avatar ? (
                      <img className="img-avatar" src={avatar} alt="profile" />
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

                <div className="row">
                  <div className="col-lg-6">
                    <label>First Name</label>
                    <TextInput
                      name={"firstName"}
                      placeholder="First Name"
                      onChange={this.handleOnChange}
                      value={firstName}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>Last Name</label>
                    <TextInput
                      name={"lastName"}
                      placeholder="Last Name"
                      onChange={this.handleOnChange}
                      value={lastName}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <label>Email Address</label>
                    <TextInput
                      name={"emailAddress"}
                      placeholder="Email Addresss"
                      onChange={this.handleOnChange}
                      value={emailAddress}
                    />
                    <label className="mx-3">
                      <input
                        type="checkbox"
                        checked={email1_primary}
                        onChange={() => {
                          this.setState((prevState) => ({
                            email1_primary: !prevState.email1_primary,
                          }));
                        }}
                      />
                      <span className="checkbox-span">
                        Email Address(1) primary
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-6">
                    <label>Email Address2</label>
                    <TextInput
                      name={"emailAddress2"}
                      placeholder="Email Addresss(2)"
                      onChange={this.handleOnChange}
                      value={emailAddress2}
                    />

                    <label className="mx-3">
                      <input
                        type="checkbox"
                        checked={email2_primary}
                        onChange={() => {
                          this.setState((prevState) => ({
                            email2_primary: !prevState.email2_primary,
                          }));
                        }}
                      />
                      <span className="checkbox-span">
                        Email Address(2) primary
                      </span>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <label>Phone number 1</label>
                    <PhoneNumber
                      name={"phoneNumber"}
                      placeholder="Phone Number"
                      onChange={this.handleOnChange}
                      value={phoneNumber}
                    />
                    <label className="mx-3">
                      <input
                        type="checkbox"
                        checked={phone1_whatsapp}
                        onChange={() => {
                          this.setState((prevState) => ({
                            phone1_whatsapp: !prevState.phone1_whatsapp,
                          }));
                        }}
                      />
                      <span className="checkbox-span">Whatsapp number</span>
                    </label>
                  </div>

                  <div className="col-lg-6">
                    <label>Phone number 2</label>
                    <PhoneNumber
                      name={"phoneNumber2"}
                      placeholder="Phone Number"
                      onChange={this.handleOnChange}
                      value={phoneNumber2}
                    />
                    <label className="mx-3">
                      <input
                        type="checkbox"
                        checked={this.state.phone2_whatsapp}
                        onChange={() => {
                          this.setState((prevState) => ({
                            phone2_whatsapp: !prevState.phone2_whatsapp,
                          }));
                        }}
                        value={phone2_whatsapp}
                      />
                      <span className="checkbox-span">Whatsapp number</span>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <label>Company Designation</label>
                    <TextInput
                      name={"company_designation"}
                      placeholder="Company Designation"
                      onChange={this.handleOnChange}
                      value={company_designation}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>Passport No</label>
                    <TextInput
                      name={"passport"}
                      onChange={this.handleOnChange}
                      value={passport}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <label>Date of Birth</label>
                    <input
                      name="dob"
                      defaultValue={dob}
                      onChange={this.handleOnChange}
                      value={dob}
                      // placeholder="dd/mm/yyyy"
                      type="date"
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>Street 1</label>
                    <TextInput
                      name={"street1"}
                      onChange={this.handleOnChange}
                      value={street1}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <label>Street 2</label>
                    <TextInput
                      name={"street2"}
                      onChange={this.handleOnChange}
                      value={street2}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label>City</label>
                    <TextInput
                      name={"city"}
                      onChange={this.handleOnChange}
                      value={city}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <label>State</label>
                    <TextInput
                      name={"state"}
                      onChange={this.handleOnChange}
                      value={this.state.state}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label>Website</label>
                    <TextInput
                      name={"website"}
                      onChange={this.handleOnChange}
                      value={this.state.website}
                    />
                  </div>
                </div>

                {["AM", "LM", "LP"].includes(this.state.membershipType) && (
                  <div className="row">
                    <div className="col-lg-6">
                      <label>Company Name</label>
                      <TextInput
                        name={"company_name"}
                        placeholder="Company Name"
                        onChange={this.handleOnChange}
                        value={this.state.company_name}
                      />
                    </div>

                    <div className="col-lg-6">
                      <label>Company Address</label>
                      <TextInput
                        name={"company_address"}
                        placeholder="Company Addresss"
                        onChange={this.handleOnChange}
                        value={this.state.company_address}
                      />
                    </div>
                  </div>
                )}

                {["AM", "LM", "LP"].includes(this.state.membershipType) && (
                  <div className="row">
                    <div className="col-lg-6">
                      <label>Industry Type</label>
                      <select
                        name="industryType"
                        defaultValue={this.state.industryType}
                        onChange={this.handleOnChange}
                      >
                        {industryType ? (
                          <option>{industryType}</option>
                        ) : (
                          <option>Select Industry Type</option>
                        )}
                        {this.state.industry.map((ele) => (
                          <option key={ele.id} value={ele.industry_name}>
                            {ele.industry_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-lg-6">
                      <label>Industry Classifcation</label>

                      <select
                        name="industryClassification"
                        defaultValue={this.state.industryClassification}
                        onChange={this.handleOnChange}
                      >
                        {industryClassification ? (
                          <option>{industryClassification}</option>
                        ) : (
                          <option>Select Industry Classification</option>
                        )}

                        {this.state.indusClass.map((ele) => (
                          <option key={ele.id} value={ele.industry_name}>
                            {ele.industry_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="col-lg-6">
                    <label>Position</label>
                    <TextInput name={"position"} value={position} disabled />
                  </div>

                  <div className="col-lg-6">
                    <label>Qualification</label>
                    <select
                      name="qualifications"
                      defaultValue={this.state.qualifications}
                      onChange={this.handleOnChange}
                    >
                      <option>select</option>
                      {this.state.quals.map((ele) => (
                        <option key={ele.id} value={ele.name}>
                          {ele.detail}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <a
                href="#!"
                class="modal-close  waves-effect waves-green btn-flat"
              >
                Close
              </a>
              <button
                onClick={this.submit}
                className="waves-effect waves-green btn-primary btn"
              >
                Update
              </button>
            </div>
          </div>
          <div id="modal2" class="modal modal-fixed-footer">
            <div class="modal-content">
              <h4>{"Update Company"}</h4>
              <div className="container-fluid mt-3">
                <div className="row justify-content-center">
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
                    <span
                      onClick={this.uploadWidget2}
                      className="camera-button"
                    >
                      <i className="material-icons">camera_enhance</i>
                    </span>
                  </div>
                </div>

                <div className="row">
                  <TextInput
                    disabled
                    name={"nameOfCompany"}
                    placeholder="Company Name"
                    onChange={this.handleOnChange}
                    value={this.state.nameOfCompany}
                  />
                </div>
                <div className="row">
                  <TextInput
                    name={"companyDetails"}
                    placeholder="Company Details"
                    onChange={this.handleOnChange}
                    value={this.state.companyDetails}
                  />
                </div>
                <div className="row">
                  <TextInput
                    name={"website"}
                    placeholder="Company Website"
                    onChange={this.handleOnChange}
                    value={this.state.website}
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <a
                href="#!"
                class="modal-close  waves-effect waves-green btn-flat"
              >
                Close
              </a>
              <button
                onClick={this.updateCompany}
                className="waves-effect waves-green btn-primary btn"
              >
                Update
              </button>
            </div>
          </div>
        </AppWrapper>
      </UserDashboard>
    );
  }
}

export default connect(null, actions)(UserProfile);

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 30%;
`;
const P = styled.p`
  color: #5f7d95;
  margin-top: 20px;
  font-weight: 600;
  font-size: 20px;
`;
