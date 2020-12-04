import React from "react";
import DashBoard from "../hoc/Dashboard";
import CustomTab from "../components/tab";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
`;

const Profile = ({
  userDetails,
  getUserDetails,
  updateDetails,
  isLoading,
  history,
  role
}) => {
  function updateAccountDetails(data) {
    isLoading(true);
    updateDetails(data);
  }

  return (
    <DashBoard clas={"new_bg"}>
      <Container>
        <CustomTab
          role={role}
          userDetails={userDetails}
          updateDetails={updateAccountDetails}
        />
      </Container>
    </DashBoard>
  );
};

const mapStateToProps = (state) => {
  const {
    user: { userDetails },
  } = state;
  return {
    userDetails,
    role: state.user.currentUser.role === "super-user"
  };
};

export default connect(mapStateToProps, actions)(Profile);
