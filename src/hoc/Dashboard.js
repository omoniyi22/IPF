

import React, { Component } from 'react';
import Header from './Header';
// import HeaderSecondary from './HeaderSecondary';

import SideMenu from '../components/side_menu';

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid" style={{padding: 0}}>
            <div className="desktop">
                <Header />
                <div className="side-menu-left ">
                  <SideMenu></SideMenu>
                </div>
              <div className="menu-content">
                  {this.props.children}
              </div>
            </div>
        </div>
    );
  }
}

export default Dashboard;
