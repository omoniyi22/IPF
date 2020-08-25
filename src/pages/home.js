import React, { Component } from "react";
import Dashboard from "../hoc/Dashboard";
import { TableHeader, TableBody } from "../components/components";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import Axios from "axios";
import styled from "styled-components";
import Images from "../assets/images";

import { getDashboardOverview } from "../services";
class HomePage extends Component {
  state = {
    totalMembers: 0,
    paidMembers: 0,
    unpaidMembers: 0,
    pendingApproval: 0,
  };

  componentDidMount() {
    this.getDashboardDetails();
  }

  getDashboardDetails = async () => {
    try {
      this.props.showLoader(true);
      const response = await getDashboardOverview();
      const data = response.data.data;
      this.setState({ ...data }, () => this.props.showLoader());
    } catch (error) {
      this.props.showLoader();
    }
  };
  render() {
    return (
      <Dashboard>
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-lg-3 mb-2">
              <div className="shadow d-flex bg-white p-3">
                <span className="home-supervisor-icon">
                  {" "}
                  <i className="material-icons">supervisor_account</i>
                </span>
                <div className="summary-report" style={{ flex: 1 }}>
                  <div className="text-center">
                    <h4>Total Members</h4>
                  </div>
                  <div className="text-center">
                    <h6>{this.state.totalMembers}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mb-2">
              <div className="shadow d-flex bg-white p-3">
                <span className="home-supervisor-icon">
                  {" "}
                  <i className="material-icons">supervisor_account</i>
                </span>
                <div className="summary-report" style={{ flex: 1 }}>
                  <div className="text-center">
                    <h4>Pending Approvals</h4>
                  </div>
                  <div className="text-center">
                    <h6>{this.state.pendingApproval}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mb-2">
              <div className="shadow d-flex bg-white p-3">
                <span className="home-supervisor-icon">
                  {" "}
                  <i className="material-icons">supervisor_account</i>
                </span>
                <div className="summary-report" style={{ flex: 1 }}>
                  <div className="text-center">
                    <h4>Total Paid Membership</h4>
                  </div>
                  <div className="text-center">
                    <h6>{this.state.paidMembers}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mb-2">
              <div className="shadow d-flex bg-white p-3">
                <span className="home-supervisor-icon">
                  {" "}
                  <i className="material-icons">supervisor_account</i>
                </span>
                <div className="summary-report" style={{ flex: 1 }}>
                  <div className="text-center">
                    <h4>Total Unpaid Membership</h4>
                  </div>
                  <div className="text-center">
                    <h6>{this.state.unpaidMembers}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-10">
            <div className="col-lg-8 mb-3">
              <TableHeader style={{ backgroundColor: "#2A4B5A" }}>
                <h5
                  style={{ lineHeight: 2, color: "#fff", fontWeight: "bold" }}
                >
                  Reports
                </h5>
              </TableHeader>
              <div className="shadow bg-white p-5" style={{ height: "100%" }}>
                <Container>
                  <div className="no-notification">
                    <img
                      src={Images.report}
                      alt="bg"
                      style={{ height: 180, width: 180 }}
                    />
                  </div>
                  <div>
                    <P>No available Report</P>
                  </div>
                </Container>
              </div>
            </div>
            <div className="col-lg-4 mb-3 ">
              <div className="shadow bg-white">
                <div className="home-user-profile">
                  <span className="home-more-icon">
                    <i className="material-icons">more_horiz</i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col-lg-8 mb-3 ">
              <div className="shadow bg-white">
                <TableHeader>
                  <h5
                    style={{ lineHeight: 2, color: "#fff", fontWeight: "bold" }}
                  >
                    Updates
                  </h5>
                </TableHeader>
                <TableBody>
                  <Container>
                    <div className="no-notification">
                      <img
                        src={Images.calenderBg}
                        alt="bg"
                        style={{ height: 130, width: 130 }}
                      />
                    </div>
                    <div>
                      <P>No Upcoming Events</P>
                    </div>
                  </Container>
                </TableBody>
              </div>
            </div>
            <div className="col-lg-4 mb-3 ">
              <div className="shadow bg-white">
                <div className="home-chats-count d-flex flex-column">
                  <span className="home-more-icon">
                    <i className="material-icons">more_horiz</i>
                  </span>
                  <div className="d-flex pt-5 flex-column flex-grow-1 w-100 h-100 justify-content-center align-items-center">
                    <span className="home-chats-icon">
                      <i className="material-icons">mark_chat_unread</i>
                    </span>
                    <h2
                      style={{
                        lineHeight: 2,
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      0
                    </h2>
                  </div>
                  <div className="text-center text-white">
                    <h4 className="mb-3" style={{ fontWeight: "bold" }}>
                      Messages
                    </h4>
                    <h5
                      className="mb-2"
                      style={{
                        fontStyle: "italic",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Posted by Users
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    );
  }
}

export default connect(null, actions)(HomePage);

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
