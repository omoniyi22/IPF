import React, { useState } from "react";
import { connect } from "react-redux";
import AppWrapper from "../components/appWrapper";
import { FormButton, TextInput } from "../components/components";
import Dashboard from "../hoc/Dashboard";
import * as actions from "../redux/actions";
import { api, attachApiToken } from "../services/api";

const ChangePassword = ({ showLoader }) => {
  const [state, setState] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    msg: "",
    type: "default",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!state.current_password) {
        return onOpen("Please provide your current password", "error");
      }

      if (!state.new_password) {
        return onOpen("Please provide your new password", "error");
      }
      if (!state.confirm_password) {
        return onOpen("Please confirm your new password", "error");
      }
      if (state.confirm_password !== state.new_password) {
        return onOpen("Password mismatch", "error");
      }
      showLoader(true);
      const authApi = await attachApiToken(api);
      await authApi.put("/auth/password", state);
      showLoader();
      onOpen("Password update Successful", "success");
    } catch (error) {
      let _error = "Some errors were encountered";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        _error = error.response.data.message;
      }
      onOpen(_error, "error");
      showLoader();
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const onClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const onOpen = (msg, type = "default") => {
    setSnackbar({
      ...snackbar,
      open: true,
      msg,
      type,
    });
  };

  return (
    <Dashboard>
      <AppWrapper
        open={snackbar.open}
        message={snackbar.msg}
        type={snackbar.type}
        onClose={onClose}
      >
        <div
          className="container-fluid py-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={submit} className="mt-3 px-3">
            <div className="">
              <label>Current Password</label>
              <TextInput
                type="password"
                name={"current_password"}
                onChange={onChange}
                value={state.current_password}
              />
            </div>
            <div className="">
              <label>New Password</label>
              <TextInput
                type="password"
                name={"new_password"}
                onChange={onChange}
                value={state.new_password}
              />
            </div>

            <div className="">
              <label>Confirm Password</label>
              <TextInput
                type="password"
                name={"confirm_password"}
                onChange={onChange}
                value={state.confirm_password}
              />
            </div>

            <div className="my-4 text-center w-100">
              <FormButton type="submit">Change Password</FormButton>
            </div>
          </form>
        </div>
      </AppWrapper>
    </Dashboard>
  );
};

export default connect(null, actions)(ChangePassword);
