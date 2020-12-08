import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { logout } from './../../redux/actions/authActions';
import { Link } from 'react-router-dom'
import { avata } from '../../utils/app';
class Nav_Options extends Component {
  render() {
    let { email, firstName, lastName, logout, user, approved } = this.props
    return (
      <>
        <div>
          <div className="user_on_top">
            <div className="logo_img z-depth-1 p-1">
              <div className="LOGO mt-2" />
            </div>
            <div className="user_brief   flex">
              <div className="brief  ml-auto">
                <div className="user_pix border bou z-depth-2  rounded-pill p-4 ml-auto sm-hide my-auto" style={{ backgroundImage: `url(${user.avatar || avata})` }} />
                <div className="data  my-auto text-white mx-2 mr-md-5">
                  <div className="name font-weight-bold">
                    {firstName} {lastName}
                  </div>
                  <div className="email">
                    {email}
                  </div>
                </div>
                <div className="user_pix border bou z-depth-2   rounded-pill p-4 sm-show" style={{ backgroundImage: `url(${user.avatar || avata})` }} />
              </div>
              <div className="user_buttons  p-2 flex fit  text-center text-white">
                <div className="alarms  my-auto">
                  <Link to="/invitations">
                    <div className="user_buttons_img" style={{ backgroundImage: `url(${require('./../../assets/medias/alarmed.png')})` }} />
                    <div className="user_buttons_text sm-hide text-white">
                      Invitations
                  </div>
                  </Link>
                </div>

                <div className="settings  my-auto">
                  <Link to="profile-update">
                    <div className="user_buttons_img" style={{ backgroundImage: `url(${require('./../../assets/medias/settings.png')})` }} />
                    <div className="user_buttons_text sm-hide  text-white">
                      Settings
                    </div>
                  </Link>
                </div>
                <div className="powers  my-auto" onClick={() => logout(this.props.history)}>
                  <div className="user_buttons_img" style={{ backgroundImage: `url(${require('./../../assets/medias/power.png')})` }} />
                  <div className="user_buttons_text sm-hide">
                    Sign Out
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-center sm-hide z-depth-1  member_status text-white py-3 sticky">
          <div className="my-col-2 mt-1   tone m-0">
            DASHBOARD
            </div>
          <div className="flex-2 down_ed  pr-md-5 mr-md-5">
            <span className="font-light">Membership Status:</span><span className="smaller"> {approved === 1 ? "ACTIVE" : "INACTIVE"}</span>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  firstName: state.user.currentUser.firstName,
  lastName: state.user.currentUser.lastName,
  email: state.user.currentUser.emailAddress,
  approved: state.user.currentUser.approved,
  user: state.user.currentUser
})

export default connect(mapStateToProps, { logout })(withRouter(Nav_Options))