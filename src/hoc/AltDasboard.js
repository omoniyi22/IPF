

import React, { Component } from 'react';
// import Header from './Header';
// import HeaderSecondary from './HeaderSecondary';

import SideMenu from '../components/side_menu';
import Header from './Header';
// import CustomHeader from './CustomHeader';

class AltDashboard extends Component {
  render() {
    return (
      <div className="container-fluid alt-dashboard" style={{padding: 0}}>
            <Header />
            <div className="desktop">
                
                <div className="-alt-side-menu-left ">
                  <SideMenu></SideMenu>
                </div>
              
            </div>
            <div className="menu-content">
                  {this.props.children}
              </div>
        </div>
    );
  }
}

export default AltDashboard;
