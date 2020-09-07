import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import images from "../assets/images";
import { FooterLogoContainer, FooterLogo } from "../components/login-bg";
class SideMenu extends Component {
  logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push("/login");
  };
  render() {
    return (
      <>
        <ul className="desktop side-menu-list">
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
            <Link to="/admin/events">
              <span>
                {" "}
                <i className="material-icons">date_range</i>
              </span>

              <span>Events</span>
            </Link>
          </li>
          <li className="list-item">
            <Link to="/admin/dashboard/profile-update">
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
            <Link to="/admin/payment">
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
                <Link to="/admin/designation">Designations</Link>
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
        <div className="d-flex mt-3 justify-content-center">
          <FooterLogoContainer>
            <FooterLogo src={images.indianFlag} alt="flag" />
            <FooterLogo src={images.naijaFlag} alt="flag" />
          </FooterLogoContainer>
        </div>
      </>
    );
  }
}

export default withRouter(SideMenu);
