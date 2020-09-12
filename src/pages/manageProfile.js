import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Images from "../assets/images";
import AppWrapper from "../components/appWrapper";
import { FormButton, TextInput } from "../components/components";
import PhoneNumber from "../components/General/phoneInput";
import Dashboard from "../hoc/UserDashboard";
import * as actions from "../redux/actions";
import { api, attachApiToken } from "../services/api";
import {
  getClassificationCall,
  getQualificationCall,
  getIndustryCall,
  getMyDetails,
} from "../services/requests";
import { emailRegx, phoneNumberRegx } from "../utils/regex";

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
    firstName: "",
    lastName: "",
    avatar: "",
    company_designation: "",
    quals: [],
    qualifications: "",
    position: "",
    industryType: "",
    industryClassification: "",
  };
  componentDidMount() {
    this.getIndustyClassification();
  }

  submit = async (e) => {
    e.preventDefault();
    try {
      const userType = ["AM", "LM", "LP"];
      const {
        phoneNumber,
        phoneNumber2,
        email1_primary,
        email2_primary,
        emailAddress,
        emailAddress2,
        avatar,
        passport,
        qualifications,
        dob,
        street1,
        company_designation,
        company_address,
        company_name,
        state,
        industryType,
        industryClassification,
      } = this.state;
      if (!phoneNumberRegx.test(phoneNumber)) {
        return this.handleFireSnackbar("Phone Number is not valid", "error");
      }
      if (!emailRegx.test(emailAddress)) {
        return this.handleFireSnackbar("Email Address is not valid", "error");
      }

      if (phoneNumber.length < 13) {
        return this.handleFireSnackbar("Phone Number is not valid", "error");
      }

      if (
        phoneNumber2 &&
        !phoneNumberRegx.test(phoneNumber2) &&
        !phoneNumber2.length < 13
      ) {
        return this.handleFireSnackbar("Phone Number 2 is not valid", "error");
      }

      if (!avatar) {
        return this.handleFireSnackbar(
          "Please add your profile picture",
          "error"
        );
      }

      if (!qualifications) {
        return this.handleFireSnackbar(
          "Please add your qualification ",
          "error"
        );
      }

      if (!dob) {
        return this.handleFireSnackbar(
          "Please add your date of birth",
          "error"
        );
      }

      if (!street1) {
        return this.handleFireSnackbar(
          "Please add your street address",
          "error"
        );
      }

      if (!company_designation) {
        return this.handleFireSnackbar(
          "Please add your company designation",
          "error"
        );
      }

      if (!state) {
        return this.handleFireSnackbar(
          "Please add the state you are residing in",
          "error"
        );
      }

      if (passport && passport.trim().length !== 8) {
        return this.handleFireSnackbar("Passport is incorrect", "error");
      }

      if (userType.includes(this.state.membershipType) && !company_name) {
        return this.handleFireSnackbar(
          "Please provide the name of your company",
          "error"
        );
      }

      if (userType.includes(this.state.membershipType) && !company_address) {
        return this.handleFireSnackbar(
          "Please provide the address of your company",
          "error"
        );
      }

      if (userType.includes(this.state.membershipType) && !industryType) {
        return this.handleFireSnackbar("Please provide industry type", "error");
      }

      if (
        userType.includes(this.state.membershipType) &&
        !industryClassification
      ) {
        return this.handleFireSnackbar(
          "Please provide industry classification",
          "error"
        );
      }

      //   if (!this.state.industryType) {
      //     return this.openSnack("Please add your industry type", "error");
      //   }

      //   if (!this.state.industryClassification) {
      //     return this.openSnack(
      //       "Please add your industry classification",
      //       "error"
      //     );
      //   }

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
      console.log(error);
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

  getIndustyClassification = async () => {
    try {
      const [user, classRes, indusRes, qual] = await Promise.all([
        getMyDetails(),
        getClassificationCall(),
        getIndustryCall(),
        getQualificationCall(),
      ]);
      const data = user.data.data;
      const industry = indusRes.data.data;
      const indusClass = classRes.data.data;
      const quals = qual.data.data;

      this.setState({
        ...data,
        indusClass,
        industry,
        quals,
      });
    } catch (error) {}
  };

  onClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };
  render() {
    const {
      msg,
      type,
      openSnackbar,
      industryClassification,
      industryType,
    } = this.state;
    return (
      <Dashboard>
        <AppWrapper
          open={openSnackbar}
          message={msg}
          type={type}
          onClose={this.onClose}
        >
          <div className="container-fluid py-3">
            <div
              className="row justify-content-center"
              style={{ marginTop: 100 }}
            >
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
                    disabled
                  />
                </div>
                <div className="col-lg-6">
                  <label>Last Name</label>
                  <TextInput
                    name={"lastName"}
                    disabled
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
                    disabled
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
                  <label>Qualification</label>
                  <select
                    className="custom-select-input"
                    name="qualifications"
                    defaultValue={this.state.qualifications}
                    onChange={this.handleOnChange}
                    value={this.state.qualifications}
                  >
                    <option>select</option>
                    {this.state.quals.map((ele) => (
                      <option key={ele.id} value={ele.name}>
                        {ele.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6">
                  <label>Passport No</label>
                  <TextInput
                    name={"passport"}
                    onChange={this.handleOnChange}
                    value={this.state.passport}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <label>Date of Birth</label>
                  <TextInput
                    name="dob"
                    defaultValue={this.state.dob}
                    onChange={this.handleOnChange}
                    value={this.state.dob}
                    type="date"
                  />
                </div>
                <div className="col-lg-6">
                  <label>Street 1</label>
                  <TextInput
                    name={"street1"}
                    onChange={this.handleOnChange}
                    value={this.state.street1}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <label>Street 2</label>
                  <TextInput
                    name={"street2"}
                    onChange={this.handleOnChange}
                    value={this.state.street2}
                  />
                </div>

                <div className="col-lg-6">
                  <label>City</label>
                  <TextInput
                    name={"city"}
                    onChange={this.handleOnChange}
                    value={this.state.city}
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
                  <label>IPF Position</label>
                  <TextInput
                    disabled
                    name={"position"}
                    onChange={this.handleOnChange}
                    value={this.state.position || "Member"}
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
                      className="custom-select-input"
                      name="industryType"
                      defaultValue={this.state.industryType}
                      onChange={this.handleOnChange}
                    >
                      <option>Select Industry Type</option>
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
                      className="custom-select-input"
                      name="industryClassification"
                      defaultValue={this.state.industryClassification}
                      onChange={this.handleOnChange}
                    >
                      <option>Select Industry Classification</option>
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
                  <label>Company Designation</label>
                  <TextInput
                    name={"company_designation"}
                    onChange={this.handleOnChange}
                    value={this.state.company_designation}
                  />
                </div>

                <div className="col-lg-6">
                  <label>Company Website</label>
                  <TextInput
                    name={"website"}
                    onChange={this.handleOnChange}
                    value={this.state.website}
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
