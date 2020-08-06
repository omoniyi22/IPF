

import React, { Component } from 'react';
import Dashboard from '../hoc/Dashboard';
import { TableHeader, TableBody } from "../components/components";
// import CustomHeader from '../hoc/CustomHeader';
// import Dashboard from '../hoc/Dashboard';

class HomePage extends Component {
  render() {
    return (
      <Dashboard>
          <div className="container-fluid">
              <div className="row mt-3">
                  <div className="col-lg-3">
                      <div className="shadow d-flex bg-white p-3">
                        <span className="home-supervisor-icon"> <i className="material-icons">supervisor_account</i></span>
                        <div className="summary-report" style={{flex:1}}>
                              <div className="text-center">
                                  <h4>Total Members</h4>
                              </div>
                              <div className="text-center">
                                  <h6>100</h6>
                              </div>
                        </div>
                      </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="shadow d-flex bg-white p-3">
                    <span className="home-supervisor-icon">  <i className="material-icons">supervisor_account</i></span>
                    <div className="summary-report"  style={{flex:1}}>
                              <div className="text-center">
                                  <h4>Pending Approvals</h4>
                              </div>
                              <div className="text-center">
                                  <h6>100</h6>
                              </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="shadow d-flex bg-white p-3">
                    <span className="home-supervisor-icon"> <i className="material-icons">supervisor_account</i></span>
                    <div className="summary-report"  style={{flex:1}}>
                              <div className="text-center">
                                  <h4>Total Paid Membership</h4>
                              </div>
                              <div className="text-center">
                                  <h6>100</h6>
                              </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="shadow d-flex bg-white p-3">
                    <span className="home-supervisor-icon"> <i className="material-icons">supervisor_account</i></span>
                    <div className="summary-report"  style={{flex:1}}>
                              <div className="text-center">
                                  <h4>Total Unpaid Membership</h4>
                              </div>
                              <div className="text-center">
                                  <h6>100</h6>
                              </div>
                        </div>
                    </div>
                  </div>
              </div>
              <div className="row mt-3">
                  <div className="col-lg-8">
                    <div className="shadow bg-white p-5">

                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="shadow bg-white">
                        <div className="home-user-profile">
                          <span className="home-more-icon"><i className="material-icons">more_horiz</i></span>
                        </div>
                    </div>
                  </div>
              </div>
              <div className="row mt-3 mb-4">
                  <div className="col-lg-8">
                    <div className="shadow bg-white">
                          <TableHeader>
                              <h5 style={{lineHeight: 2, color: '#fff', fontWeight: 'bold'}}>Updates</h5>
                          </TableHeader>
                          <TableBody></TableBody>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="shadow bg-white">
                        <div className="home-chats-count d-flex flex-column">
                              <span className="home-more-icon"><i className="material-icons">more_horiz</i></span>
                              <div className="d-flex flex-column flex-grow-1 w-100 h-100 justify-content-center align-items-center">
                                <span className="home-chats-icon"><i className="material-icons">mark_chat_unread</i></span>
                                <h2 style={{lineHeight: 2, color: '#fff', fontWeight: 'bold'}}>2501</h2>
                              </div>
                              <div className="text-center text-white">
                                    <h4 className="mb-3" style={{fontWeight:'bold'}}>Messages</h4>
                                    <h5 className="mb-2" style={{fontStyle:'italic', fontSize: 10, fontWeight:'bold'}}>Posted by Users</h5>
                              </div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      </Dashboard>
    );
  }
}

export default HomePage;
