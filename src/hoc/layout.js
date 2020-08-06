
import React, { Component } from 'react';
import { connect } from "react-redux";
import loader from "../assets/loader.svg";

 class Layout extends Component {
  render() {
    return (
      <div style={{minHeight:'100vh', minWidth:'100vw', position:'relative'}}> 
        {this.props.children}
        { this.props.isLoading ? (<div className="loader-wrapper">
            <div className="loader">
                <img src={loader} alt="loading" />
            </div>
        </div>) : null}
     </div>
    );
  }
}

const mapStateToProps = state => {
  const {UI: {isLoading}} = state;
  return {
    isLoading
  }
}

export default connect(mapStateToProps, null)(Layout);
