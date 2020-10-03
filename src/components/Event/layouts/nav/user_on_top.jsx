import React, { Component } from 'react'
import { connect } from 'react-redux'
class Nav_Options extends Component {
  render() {
    return (
      <>
        <div>
          <div className="user_on_top">
            <div className="logo_img">
              <div className="LOGO" />
            </div>
            <div className="user_brief   flex">
              <div className="brief  ml-auto">
                <div className="user_pix  rounded-pill p-4 ml-auto sm-hide my-auto" style={{ backgroundImage: `url(${require('./../../assets/medias/user.png')})` }} />
                <div className="data  my-auto text-white mx-2 mr-md-5">
                  <div className="name font-weight-bold">
                    Andrew John
                </div>
                  <div className="email">
                    andrewjohn@gmail.com
                </div>
                </div>
                <div className="user_pix   rounded-pill p-4 sm-show" style={{ backgroundImage: `url(${require('./../../assets/medias/user.png')})` }} />
              </div>
              <div className="user_buttons  p-2 flex fit  text-center text-white">
                <div className="alarms  my-auto">
                  <div className="user_buttons_img" style={{ backgroundImage: `url(${require('./../../assets/medias/alarmed.png')})` }} />
                  <div className="user_buttons_text sm-hide">
                    Notifications
                </div>
                </div>
                <div className="settings  my-auto">
                  <div className="user_buttons_img" style={{ backgroundImage: `url(${require('./../../assets/medias/settings.png')})` }} />
                  <div className="user_buttons_text sm-hide">
                    Settings
                </div>
                </div>
                <div className="powers  my-auto">
                  <div className="user_buttons_img" style={{ backgroundImage: `url(${require('./../../assets/medias/power.png')})` }} />
                  <div className="user_buttons_text sm-hide">
                    Sign Out
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-center sm-hide  member_status text-white py-3 sticky">
          <div className="my-col-2 mt-1   tone m-0">
            DASHBOARD
            </div>
          <div className="flex-2 down_ed  pr-md-5 mr-md-5">
            <span className="font-light">Membership Status:</span><span className="smaller"> ACTIVE</span>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({

})
export default connect(mapStateToProps)(Nav_Options)