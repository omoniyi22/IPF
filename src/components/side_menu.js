import React, { Component } from "react";
import { Link } from 'react-router-dom';

class SideMenu extends Component{
    render(){
        return(
            <ul className="side-menu-list">
                      <li className="list-item">
                        <Link>
                           <span> <i className="material-icons">format_list_bulleted</i></span>
                           <span>Overview</span>
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link><span> <i className="material-icons">date_range</i></span>
                        
                           <span>Events</span>
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link>
                        <span> <i className="material-icons">account_circle</i></span>
                           <span>Manage Profile</span>
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link>
                        <span> <i className="material-icons">notifications_none</i></span>
                           <span>Notifications</span>
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link>
                        <span> <i className="material-icons">payment</i></span>
                           <span>Payments</span>
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link>
                        <span> <i className="material-icons">supervisor_account</i></span>
                           <span>Members</span>
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link>
                        <span> <i className="material-icons">account_balance</i></span>
                           <span>Transactions</span>
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link>
                        <span> <i className="material-icons">trending_up</i></span>
                           <span>Report</span>
                        </Link>
                      </li>
                      <li className="list-item">
                        <Link>
                        <span> <i className="material-icons">settings</i></span>
                           <span>Masters</span>
                           <span className="px-2">
                              <i className="material-icons">keyboard_arrow_down</i>
                           </span>
                        </Link>
                      </li>
                  </ul>
        )
    }
}

export default SideMenu;