import React, { Component } from "react";
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageLoader from './assets/utiils/page_loader'
import PageError from './assets/utiils/page_error'
import Paid_OR_Failed from './pages/payment/Paid_OR_Failed/index'
import Index from './pages/index/index'


import Login from "./pages/login";
import HomePage from "./pages/home/index";
import EventPage from './pages/event'
import Payment_History from './pages/pay_history'
import Invitation from './pages/invitation'

// import Payment from './pages/payment/payment'
// import HomePage from "./pages/home/index";
// import EventPage from './pages/event'
// import Login  from "./pages/login";
// import Payment_History from './pages/pay_history'
// import MembershipStatus from './components/membershipStatus';
// import HomePage from "./pages/home";
// import EventPage from './pages/event'
// import HomePage from "./pages/home/index";

import MemberPage from './pages/members/index'
import Payment from './pages/payment/payment'

import AuthRoute, { AdminRoute, auth } from "./components/AuthRoute";
import PaymentPage from "./pages/payment";
import ManageProfile from "./pages/profile";
import Events from "./pages/events";
import MembershipSettings from "./pages/membershipSettings";
import UserProfile from "./pages/user-profile";
import PlatformAdmin from "./pages/platform-admin";



import Dashboard from './hoc/Dashboard'

import GeneralSettings from "./pages/generalSettings";
import Members from "./pages/members";
import Position from "./pages/designation";
import LandingPage from "./pages/landingPage";
import AddCompany from "./pages/manageCompany";
import AddMember from "./pages/addMember";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import ManageUserProfile from "./pages/manageProfile";
import ChangePassword from "./pages/changePassword";
import UserChangePassword from "./pages/user/changePassword";

class Root extends Component {
  render() {
    console.log(`${this.props.isAuth} is Auth`)
    let { isAuth, page_loader, page_error, isAdmin, nrole } = this.props
    return (

      <>

        <Router >
          {/* {page_loader === true ?
            <PageLoader /> : <>
              {page_error
                === true &&
                // undefined ?
                <PageError />
              } </>
          } */}
          <Switch>
            {/* <Route path="/landing" component={LandingPage} /> */}

            <Route path="/forgot" component={ForgotPassword} />
            <Route path="/password/reset/:id/:token" component={ResetPassword} />
            <Route path="/login" component={Login} />

            <Route path="/invitations" component={() => <Dashboard> <Invitation /></Dashboard>} />
            <Route path="/event_page" component={() => <Dashboard><EventPage /></Dashboard>} />
            <Route path="/create-event" component={() => <Dashboard> <HomePage /></Dashboard>} />
            <Route path="/invite" component={() => <Dashboard><EventPage /></Dashboard>} />
            <Route path="/edit_event" render={() => <Dashboard><EventPage /></Dashboard>} />
            <Route path="/payment_history" component={() => <Dashboard><Payment_History /></Dashboard>} />
            <Route path="/members" component={() => <Dashboard><MemberPage /></Dashboard>} />
            <Route path="/payment" component={() => <Dashboard><Payment /></Dashboard>} />
            <Route path="/change-password" component={() => isAuth ? <ChangePassword /> : <LandingPage />} />
            <Route path="/profile-update" component={() => isAdmin === 1 ? <ManageProfile /> : <>{isAuth === true ? <ManageUserProfile /> : <LandingPage />} <ManageUserProfile /></>} />


            <AuthRoute path="/user/dashboard/addmember" component={() => <Dashboard><AddMember /></Dashboard>} />
            <AuthRoute path="/user/dashboard/managecompany" component={AddCompany} />
            <AuthRoute path="/platform-settings" component={MembershipSettings} />
            <AuthRoute path="/user/dashboard" component={UserProfile} />
            <AuthRoute path="/user/dashboard/profile-update" component={ManageUserProfile} />
            <AuthRoute path="/payment" component={PaymentPage} />
            <AuthRoute path="/events" component={Events} />


            <AdminRoute path="/admin/manage-members" component={Members} />
            <AdminRoute path="/admin/settings/membership" component={GeneralSettings} />
            <AdminRoute path="/admin/settings" component={PlatformAdmin} />
            <AdminRoute path="/admin/designation" component={Position} />
            <Route path="/event_" render={() => isAuth === true ? <Dashboard><HomePage /></Dashboard> : <LandingPage />} />
            <Route path="/result" render={() => isAuth === true ? <Paid_OR_Failed /> : <LandingPage />} />
            <Route path="/" render={() => isAuth === true ? <Index admin={isAdmin} /> : <LandingPage />} />
          </Switch>
        </Router >

      </>
    );
  }
}

const mapStateToProps = state => ({

  page_loader: state.load_or_error.page_loader,
  page_error: state.load_or_error.page_error,
  isAuth: state.user.isAuth,
  isAdmin: state.user.currentUser.isAdmin,
  nrole: state.user.currentUser.nrole
})
export default connect(mapStateToProps)(Root);