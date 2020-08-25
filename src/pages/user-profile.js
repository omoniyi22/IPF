import React, { Component } from "react";
import UserDashboard from "../hoc/UserDashboard";
import bg01 from "../assets/bg01.png";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import Axios from "axios";
import { TextInput } from "../components/components";
import EventRole from "../components/event-role";
import { getIndustryCall, getClassificationCall } from "../services";
import PhoneNumber from "../components/General/phoneInput";
import AppWrapper from "../components/appWrapper.js";
class UserProfile extends Component {
  state = {
    role: "",
    state: "",
    street1: "",
    street2: "",
    suspended: 0,
    website: "",
    indusClass: [],
    industry: [],
    industryClassification: "",
    industryType: "",
    phone1_whatsapp: false,
    phone2_whatsapp: false,
    company_designation: "",
    avatar: "",
    msg: "",
    type: "default",
    open: false,
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
      console.log(data);
      this.setState({ ...data });
    } catch (error) {
      console.error(error);
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
      if (this.state.firstName.trim() === "" || this.state.lastName === "") {
        return alert("First name and last name is required");
      }
      const phoneNumberRegx = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
      const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!phoneNumberRegx.test(this.state.phoneNumber)) {
        return this.openSnack("Phone Number is not valid");
      }
      if (!emailRegx.test(this.state.emailAddress)) {
        return this.openSnack("Email Address is not valid", "error");
      }

      if (!this.state.avatar) {
        return this.openSnack("Please provide profile picture", "error");
      }
      this.props.showLoader(true);
      const token = localStorage.getItem("x-access-token");
      await Axios.patch("/api/v1/auth/edit", this.state, {
        headers: { "x-access-token": token },
      });

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
      const [classRes, indusRes] = await Promise.all([
        getClassificationCall(),
        getIndustryCall(),
      ]);
      const industry = indusRes.data.data;
      const indusClass = classRes.data.data;

      this.setState({
        indusClass,
        industry,
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
                  <div className="user-profile-score-card shadow bg-white p-1">
                    <div className="row justify-content-between px-3 border-bottom mb-0">
                      <div className="d-flex">
                        <h5
                          style={{ fontSize: 18 }}
                          className="fw-bold book-family"
                        >
                          Member Id:
                        </h5>
                        <h5
                          style={{ fontSize: 18 }}
                          className="mx-2 fw-bold book-family"
                        >
                          {this.state.memberNumber}
                        </h5>
                      </div>
                      <div className="d-flex flex-grow-1 justify-content-end">
                        <h5
                          style={{ fontSize: 16 }}
                          onClick={this.openModal}
                          className="book-family text-underline"
                        >
                          Edit Profile
                        </h5>
                      </div>
                    </div>
                    <div className="">
                      <div className="w-1oo">
                        <img
                          src={`${
                            this.state.avatar
                              ? this.state.avatar
                              : "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png"
                          }`}
                          className="user-profile-image"
                          alt="bg"
                        />
                      </div>
                    </div>
                    <div className="row mb-0">
                      <h5 className="book-family">
                        Welcome, {this.state.firstName}
                      </h5>
                    </div>

                    <div>
                      <span className="mx-3">
                        <i className="material-icons">stay_current_portrait</i>
                      </span>
                      <span classNam="px-3 book-family">
                        {this.state.phoneNumber}
                      </span>
                    </div>
                    <div className="row">
                      <span className="mx-3">
                        <i className="material-icons">mail</i>
                      </span>
                      <span classNam="px-3 book-family">
                        {this.state.emailAddress}
                      </span>
                    </div>
                    <div className="row justify-content-center">
                      <button className="waves-effect waves-light btn ">
                        Membership status:{" "}
                        {this.state.approved === 1 ? "Approved" : "Pending"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="book-family" style={{ fontSize: 24 }}>
                        Member Type
                      </h3>
                      <div className="shadow bg-white p-2">
                        <div className="row border-bottom">
                          <h5 className="book-family w-100 fw-bold ">
                            Upcoming Events
                          </h5>
                        </div>
                        <div className="row">
                          <EventRole
                            title="Annual Conference 2020"
                            details="June 15th, 2020"
                            onClick={this.viewEvent}
                          />
                          <EventRole
                            title="Annual Conference 2020"
                            details="June 15th, 2020"
                            onClick={this.viewEvent}
                          />
                          <EventRole
                            title="Annual Conference 2020"
                            details="June 15th, 2020"
                            onClick={this.viewEvent}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mt-3">
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="shadow bg-white p-2">
                    <div className="row border-bottom">
                      <h5 className="book-family w-100 fw-bold ">
                        Upcoming Events
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="shadow bg-white p-2">
                    <div className="row border-bottom">
                      <h5 className="book-family w-100 fw-bold ">
                        Upcoming Events
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
              <h4>{"Update Profile"}</h4>
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
                    <span onClick={this.uploadWidget} className="camera-button">
                      <i className="material-icons">camera_enhance</i>
                    </span>
                  </div>
                </div>

                <div className="row">
                  <TextInput
                    name={"firstName"}
                    placeholder="First Name"
                    onChange={this.handleOnChange}
                    value={this.state.firstName}
                  />
                </div>
                <div className="row">
                  <TextInput
                    name={"lastName"}
                    placeholder="Last Name"
                    onChange={this.handleOnChange}
                    value={this.state.lastName}
                  />
                </div>
                <div className="row">
                  <TextInput
                    name={"emailAddress"}
                    placeholder="Email Addresss"
                    onChange={this.handleOnChange}
                    value={this.state.emailAddress}
                  />
                </div>
                <div className="row">
                  <PhoneNumber
                    name={"phoneNumber"}
                    placeholder="Phone Number"
                    onChange={this.handleOnChange}
                    value={this.state.phoneNumber}
                  />
                  <label className="mx-3">
                    <input
                      type="checkbox"
                      checked={this.state.phone1_whatsapp}
                      onChange={() => {
                        this.setState((prevState) => ({
                          phone1_whatsapp: !prevState.phone1_whatsapp,
                        }));
                      }}
                    />
                    <span>Whatsapp number</span>
                  </label>
                </div>
                <div className="row">
                  <PhoneNumber
                    name={"phoneNumber2"}
                    placeholder="Phone Number"
                    onChange={this.handleOnChange}
                    value={this.state.phoneNumber2}
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
                      value={this.state.phone2_whatsapp}
                    />
                    <span>Whatsapp number</span>
                  </label>
                </div>
                <div className="row">
                  <TextInput
                    name={"company_name"}
                    placeholder="Company Name"
                    onChange={this.handleOnChange}
                    value={this.state.company_name}
                  />
                </div>
                <div className="row">
                  <TextInput
                    name={"company_address"}
                    placeholder="Company Addresss"
                    onChange={this.handleOnChange}
                    value={this.state.company_address}
                  />
                </div>

                <div className="row">
                  <TextInput
                    name={"company_designation"}
                    placeholder="Company Designation"
                    onChange={this.handleOnChange}
                    value={this.state.company_designation}
                  />
                </div>

                <div className="row">
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

                <div className="row">
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
