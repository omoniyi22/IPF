
import React, { Component } from 'react';
import IpfLogo from "../assets/IPF_Logo.png";
import { Link } from 'react-router-dom';
import * as actions from "../redux/actions";
import { connect } from 'react-redux';

class Header extends Component {
  state = {expanded: true}
  render() {
    return (
      <div className="">
          <div className="desktop header-bg-blue fixed-header"> 
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
          <div className="mobile header-bg-lue mobile-fixed-header" style={{background: '#0F2F3E'}}>
              <header className="mobile-header-bg-blue container-fluid">
                  <div className="d-flex w-100">
                      <div className="d-flex flex-column">
                            <div>
                                <span style={{color: '#fff', fontSize: 40, cursor: 'pointer'}}><i style={{color: '#fff',fontSize:'inherit'}} className="material-icons">list</i></span>
                            </div>
                            <div className="p-1 p-1 shadow" style={{backgroundColor:'#2B4B59', border: '1px solid #2B4B59'}} >
                                <img src={IpfLogo} alt="ipf" style={{width: 40, height: 40, objectFit:'contain'}} />
                            </div>
                      </div>
                      <div className="d-flex flex-column flex-grow-1 align-items-end">
                            <div className="d-flex">
                                <div>
                                    <h5 style={{color:"#fff", marginTop: 0}}>Andrew John</h5>
                                    <h6 style={{color:"#fff"}}>andrewjohn@gmail.com</h6>
                                </div>
                                <img src={IpfLogo} alt="avatar" style={{width: 40, height: 40, objectFit: 'contain', borderRadius: '50%'}}/>
                            </div>
                            <div className="d-flex mt-2 justify-content-end w-100">
                                    <div>
                                        <span className="mx-3"><i className="material-icons" style={{color:"#FA6400"}}>notifications_active</i></span>
                                    </div>
                                    <div>
                                        <span className="mx-3 material-icons" style={{color:"#FA6400"}}><i>settings</i></span>
                                    </div>
                                    <div onClick={() => this.props.logoutUser()}>
                                        <span className="mx-3 material-icons" style={{color:"#FA6400"}}><i>power_settings_new</i></span>
                                    </div>
                              </div>
                      </div>
                  </div>
              </header>
              <div className="container-fluid" style={{backgroundColor: '#006D3A'}}>
                  <div style={{padding: '10px 0'}} className="d-flex flex-column justify-content-center align-items-center">
                        <h4 style={{color:"#fff",fontSize: '18px', margin: 0, fontWeight: 'bold'}}>Dashboard</h4>
                        <h6 style={{color:"#fff", fontWeight: 'bold'}}>MemberShip Status: <span className="status">Approved</span></h6>
                  </div>
              </div>
              <div className="menu mobile-header-bg-blue" style={{backgroundColor: '#2A4B5A', paddingTop: 20, paddingBottom: 20}}>
                  <div className={`container mobile-menu`}>
                      <div className="row">
                          <div className="col-md-6"> 
                              <div className="shadow text-center mobile-menu-item"><Link to="/">
                              
                              <span>Overview</span>
                          </Link></div>
                         </div>
                          <div className="col-md-6">
                            <div className="shadow text-center mobile-menu-item text-white"><Link to="/events">
                              
                              <span>Events</span>
                          </Link></div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-6"> 
                              <div className="shadow text-center mobile-menu-item"><Link to="/user/dashboard/profile-update">
 
                           <span>Manage Profile</span>
                        </Link></div>
                         </div>
                          <div className="col-md-6">
                            <div className="shadow text-center mobile-menu-item"><Link>
                           <span>Notifications</span>
                        </Link></div>
                          </div>
                      </div>
                      <div className={`row ${this.state.expanded ? 'show-more-menu' : 'show-less-menu'}`}>
                          <div className="col-md-6"> 
                              <div className="shadow text-center mobile-menu-item">Payments</div>
                         </div>
                          <div className="col-md-6">
                            <div className="shadow text-center mobile-menu-item">Payment History</div>
                          </div>
                      </div>
                      <div className={`row ${this.state.expanded ? 'show-more-menu' : 'show-less-menu'}`}>
                          <div className="col-md-6"> 
                              <div className="shadow text-center mobile-menu-item"><Link to="/admin/manage-members">
            
                              <span>Members</span>
                            </Link></div>
                         </div>
                          <div className="col-md-6">
                            <div className="shadow text-center mobile-menu-item">Transactions</div>
                          </div>
                      </div>
                      <div className={`row ${this.state.expanded ? 'show-more-menu' : 'show-less-menu'}`}>
                          <div className="col-md-6"> 
                              <div className="shadow text-center mobile-menu-item">Reports</div>
                         </div>
                          <div className="col-md-6">
                            <div className="shadow text-center mobile-menu-item sub-menu-controller"><Link>
                           <span>Masters</span>
                           <span className="px-2">
                              <i className="material-icons">keyboard_arrow_down</i>
                           </span>
                        </Link>
                        <ul className="submenu">
                           <li className="submenu-item">
                              <Link to="/admin/settings/membership">
                              Settings
                              </Link>
                           </li>
                           <li className="submenu-item">
                              <Link to="/admin/settings">
                              Admins
                              </Link>
                           </li>
                           <li className="submenu-item">
                              <Link>
                              Organisation
                              </Link>
                           </li>
                        </ul></div>
                          </div>
                      </div>
                  </div>
                  <div onClick={() => this.setState({expanded: !this.state.expanded})} className="text-center text-white"style={{fontWeight:'bold', fontSize: 18, padding: '8px 8px'}}>
                    Show {this.state.expanded ? 'Less' : 'More'}
                  </div>
              </div>
              
          </div>
      </div>
      
    );
  }
}

export default connect(null, actions)(Header);
