import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from "../assets/IPF_Logo.png";
import nigeria from "../assets/nigeria.png";

import india from "../assets/india.png";

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyAdmin: false,
      active: "home",
    };
  }
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("x-access-token");
    this.props.history.push("/login");
  };

  componentDidMount() {
    const ipfUser = JSON.parse(localStorage.getItem("ipf-user"));
    if (ipfUser.nrole === "super-user") {
      this.setState({
        companyAdmin: true,
      });
    }
  }

  onActive = (s = "managecompany") => {
    this.setState({
      active: s,
    });
  };

  render() {
    const { companyAdmin } = this.state;
    const { other } = this.props;
    return (
      <div className="container-fluid">
        <div className="user-dasboard-header1"></div>
        <div className="user-dasboard-header2">
          <div className="d-flex flex-column justify-content-between align-items-center py-4 px-2">
            <img
              className="mb-3"
              src={logo}
              alt="ipf"
              style={{ width: 80, height: 80 }}
            />
            <h5
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {" "}
              India Professional Forum
            </h5>
            <h5
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Nigeria
            </h5>
          </div>
          <ul className="side-menu-list">
            <li
              className={`list-item  ${
                this.state.active === "home" && "active"
              }`}
            >
              <Link to="/user/dashboard" onClick={() => this.onActive("home")}>
                <span>
                  {" "}
                  <i className="material-icons">account_circle</i>
                </span>
                <span>Accounts</span>
              </Link>
            </li>

            <li
              className={`list-item  ${
                this.state.active === "managecompany" && "active"
              }`}
            >
              <Link
                to="/user/dashboard/managecompany"
                onClick={() => this.onActive("managecompany")}
              >
                <span>
                  <i className="material-icons">account_circle</i>
                </span>
                <span>Company Details</span>
              </Link>
            </li>

            {companyAdmin && (
              <li
                className={`list-item  ${
                  this.state.active === "addmember" && "active"
                }`}
              >
                <Link
                  to="/user/dashboard/addmember"
                  onClick={() => this.onActive("addmember")}
                >
                  <span>
                    <i className="material-icons">account_circle</i>
                  </span>
                  <span>Add Member</span>
                </Link>
              </li>
            )}

            <li className="list-item">
              <Link>
                <span>
                  {" "}
                  <i className="material-icons">payment</i>
                </span>
                <span>Payments</span>
              </Link>
            </li>
            <li className="list-item">
              <Link>
                <span>
                  {" "}
                  <i className="material-icons">date_range</i>
                </span>

                <span>Events</span>
              </Link>
            </li>
            <li onClick={this.logout} className="list-item">
              <Link>
                <span className="rotate-90-deg">
                  {" "}
                  <i className="material-icons">play_for_work</i>
                </span>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>

        {other ? (
          <section className="">{this.props.children}</section>
        ) : (
          <>
            <section className="user-profile-section">
              {this.props.children}
            </section>

            <div className="bg-blue p-2">
              <div className="d-flex mt-3 justify-content-end">
                <img src={india} alt="flag" />
                <img src={nigeria} alt="flag" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(UserDashboard);
