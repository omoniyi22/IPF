import React, { Component } from "react";

class MembershipStatus extends Component{
    render(){
       return ( <div className="container-fluid px-0  ">
            <div className="row  text-white bg-green">
                <div className="col-lg-4 text-white">
                    <h1 className="text-white header-title">Dashboard</h1>
                </div>
                <div className="col-lg-8">
                    <div className="d-flex h-100 w-100  text-light flex-grow-1 align-items-center justify-content-center">
                       <h4 style={{fontWeight: 'bold'}}>Membership Status: <span>Approved</span></h4>
                    </div>
                </div>
            </div>
        </div>
       )
    }
}

export default MembershipStatus;