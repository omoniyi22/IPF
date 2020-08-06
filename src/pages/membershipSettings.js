import React, { Component } from "react"
import AltDasboard from "../hoc/AltDasboard";
import CustomHeader from "../hoc/CustomHeader";
// import { TableHeader, TableBody } from "../components/components";
import MembershipStatus from "../components/membershipStatus";

class MembershipSettings extends Component {
    render(){
        return (
            <AltDasboard>
                <CustomHeader>
                    <MembershipStatus></MembershipStatus>
                </CustomHeader>
                <div className="membership-settings container-fluid mt-5" style={{width: '90%'}}>
                    <div className="row">
                        <div className="col-md-6 box col-sm-12">
                            <div className="shadow h-100 bg-white p-3 ">
                            <h5 className="mt-3" style={{color:'#089242', fontWeight:'bold'}}>Manage Membership Type</h5>
                            </div>
                        </div>
                        <div className="col-md-6 box col-sm-12">
                            <div className="shadow h-100 bg-white p-3 ">
                            <h5 className="mt-3" style={{color:'#089242', fontWeight:'bold'}}>Manage Industry Type</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 box col-sm-12">
                            <div className="shadow h-100 bg-white p-3 ">
                            <h5 className="mt-3" style={{color:'#089242', fontWeight:'bold'}}>Manage Industry Classfication</h5>
                            </div>
                        </div>
                        <div className="col-md-6 box col-sm-12">
                            <div className="shadow h-100 bg-white p-3 ">
                            <h5 className="mt-3" style={{color:'#089242', fontWeight:'bold'}}>Manage Position</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </AltDasboard>
        )
    }
}

export default MembershipSettings;