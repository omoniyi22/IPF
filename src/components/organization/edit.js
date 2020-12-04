import React from "react";
import { TextInput } from "../components";
import PhoneNumber from "../General/phoneInput";
import { api, attachApiToken } from "../../services/api";
import { getIndustryCall, getClassificationCall } from "../../services";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";
import AppWrapper from "../appWrapper";
import { isEmailValid } from "../../utils/app";
import { phoneNumberRegx } from "../../utils/regex";

const EditOrganization = ({ data, showLoader, onClose }) => {
  const [state, setState] = React.useState({
    email: "",
    company_name: "",
    phone_number: "",
    company_address: "",
    industryType: "",
    industryClassification: "",
    memberNumber: "",
  });

  const [snack, setSnack] = React.useState({
    msg: "",
    type: "default",
    open: false,
  });

  const [indusClass, setIndusClass] = React.useState({
    indus: [],
    indusClass: [],
  });

  React.useEffect(() => {
    setState({
      ...state,
      ...data,
    });
  }, [data]);

  const initiateIndustry = React.useCallback(() => {
    const getDetails = async () => {
      try {
        const [res, re] = await Promise.all([
          getClassificationCall(),
          getIndustryCall(),
        ]);

        const _a = res.data.data;
        const _b = re.data.data;
        setIndusClass({
          ...indusClass,
          indus: _b,
          indusClass: _a,
        });
      } catch (error) {
        
        // console.log(error);
      }
    };
    getDetails();
  }, [getClassificationCall, getIndustryCall]);

  React.useEffect(() => {
    initiateIndustry();
  }, [initiateIndustry]);

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
    if (!isEmailValid(state.email)) {
      return setSnack({
        ...snack,
        msg: "Invalid email address",
        type: "error",
        open: true,
      });
    }


    if (!phoneNumberRegx.test(state.phone_number)) {
      return setSnack({
        ...snack,
        msg: "Phone number is invalid",
        type: "error",
        open: true,
      });
    }

    if(!state.company_address) {
      return setSnack({
        ...snack,
        msg: "Provide company address",
        type: "error",
        open: true,
      });
    }
    try {
      showLoader(true);
      const authApi = await attachApiToken(api);
      await authApi.patch("/admin/edit-company", {
        ...state,
        company_id: state["company_id"],
      });



      onClose();



      
      setSnack({
        ...snack,
        msg: "Company Updated Successfully",
        type: "success",
        open: true,
      });
      showLoader(false);
    
    } catch (error) {
      showLoader(false);
      onClose();

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

  const handlClose = ()=> {
    onClose()
  }
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
        <h4>{"Edit Company Details"}</h4>
        <div className="container-fluid px-0   mt-3">
          <div className="row">
            <TextInput
              name={"Corporate ID"}
              placeholder="Corporate ID"
              disabled
              value={state.memberNumber}
            />
          </div>

          <>
            <div className="row">
              <TextInput
                    disabled
                name={"company_name"}
                placeholder="Company Name"
                onChange={handleOnChange}
                value={state.company_name}
              />
            </div>
            <div className="row">
              <TextInput
                    disabled
                name={"email"}
                placeholder="Company Email"
                onChange={handleOnChange}
                value={state.email}
              />
            </div>
            <div className="row">
              <PhoneNumber
                disabled
                name={"phone_number"}
                placeholder="Phone Number"
                onChange={handleOnChange}
                value={state.phone_number}
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

            <div className="row input-field">
              <select
                defaultValue={state.industryType}
                name="industryType"
                onChange={handleOnChange}
              >
                {indusClass.indus.map((ele) => (
                  <option key={ele.id} value={ele.industry_name}>
                    {ele.industry_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="row input-field">
              <select
                defaultValue={state.industryClassification}
                name="industryClassification"
                onChange={handleOnChange}
              >
                {indusClass.indusClass.map((ele) => (
                  <option key={ele.id} value={ele.industry_name}>
                    {ele.industry_name}
                  </option>
                ))}
              </select>
            </div>
          </>
        </div>
      </div>

      <div class="modal-footer">
        <a
          onClick={handlClose}
          href="#!"
          class="modal-close  waves-effect waves-green btn-flat"
        >
          Close
        </a>
        <button
          onClick={submit}
          className="waves-effect waves-green btn-primary btn"
        >
          Edit
        </button>
      </div>
    </AppWrapper>
  );
};

export default connect(null, actions)(EditOrganization);
