import React, { Component } from 'react'
import UserProfile from './../../pages/user-profile'
import AdminHome from './../../pages/home'


class Index extends Component {
  render() {
    let { admin } = this.props
    return (
      <>
        {admin === 0 ?
          <div className="old_bg">
            <UserProfile />
          </div>
          :
          <div className="old_bg">
            <AdminHome />
          </div>
        }
      </>
    )
  }
}

export default Index