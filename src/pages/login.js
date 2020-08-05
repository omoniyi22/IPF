

import React, { Component } from 'react';
import BlackBackground from '../components/black_bg';
import {LoginBg, LoginBgWhite, Input,SubmitButton,
   LoginForm, FormLegend, StyledColorOrange} from '../components/login-bg';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class Login extends Component {
  state = {emailAddress:'', password: ''}
  handleOnChange = e => {
    const {name, value} = e.target;
    this.setState({
      [name]:value
    })
  }
  submit = async (e) => {
    e.preventDefault();
    try{
      
        const {emailAddress, password} = this.state;
        const response = await Axios.post('/api/v1/auth/login',{emailAddress, password})
        const {data: {token, firstName, lastName,email,isAdmin,approved,position, phoneNumber}} = response.data;
        localStorage.setItem('x-access-token', token)
        localStorage.setItem('ipf-user', JSON.stringify({firstName, lastName, email, isAdmin, approved, position, phoneNumber}))
        this.props.history.push('/')
    }catch(error){
      console.error(error)

    }
  }
  render() {
    return (
      <div className="container-fluid" style={{padding: 0}}> 
        <div className="desktop">
          <BlackBackground>
              <div className="py-4 px-4">
                  <LoginBg>
                      <div className="row">
                          <div className="col-md-6 col-lg-6">

                          </div>
                          <div className="col-md-6 col-lg-6">
                              <LoginBgWhite>
                                    <div className="d-flex align-items-center w-100 h-100">
                                      <LoginForm onSubmit={this.submit}>
                                          <FormLegend >
                                              Welcome
                                          </FormLegend>
                                          <Input value={this.state.emailAddress} onChange={this.handleOnChange} name="emailAddress" placeholder="Username/Email" />
                                          <Input value={this.state.password} onChange={this.handleOnChange}  name="password" type="password" placeholder="password" />
                                          <div className="text-center">
                                            <SubmitButton type="submit">
                                                Sign In
                                            </SubmitButton>

                                          </div>
                                          <div className="text-center mt-5">
                                              <span>Don't have an account?</span>
                                              <Link to="#">
                                                  <StyledColorOrange>
                                                      Sign up
                                                  </StyledColorOrange>
                                              </Link>
                                          </div>
                                      </LoginForm>
                                    </div>
                                    
                              </LoginBgWhite>
                          </div>
                      </div>
                  </LoginBg>
              </div>
          </BlackBackground>
        </div>
        

     </div>
    );
  }
}

export default Login;
