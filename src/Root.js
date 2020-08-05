import React from 'react'
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login";
// import Login  from "./pages/login";
import HomePage from './pages/home';
import AuthRoute from './components/AuthRoute';

function Root(){
    
    return (
        <Switch>
            <AuthRoute exact path="/" component={HomePage}/>
            <Route exact path="/login" component={Login} />
        </Switch>
    )
}

export default Root;