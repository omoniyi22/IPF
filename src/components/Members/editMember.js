import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { api, attachApiToken } from "../../services/api";
import { isEmailValid } from "../../utils/app";
import { emailRegx, phoneNumberRegx } from "../../utils/regex";
import AppWrapper from "../appWrapper";
import { TextInput } from "../components";
import PhoneNumber from "../General/phoneInput";

const EditMember = ({ data, showLoader, getAll }) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    city: "",
    companyDetails: "",
    dob: "",
    phoneNumber2: "",
    emailAddress2: "",
    street1: "",
    street2: "",
    company_name: "",
    company_address: "",
    passport: "",
    qualifications: "",
    membershipType: "",
  });
  const [quals, setQual] = React.useState([]);
  useEffect(() => {
    setState({
      ...state,
      ...data,
    });
  }, [data]);

  const [snack, setSnack] = useState({
    msg: "",
    type: "default",
    open: false,
  });

  const initiateQualification = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/admin/qualifications");
        setQual(response.data.data);
      } catch (error) {}
    };
    getUser();
  }, [setQual]);

  useEffect(() => {
    setState({
      ...state,
      ...data,
    });
    initiateQualification();
  }, [data, initiateQualification]);
  const handleOnChange = (e, phone = false) => {
    if (!phone) {
      const {
        target: { value, name },
      } = e;
      setState({
        ...state,
        [name]: value,
      });

      return;
    }

    const { value, name } = e;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submit = async () => {
    if (!isEmailValid(state.emailAddress)) {
      return setSnack({
        ...snack,
        msg: "Invalid email address",
        type: "error",
        open: true,
      });
    }

    if (state.emailAddress2 && !emailRegx.test(state.emailAddress2)) {
      return setSnack({
        ...snack,
        msg: " Email address(2) is invalid",
        type: "error",
        open: true,
      });
    }

    if (!phoneNumberRegx.test(state.phoneNumber) || state.phoneNumber.trim().length < 14) {
      return setSnack({
        ...snack,
        msg: "Phone number(1) is invalid",
        type: "error",
        open: true,
      });
    }

    if (state.phoneNumber2 && !phoneNumberRegx.test(state.phoneNumber2)) {
      return setSnack({
        ...snack,
        msg: "Phone number(2) is invalid",
        type: "error",
        open: true,
      });
    }

    if (state.phoneNumber2 && state.phoneNumber2.trim().length < 14) {
      return setSnack({
        ...snack,
        msg: "Phone number(2) is invalid",
        type: "error",
        open: true,
      });
    }

    

    try {
      showLoader(true);
      const authApi = await attachApiToken(api);
      await authApi.patch("/admin/member/edit", {
        userData: {
          firstName: state.firstName,
          lastName: state.lastName,
          phoneNumber: state.phoneNumber,
          emailAddress: state.emailAddress,
          address: state.address,
          city: state.city,
          companyDetails: state.companyDetails,
          dob: state.dob,
          phoneNumber2: state.phoneNumber2,
          emailAddress2: state.emailAddress2,
          street1: state.street1,
          street2: state.street2,
          company_name: state.company_name,
          company_address: state.company_address,
          passport: state.passport,
          qualifications: state.qualifications,
        },
        user_id: data["member_id"],
      });

      setSnack({
        ...snack,
        msg: "User details updated Successfully",
        type: "success",
        open: true,
      });
      showLoader(false);
      if (getAll) {
        getAll();
      }
    } catch (error) {
      showLoader(false);

      let _error = "Unsuccessful, Try again";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        _error = error.response.data.message;
      }
      setSnack({
        ...snack,
        msg: _error,
        type: "error",
        open: true,
      });
    }
  };
  return (
    <AppWrapper
      message={snack.msg}
      open={snack.open}
      type={snack.type}
      onClose={() => {
        setSnack({
          open: false,
        });
      }}
    >
      <div class="modal-content">
        <h4>{"Edit User Details"}</h4>
        <div className="container-fluid px-0   mt-3">
          <>
            <div className="row">
              <label>First Name</label>
              <TextInput
                name={"firstName"}
                placeholder="First Name"
                onChange={handleOnChange}
                value={state.firstName}
              />
            </div>
            <div className="row">
              <label>Last Name</label>
              <TextInput
                name={"lastName"}
                placeholder="Last Name"
                onChange={handleOnChange}
                value={state.lastName}
              />
            </div>
            <div className="row">
              <label>Phone Number(1)</label>
              <PhoneNumber
                name={"phoneNumber"}
                placeholder="Phone Number"
                onChange={handleOnChange}
                value={state.phoneNumber}
              />
            </div>

            <div className="row">
              <label>Phone Number(2)</label>
              <PhoneNumber
                name={"phoneNumber2"}
                placeholder="Phone Number(2)"
                onChange={handleOnChange}
                value={state.phoneNumber2}
              />
            </div>

            <div className="row">
              <label>Email address(1)</label>
              <TextInput
                name={"emailAddress"}
                placeholder="Email address"
                onChange={handleOnChange}
                value={state.emailAddress}
              />
            </div>

            <div className="row">
              <label>Email address(2)</label>
              <TextInput
                name={"emailAddress2"}
                placeholder="Email address(2)"
                onChange={handleOnChange}
                value={state.emailAddress2}
              />
            </div>

            <div className="row">
              <label>Passport</label>
              <TextInput
                name={"passport"}
                placeholder="Passport"
                onChange={handleOnChange}
                value={state.passport}
              />
            </div>

            {["LP", "LM", "AM"].includes(state.membershipType) && (
              <div className="row">
                <label>Company Name</label>
                <TextInput
                  name={"company_name"}
                  placeholder="Company name"
                  onChange={handleOnChange}
                  value={state.company_name}
                />
              </div>
            )}

            {["LP", "LM", "AM"].includes(state.membershipType) && (
              <div className="row">
                <label>Company Address</label>
                <TextInput
                  name={"company_address"}
                  placeholder="Company address"
                  onChange={handleOnChange}
                  value={state.company_address}
                />
              </div>
            )}

            <div className="row">
              <label>Street(1)</label>
              <TextInput
                name={"street1"}
                placeholder="Street 1"
                onChange={handleOnChange}
                value={state.street1}
              />
            </div>
            <div className="row">
              <label>Street(2)</label>
              <TextInput
                name={"street2"}
                placeholder="Street 2"
                onChange={handleOnChange}
                value={state.street2}
              />
            </div>

            <div className="row">
              <label>Qualification</label>
              <select
                name="qualifications"
                defaultValue={state.qualifications}
                onChange={handleOnChange}
              >
                <option>select</option>
                {quals.map((ele) => (
                  <option key={ele.id} value={ele.name}>
                    {ele.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        </div>
      </div>

      <div class="modal-footer">
        <a href="#!" class="modal-close  waves-effect waves-green btn-flat">
          Close
        </a>
        <button
          onClick={submit}
          className="waves-effect waves-green btn-primary btn"
        >
          Update
        </button>
      </div>
    </AppWrapper>
  );
};

export default connect(null, actions)(EditMember);
