
import React, { Component } from "react";
import Dashboard from "../hoc/Dashboard";
// import CustomHeader from "../hoc/CustomHeader";
import { Link } from 'react-router-dom'

class Events extends Component {
  render() {
    return (
      <Dashboard clas="new_bg">
        {/* <CustomHeader>
            <div className="container-fluid px-0  ">
                <div className="row ">
                    <div className="col-lg-2">
                        <h1 className="text-white header-title">Dashboard</h1>
                    </div>
                    <div className="col-lg-10">
                        <div className="d-flex justify-content-center align-items-center">
                            <ul className="header-sub-menu-list"> 
                                <li className="header-sub-menu-list-item text-white">All</li>
                                <li className="header-sub-menu-list-item text-white active">Upcoming</li>
                                <li className="header-sub-menu-list-item text-white">Past</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
          </CustomHeader> */}
        <div className="container-fluid px-0   w-100 h-100">
          <div className="d-flex mt-5 events-content flex-column align-items-center h-100 justify-content-center">
            <h1>
              <span className="events-calendar"> <i className="material-icons">date_range</i></span>
            </h1>
            <p>
              <Link to="/event_"> Check Upcoming Events  </Link>
            </p>
          </div>
        </div>
      </Dashboard>
    )
  }
}


export default Events;