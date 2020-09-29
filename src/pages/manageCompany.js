import React from "react";
import DashBoard from "../hoc/UserDashboard";
import CustomTab from "../components/tab";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-left: 200px;
  margin-right: 5px;
`;

const Profile = ({
  userDetails,
  getUserDetails,
  updateDetails,
  isLoading,
  history,
}) => {
  function updateAccountDetails(data) {
    isLoading(true);
    updateDetails(data);
  }

  return (
    <DashBoard other history={history}>
      <Container>
        <CustomTab
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
  return { userDetails };
};

export default connect(mapStateToProps, actions)(Profile);
