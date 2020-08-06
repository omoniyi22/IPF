
import React, { Component } from "react";
import UserDashboard from "../hoc/UserDashboard";
import bg01 from "../assets/bg01.png";
import bg02 from "../assets/bg02.png";

class UserProfile extends Component{
    render(){
        return (
            <UserDashboard>
                <div className="">
                    <div style={{height: 250}}>
                        <img src={bg01} className="img-fluid h-100" alt="background" />
                    </div>
                    <div className="container-fluid user-profile-container">
                        <div className="row">
                            <div className="col-md-6" style={{position:'relative', height: 300}}>
                                <div className="user-profile-score-card shadow bg-white p-5">
                                    <div className="">
                                        <div className="w-1oo" style={{height: 160}}>
                                            <img src={bg02} className="img-fluid" style={{objectFit:'contain', height: '100%', width: '100%'}} alt="bg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>Member Type</h3>
                                            <div className="shadow bg-white p-5"></div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="shadow bg-blue p-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="shadow bg-white p-5"></div>
                            </div>
                            <div className="col-md-8">
                                 <div className="shadow bg-white p-5"></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
               
            </UserDashboard>
        )
    }
}

export default UserProfile;