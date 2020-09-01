import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { api, attachApiToken } from "../../services/api";
import { getMembers } from "../../services/members";
import { isEmailValid } from "../../utils/app";
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
  });

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
          passport: "",
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
        <div className="container-fluid mt-3">
          <>
            <div className="row">
              <TextInput
                name={"firstName"}
                placeholder="First Name"
                onChange={handleOnChange}
                value={state.firstName}
              />
            </div>
            <div className="row">
              <TextInput
                name={"lastName"}
                placeholder="Last Name"
                onChange={handleOnChange}
                value={state.lastName}
              />
            </div>
            <div className="row">
              <PhoneNumber
                name={"phoneNumber"}
                placeholder="Phone Number"
                onChange={handleOnChange}
                value={state.phoneNumber}
              />
            </div>

            <div className="row">
              <PhoneNumber
                name={"phoneNumber2"}
                placeholder="Phone Number(2)"
                onChange={handleOnChange}
                value={state.phoneNumber2}
              />
            </div>

            <div className="row">
              <TextInput
                name={"emailAddress"}
                placeholder="Email address"
                onChange={handleOnChange}
                value={state.emailAddress}
              />
            </div>

            <div className="row">
              <TextInput
                name={"emailAddress2"}
                placeholder="Email address"
                onChange={handleOnChange}
                value={state.emailAddress2}
              />
            </div>

            <div className="row">
              <TextInput
                name={"passport"}
                placeholder="Passport"
                onChange={handleOnChange}
                value={state.passport}
              />
            </div>

            <div className="row">
              <TextInput
                name={"company_name"}
                placeholder="Company name"
                onChange={handleOnChange}
                value={state.company_name}
              />
            </div>

            <div className="row">
              <TextInput
                name={"company_address"}
                placeholder="Company address"
                onChange={handleOnChange}
                value={state.company_address}
              />
            </div>
            <div className="row">
              <TextInput
                name={"street1"}
                placeholder="Street 1"
                onChange={handleOnChange}
                value={state.street1}
              />
            </div>
            <div className="row">
              <TextInput
                name={"street2"}
                placeholder="Street 3"
                onChange={handleOnChange}
                value={state.street2}
              />
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
