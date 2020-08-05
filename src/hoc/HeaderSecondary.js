
import React, { Component } from 'react';

class HeaderSecondary extends Component {
  render() {
    return (
      <div className="header-secondary"> 
        {this.props.children}
      </div>
    );
  }
}

export default HeaderSecondary;
