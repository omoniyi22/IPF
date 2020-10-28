import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";


// import Login  from "./pages/login";
import AuthRoute, { AdminRoute } from "./components/AuthRoute";
import PaymentPage from "./pages/payment";
import ManageProfile from "./pages/profile";
import Events from "./pages/events";
import MembershipSettings from "./pages/membershipSettings";
import UserProfile from "./pages/user-profile";
import PlatformAdmin from "./pages/platform-admin";
// import MembershipStatus from './components/membershipStatus';
// import HomePage from "./pages/home";

import EventPage from './pages/event'


import HomePage from "./pages/home/index";
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

function Root() {
  return (
    <Router>
      <Switch>

        <Route path="/landing" component={LandingPage} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/password/reset/:id/:token" component={ResetPassword} />
        <Route path="/login" component={Login} />
        <Route path="/edit_event" component={EventPage} />


        <AuthRoute path="/user/dashboard/addmember" component={AddMember} />
        <AuthRoute path="/user/dashboard/managecompany" component={AddCompany} />
        <AuthRoute path="/platform-settings" component={MembershipSettings} />
        <AuthRoute path="/user/dashboard" component={UserProfile} />
        <AuthRoute path="/user/dashboard/profile-update" component={ManageUserProfile} />
        <AuthRoute path="/user/dashboard/change-password" component={UserChangePassword} />
        <AuthRoute path="/payment" component={PaymentPage} />
        <AuthRoute path="/events" component={Events} />


        <AdminRoute path="/admin/manage-members" component={Members} />
        <AdminRoute path="/admin/dashboard/profile-update" component={ManageProfile} />
        <AdminRoute path="/admin/events" component={Events} />
        <AdminRoute path="/admin/payment" component={PaymentPage} />
        <AdminRoute path="/admin/settings/membership" component={GeneralSettings} />
        <AdminRoute path="/admin/settings" component={PlatformAdmin} />
        <AdminRoute path="/admin/designation" component={Position} />
        <AdminRoute path="/admin/change-password" component={ChangePassword} />
        <AdminRoute path="/" component={HomePage} />

      </Switch>
    </Router>
  );
}
export default Root;