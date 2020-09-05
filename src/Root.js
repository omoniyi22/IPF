import React from "react";
import { Switch, Route } from "react-router-dom";
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
import HomePage from "./pages/home";
import GeneralSettings from "./pages/generalSettings";
import Members from "./pages/members";
import Position from "./pages/designation";
import LandingPage from "./pages/landingPage";
import AddCompany from "./pages/manageCompany";
import AddMember from "./pages/addMember";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import ManageUserProfile from "./pages/manageProfile";
function Root() {
  return (
    <Switch>
      <Route exact path="/landing" component={LandingPage} />
      <Route exact path="/forgot" component={ForgotPassword} />
      <Route
        exact
        path="/password/reset/:id/:token"
        component={ResetPassword}
      />
      <AuthRoute exact path="/user/dashboard/addmember" component={AddMember} />
      <AuthRoute
        exact
        path="/user/dashboard/managecompany"
        component={AddCompany}
      />
      <AdminRoute exact path="/" component={HomePage} />
      <AdminRoute exact path="/admin/manage-members" component={Members} />
      <AuthRoute
        exact
        path="/platform-settings"
        component={MembershipSettings}
      />
      <AuthRoute exact path="/user/dashboard" component={UserProfile} />
      <AuthRoute
        exact
        path="/user/dashboard/profile-update"
        component={ManageUserProfile}
      />

      <AdminRoute
        exact
        path="/admin/dashboard/profile-update"
        component={ManageProfile}
      />
      <AdminRoute exact path="/admin/events" component={Events} />
      <AdminRoute exact path="/admin/payment" component={PaymentPage} />
      <AuthRoute exact path="/payment" component={PaymentPage} />
      <Route exact path="/login" component={Login} />
      <AuthRoute exact path="/events" component={Events} />
      <AdminRoute
        exact
        path="/admin/settings/membership"
        component={GeneralSettings}
      />
      <AdminRoute exact path="/admin/settings" component={PlatformAdmin} />
      <AdminRoute exact path="/admin/designation" component={Position} />
    </Switch>
  );
}

export default Root;
