import React from 'react'
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login";
// import Login  from "./pages/login";
import AuthRoute from './components/AuthRoute';
import PaymentPage from './pages/payment';
import ManageProfile from './pages/profile';
import Events from './pages/events';
import MembershipSettings from './pages/membershipSettings';
import UserProfile from './pages/user-profile';
import PlatformAdmin from './pages/platform-admin';
// import MembershipStatus from './components/membershipStatus';
import HomePage from './pages/home';

function Root(){
    
    return (
        <Switch>
            <AuthRoute exact path="/" component={HomePage}/>
            <AuthRoute exact path="/platform-settings" component={MembershipSettings} />
            <AuthRoute exact path="/user/dashboard" component={UserProfile} />
            <AuthRoute exac path="/admin/settings" component={PlatformAdmin} />
            <AuthRoute exact path="/profile" component={ManageProfile} />
            <AuthRoute exact path="/payment" component={PaymentPage} />
            <Route exact path="/login" component={Login} />
            <AuthRoute exact path="/events" component={Events} />
        </Switch>
    )
}

export default Root;