import React, { Component } from "react";
import IpfLogo from "../assets/IPF_Logo.png";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import Axios from "axios";

class Header extends Component {
  state = {
    firstName: "",
    lastName: "",
  };

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    try {
      const token = localStorage.getItem("x-access-token");
      const response = await Axios.get("/api/v1/auth/details", {
        headers: { "x-access-token": token },
      });
      const data = response.data.data;
      this.setState({ ...data });
    } catch (error) {}
  };

  render() {
    const { firstName, lastName, emailAddress } = this.state;
    return (
      <div className="">
        <div className="desktop header-bg-blue fixed-header">
          <div className="container-fluid h-100">
            <div className="row align-items-center h-100">
              <div className="col-lg-2">
                {/* <img src={IpfLogo} alt="IPf" className="img-logo" /> */}
              </div>
              <div className="col-lg-10 align-items-center h-100">
                <div className="row h-100">
                  <div className="col-lg-6"></div>
                  <div className="col-lg-6">
                    <div className="row align-items-center h-100">
                      <div className="col-lg-8 d-flex">
                        <img
                          src={
                            this.state.avatar
                              ? this.state.avatar
                              : "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png"
                          }
                          alt="IPf"
                          className="img-fluid img-logo rounded"
                        />
                        <span className="mx-3 header-user-profile">
                          <h4>{`${firstName} ${lastName}`}</h4>
                          <h6>{emailAddress}</h6>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mobile header-bg-lue mobile-fixed-header"
          style={{ background: "#0F2F3E" }}
        >
          <header className="mobile-header-bg-blue container-fluid">
            <div className="d-flex w-100">
              <div className="d-flex flex-column">
                <div>
                  <Link data-target="slide-out2" class="sidenav-trigger">
                    <i class="material-icons">menu</i>
                  </Link>
                  {/* <span style={{color: '#fff', fontSize: 40, cursor: 'pointer'}}><i style={{color: '#fff',fontSize:'inherit'}} className="material-icons">list</i></span> */}
                </div>
                <div
                  className="p-1 p-1 shadow"
                  style={{
                    backgroundColor: "#2B4B59",
                    border: "1px solid #2B4B59",
                  }}
                >
                  {" "}
                </div>
              </div>
              <div className="d-flex flex-column flex-grow-1 align-items-end">
                <div className="d-flex">
                  <div>
                    <h5 style={{ color: "#fff", marginTop: 0 }}>
                      {firstName} {lastName}
                    </h5>
                    <h6 style={{ color: "#fff" }}>{emailAddress}</h6>
                  </div>
                </div>
                <div className="d-flex mt-2 justify-content-end w-100">
                  <div onClick={() => this.props.logoutUser()}>
                    <span
                      className="mx-3 material-icons"
                      style={{ color: "#FA6400" }}
                    >
                      <i>power_settings_new</i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div
            className="container-fluid"
            style={{ backgroundColor: "#006D3A" }}
          >
            <div
              style={{ padding: "10px 0" }}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <h4
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  margin: 0,
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </h4>
              <h6 style={{ color: "#fff", fontWeight: "bold" }}>
                MemberShip Status: <span className="status">Approved</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Header);
