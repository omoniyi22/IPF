import React, { Component } from "react";
import CustomHeader from "../hoc/CustomHeader";
import { TableHeader, TableBody } from "../components/components";
import MembershipStatus from "../components/membershipStatus";
const { default: AltDashboard } = require("../hoc/AltDasboard");



class PlatformAdmin extends Component{
    render(){
        return (
            <AltDashboard>
                <CustomHeader>
                    <MembershipStatus></MembershipStatus>
                </CustomHeader>
                <div className="container shadow mt-5" style={{width:'90%'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mt-3" style={{color:'#089242'}}>Platform Admins</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" style={{minHeight: '60vh'}}>
                            <TableHeader>
                                <div className="container">
                                    <div className="row">

                                    </div>
                                </div>
                            </TableHeader>
                            <TableBody>

                            </TableBody>
                        </div>
                    </div>
                </div>
            </AltDashboard>
        )
    }
}

export default PlatformAdmin;