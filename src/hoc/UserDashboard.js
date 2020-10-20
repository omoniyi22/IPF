import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import images from "../assets/images";
import logo from "../assets/IPF_Logo.png";
import * as actions from "../redux/actions";
import { api, attachApiToken } from "../services/api";
import "./dashboard2.css";
import { connect } from "react-redux";
import Header from "./UserHeader";
const { naijaFlag, indianFlag } = images;
class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyAdmin: false,
      active: "home",
      openSnackbar: true,
      memberType: "",
      company: {
        company_name: "",
        company_details: "",
        industry_type: "",
        industryClassification: "",
        website: "",
        logo: "",
      },
    };
  }
  logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push("/login");
  };

  componentDidMount() {
    const ipfUser = JSON.parse(localStorage.getItem("ipf-user"));

    this.setState(
      {
        companyAdmin: ipfUser.nrole === "super-user" ? true : false,
        memberType: ipfUser.memberType,
      },
      () => {
        this.getUser();
      }
    );
  }

  getUser = async () => {
    try {
      const authApi = await attachApiToken(api);
      const response = await authApi.get("/company");
      this.setState({
        company: { ...response.data.data },
      });
    } catch (error) {}
  };

  onActive = (link = "managecompany") => {
    switch (link) {
      case "managecompany":
        this.setState({
          active: "managecompany",
        });
        break;

      case "home":
        this.setState({
          active: "home",
        });
        break;

      case "addmember":
        this.setState({
          active: "addmember",
        });
        break;
      default:
        break;
    }
  };

  handleClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  isObjectEmpty = (obj) => {
    if (obj.constructor === Object && Object.keys(obj).length === 0)
      return true;
    return false;
  };

  render() {
    const {  companyAdmin, openSnackbar, memberType } = this.state;

    const { other, location } = this.props;

    const editCompany =
      location.pathname === "/user/dashboard/managecompany" ? "active" : "";

    const home = location.pathname === "/user/dashboard" ? "active" : "";
    const addmember =
      location.pathname === "/user/dashboard/addmember" ? "active" : "";
    const manageprofile =
      location.pathname === "/user/dashboard/profile-update" ? "active" : "";

    return (
      <div className="container-fluid">
        <Header />
      
        <div style={{overflowY : "auto"}} className="user-dasboard-header2">
          <div className="d-flex flex-column justify-content-between align-items-center py-4 px-2">
            <img className="mb-3 custom-ipf-logo" src={logo} alt="ipf" />
            <h5
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {" "}
              Indian Professionals Forum
            </h5>
            <h5
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              }}
            ></h5>
          </div>
          <ul className="side-menu-list">
            <li className={`list-item ${home}`}>
              <Link to="/user/dashboard">
                <span>
                  <i className="material-icons">account_circle</i>
                </span>
                <span>Accounts</span>
              </Link>
            </li>

            <li className={`list-item ${manageprofile}`}>
              <Link to="/user/dashboard/profile-update">
                <span>
                  <i className="material-icons">account_circle</i>
                </span>
                <span>Manage profile</span>
              </Link>
            </li>

            {["AB", "AA", "LB", "LA"].includes(memberType) && (
              <li className={`list-item ${editCompany}`}>
                <Link to="/user/dashboard/managecompany">
                  <span>
                    <i className="material-icons">account_circle</i>
                  </span>
                  <span>Company Details</span>
                </Link>
              </li>
            )}

            {companyAdmin && (
              <li className={`list-item ${addmember}`}>
                <Link to="/user/dashboard/addmember">
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

            <li className="list-item">
              <Link to="/user/dashboard/change-password">
                <span className="">
                  <i className="material-icons">security</i>
                </span>
                <span>Change Password</span>
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
          <section className="user-profile-container">
            {this.props.children}
          </section>
        ) : (
          <>
            <section className="user-profile-section">
              {this.props.children}
            </section>

            <div className="bg-blue p-2">
              <div className="d-flex mt-3 justify-content-end">
                <img src={indianFlag} alt="flag" className="flags mr-1" />
                <img src={naijaFlag} alt="flag" className="flags" />
              </div>
            </div>
          </>
        )}

        {companyAdmin && this.state.company.company_details === "" && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openSnackbar}
            // autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert
              style={{ marginTop: "8%" }}
              onClose={this.handleClose}
              severity="warning"
            >
              <span>
                Please proceed to{" "}
                <b style={{ fontWeight: "bold" }}>Company Details</b> to
                complete your company details.
              </span>
            </Alert>
          </Snackbar>
        )}

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.props.isDefaultPassword}
        >
          <Alert style={{ marginTop: "8%" }} severity="warning">
            <span>
              <b>
                For your security, please click{" "}
                <Link to="/user/dashboard/change-password">
                  <b>here </b>
                </Link>
                to change your <b>default password</b>
              </b>
            </span>
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDefaultPassword: state.user.isDefaultPassword,
  };
};
export default connect(mapStateToProps, actions)(withRouter(UserDashboard));
