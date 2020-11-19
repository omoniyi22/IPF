import React, { Component } from 'react'
import UserProfile from './../../pages/user-profile'
import AdminHome from './../../pages/home'


class Index extends Component {
  render() {
    let { admin } = this.props
    return (
      <>
        {admin === 0 ?
          <UserProfile /> :
          <AdminHome />}
      </>
    )
  }
}

export default Index