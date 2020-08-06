import React, { Component} from 'react'
import AltDashboard from '../hoc/AltDasboard';
import CustomHeader from '../hoc/CustomHeader';
import { TextInput, FormButton } from '../components/components';



class ManageProfile extends Component{
    submit = async (e) => {
        e.preventDefault()
    }
    render(){
        return (
            <AltDashboard>
                <CustomHeader>
                    <div className="container-fluid">
                        <div className="row  text-white bg-green">
                            <div className="col-lg-4 text-white">
                                <h1 className="text-white header-title">Dashboard</h1>
                            </div>
                            <div className="col-lg-8">
                                <div className="d-flex h-100 w-100 flex-grow-1 align-items-center justify-content-center">
                                    <span><i className="material-icons" style={{fontSize: 48}}>account_circle</i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomHeader>
                <div className="profile container-fluid py-3">
                    <form onSubmit={this.submit} className="mt-3 px-3">
                        <div className="row">
                            <div className="col-lg-6">
                                <label>First Name</label>
                                <TextInput />
                            </div>
                            <div className="col-lg-6">
                                <label>Last Name</label>
                                <TextInput />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Email 1</label>
                                <TextInput type="email" />
                            </div>
                            <div className="col-lg-6">
                                <label>Email 2</label>
                                <TextInput type="email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Phone number 1</label>
                                <TextInput />
                            </div>
                            <div className="col-lg-6">
                                <label>Phone number 2</label>
                                <TextInput />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Passport No</label>
                                <TextInput />
                            </div>
                            <div className="col-lg-6">
                                <label>Date of Birth</label>
                                <TextInput type="date" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Street 1</label>
                                <TextInput />
                            </div>
                            <div className="col-lg-6">
                                <label>Street 2</label>
                                <TextInput />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>City</label>
                                <TextInput />
                            </div>
                            <div className="col-lg-6">
                                <label>State</label>
                                <TextInput />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Occupation</label>
                                <TextInput />
                            </div>
                            <div className="col-lg-6">
                                <label>State</label>
                                <TextInput />
                            </div>
                        </div>
                        <div className="my-4 text-center w-100">
                            <FormButton>
                                Update
                            </FormButton>
                        </div>
                    </form>
                </div>
            </AltDashboard>
        )
    }
}


export default ManageProfile;