import React, { Component } from "react";
import { connect } from "react-redux";
import loader from "../assets/loader.svg";
import IpfLogo from "../assets/IPF_Logo.png";
import { Link } from "react-router-dom";

class Layout extends Component {
  componentDidMount() {
    // window.$(".sidenav").sidenav();
  }
  render() {
    return (
      <div
        style={{ minHeight: "100vh", minWidth: "100vw", position: "relative" }}
      >
        {this.props.children}
        {this.props.isLoading ? (
          <div className="loader-wrapper">
            <div className="loader">
              <img src={loader} alt="loading" />
            </div>
          </div>
        ) : null}
        <ul id="slide-out" class="sidenav">
          <li style={{ paddingBottom: "10rem" }}>
            <div class="user-view">
              <div class="background">
                {/* <img src={IpfLogo} alt="ipf" className="custom-ipf-logo" /> */}
              </div>
              <Link>{/* <span class="white-text name">John Doe</span> */}</Link>
              <Link>
                {/* <span class="white-text email">jdandturk@gmail.com</span> */}
              </Link>
            </div>
          </li>
          <li className="list-item">
            <Link to="/">
              <span>
                {" "}
                <i className="material-icons">format_list_bulleted</i>
              </span>
              <span>Overview</span>
            </Link>
          </li>
          <li className="list-item">
            <Link to="/events">
              <span>
                {" "}
                <i className="material-icons">date_range</i>
              </span>

              <span>Events</span>
            </Link>
          </li>
          <li className="list-item">
            <Link to="/user_dashboard/profile-update">
              <span>
                {" "}
                <i className="material-icons">account_circle</i>
              </span>
              <span>Manage Profile</span>
            </Link>
          </li>
          <li className="list-item">
            <Link>
              <span>
                {" "}
                <i className="material-icons">notifications_none</i>
              </span>
              <span>Notifications</span>
            </Link>
          </li>
          <li className="list-item">
            <Link to="/payment">
              <span>
                {" "}
                <i className="material-icons">payment</i>
              </span>
              <span>Payments</span>
            </Link>
          </li>
          <li className="list-item">
            <Link to="/admin/manage-members">
              <span>
                {" "}
                <i className="material-icons">supervisor_account</i>
              </span>
              <span>Members</span>
            </Link>
          </li>
          <li className="list-item">
            <Link>
              <span>
                {" "}
                <i className="material-icons">account_balance</i>
              </span>
              <span>Transactions</span>
            </Link>
          </li>
          <li className="list-item">
            <Link>
              <span>
                {" "}
                <i className="material-icons">trending_up</i>
              </span>
              <span>Report</span>
            </Link>
          </li>
          <li
            className="list-item sub-menu-controller"
            style={{ position: "relative" }}
          >
            <Link>
              <span>
                {" "}
                <i className="material-icons">settings</i>
              </span>
              <span>Masters</span>
              <span className="px-2">
                <i className="material-icons">keyboard_arrow_down</i>
              </span>
            </Link>
            <ul className="submenu">
              <li className="submenu-item">
                <Link to="/admin/settings/membership">Settings</Link>
              </li>
              <li className="submenu-item">
                <Link to="/admin/settings">Admins</Link>
              </li>
              <li className="submenu-item">
                <Link>Organisation</Link>
              </li>
            </ul>
          </li>
          <li className="list-item">
            <Link onClick={this.logout} to="#">
              <span className="rotate-90-deg">
                {" "}
                <i className="material-icons">play_for_work</i>
              </span>
              <span>Logout</span>
            </Link>
          </li>
        </ul>

        <ul id="slide-out2" class="sidenav">
          <li className="list-item">
            <Link to="/user_dashboard">
              <span>
                {" "}
                <i className="material-icons">format_list_bulleted</i>
              </span>
              <span>Account</span>
            </Link>
          </li>

          <li className="list-item">
            <Link to="/user_dashboard/profile-update">
              <span>
                {" "}
                <i className="material-icons">supervisor_account</i>
              </span>
              <span>Manage Profile</span>
            </Link>
          </li>

          <li className="list-item">
            <Link to="/user_dashboard_managecompany">
              <span>
                {" "}
                <i className="material-icons">supervisor_account</i>
              </span>
              <span>Manage Company</span>
            </Link>
          </li>
          <li className="list-item">
            <Link to="/admin/manage-members">
              <span>
                {" "}
                <i className="material-icons">supervisor_account</i>
              </span>
              <span>Add Members</span>
            </Link>
          </li>

          <li className="list-item">
            <Link onClick={this.logout} to="#">
              <span className="rotate-90-deg">
                {" "}
                <i className="material-icons">play_for_work</i>
              </span>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    UI: { isLoading },
  } = state;
  return {
    isLoading,
  };
};

export default connect(mapStateToProps, null)(Layout);
