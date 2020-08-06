
import React, { Component } from 'react';
import IpfLogo from "../assets/IPF_Logo.png";

class Header extends Component {
  render() {
    return (
      <div className="header-bg-blue fixed-header"> 
          <div className="container-fluid h-100">

            <div className="row align-items-center h-100">
              <div className="col-lg-2">
                  <img src={IpfLogo} alt="IPf" className="img-logo" />
              </div>
              <div className="col-lg-10 align-items-center h-100">
                  <div className="row h-100">
                  <div className="col-lg-6"></div>
                  <div className="col-lg-6">
                      <div className="row align-items-center h-100">
                            <div className="col-lg-8 d-flex">
                                <img src="http://www.venmond.com/demo/vendroid/img/avatar/big.jpg" alt="IPf" className="img-fluid img-logo rounded" />
                                <span className="mx-3 header-user-profile">
                                    <h4>Andrew Murray</h4>
                                    <h6>murray@gmail.com</h6>
                                </span>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-between w-100">
                                  <div>
                                      <span><i className="material-icons">notifications_active</i></span>
                                  </div>
                                  <div>
                                      <span className="material-icons"><i>settings</i></span>
                                  </div>
                                  <div>
                                      <span className="material-icons"><i>power_settings_new</i></span>
                                  </div>
                            </div>
                      </div>
                  </div>
                  </div>
              </div>
            </div>

          </div>
      </div>
    );
  }
}

export default Header;
