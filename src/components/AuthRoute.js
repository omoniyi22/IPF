import React from 'react';

import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
    if(localStorage.getItem('x-access-token') && localStorage.getItem('ipf-user')){
        return true;
    }
    console.log('called here')
    return false;
}

const AuthRoute = ( {component: Component, authenticated, ...rest}) => (

    <Route 
        {...rest}
        render={(props) => isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" {...props}/>}
    />
)


export default AuthRoute