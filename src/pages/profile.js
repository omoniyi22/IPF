import React, { Component} from 'react'
// import AltDashboard from '../hoc/Dashboard';
// import CustomHeader from '../hoc/CustomHeader';
import { TextInput, FormButton } from '../components/components';
import Axios from 'axios';
import * as actions from '../redux/actions';
import { connect } from 'react-redux';
import Dashboard from '../hoc/Dashboard';


class ManageProfile extends Component{
    state = {
        "memberId": 1,
        "firstName": "",
        "lastName": "",
        "emailAddress": "",
        "nameOfCompany": "",
        "phoneNumber": "",
        "password": null,
        "memberNumber": "",
        "membershipType": "",
        "address": null,
        "city": null,
        "industryClassification": null,
        "industryType": null,
        "website": null,
        "companyDetails": null,
        "isAdmin": 1,
        "profileCompleted": 0,
        "barcode": null,
        "DomPurchase": null,
        "expiryDate": null,
        "expiryStatus": null,
        "approved": 1,
        "createdAt": "",
        "enrolled": null,
        "registeredBy": null,
        "suspended": 0,
        "position": "",
        "company_id": 0,
        "role": "",
        "avatar": null,
        "position_duration": "",
        "dob": "",
        "phoneNumber2": null,
        "emailAddress2": null,
        "passport": null,
        "street1": null,
        "street2": null,
        "state": null,
        "country": null,
        "qualifications": null,
        "member_id": ""
    }
    componentDidMount(){
        this.getUserDetail();
    }
    getUserDetail = async () => {
        try{
            this.props.showLoader(true);

            const token = localStorage.getItem('x-access-token');
            const response = await Axios.get('/api/v1/auth/details', {headers:{'x-access-token': token}})
            const data = response.data.data;
            console.log(data)
            this.setState({...data}, () => this.props.showLoader());
            
        }catch(error){
            this.props.showLoader()
            console.error(error)
        }
    }
    submit = async (e) => {
        e.preventDefault()
        console.log(this.state)

        try{
            const phoneNumberRegx = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/
            const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
            if(!phoneNumberRegx.test(this.state.phoneNumber) || !phoneNumberRegx.test(this.state.phoneNumber2)){
                alert('Phone Number is not valid')
                return ;
            }
            if(!emailRegx.test(this.state.emailAddress) || !emailRegx.test(this.state.emailAddress2)){
                alert('Email Address is not valid')
                return ;
            }
            this.props.showLoader(true)
            const token = localStorage.getItem('x-access-token')
            const response = await Axios.patch('/api/v1/auth/edit', this.state, {headers: {'x-access-token': token}} )
            console.log(response.data)
            this.props.showLoader()
            alert('Update Successful')
        }catch(error){
            console.error(error)
            this.props.showLoader()
            alert('Some errors were encountered');
        }
    }
    handleOnChange = (e) => {
        const {target: {name, value}} = e;
        console.log(name, value)
        this.setState({
            [name]: value
        })
    }
    uploadWidget = ()=> {
        const $this = this;
        window.cloudinary.openUploadWidget({ cloud_name: 'dnevwxinm', upload_preset: 'onfjtj7b', tags:['xmas']},
            function(error, result) {
                if(error){
                    return console.log(error)
                }
                $this.setState({
                    avatar: result[0].url
                })
            });
    }
    render(){
        return (
            <Dashboard>
                {/* <CustomHeader>
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
                </CustomHeader> */}
                <div className="profile container-fluid py-3">
                    <div className="row justify-content-center my-4">
                            <div className="circle-avatar text-center d-flex align-items-center justify-content-center">
                                {
                                    this.state.avatar ? <img className="img-avatar" src={this.state.avatar} alt="profile" />
                                    : <span><i style={{fontSize: 200, color: '#bdbdbd'}} className="material-icons">account_circle</i></span>
                                }
                                <span onClick={this.uploadWidget} className="camera-button"><i className="material-icons">camera_enhance</i></span>
                            </div>
                    </div>
                    <form onSubmit={this.submit} className="mt-3 px-3">
                        <div className="row">
                            <div className="col-lg-6">
                                <label>First Name</label>
                                <TextInput name={"firstName"} onChange={this.handleOnChange} value={this.state.firstName} />
                            </div>
                            <div className="col-lg-6">
                                <label>Last Name</label>
                                <TextInput name={"lastName"} onChange={this.handleOnChange} value={this.state.lastName} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Email 1</label>
                                <TextInput name={"emailAddress"} onChange={this.handleOnChange} value={this.state.emailAddress} type="email" />
                            </div>
                            <div className="col-lg-6">
                                <label>Email 2</label>
                                <TextInput name={"emailAddress2"} onChange={this.handleOnChange} value={this.state.emailAddress2} type="email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Phone number 1</label>
                                <TextInput name={"phoneNumber"} onChange={this.handleOnChange} value={this.state.phoneNumber}  />
                                <span>format: 2348070706069</span>
                            </div>
                            <div className="col-lg-6">
                                <label>Phone number 2</label>
                                <TextInput name={"phoneNumber2"} onChange={this.handleOnChange} value={this.state.phoneNumber2} />
                                <span>format: 2348070706069</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Passport No</label>
                                <TextInput name={"passport"} onChange={this.handleOnChange} value={this.state.passport} />
                            </div>
                            <div className="col-lg-6">
                                <label>Date of Birth</label>
                                <TextInput name="dob" onChange={this.handleOnChange} value={this.state.dob} type="date" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Street 1</label>
                                <TextInput name={"street1"} onChange={this.handleOnChange} value={this.state.street1} />
                            </div>
                            <div className="col-lg-6">
                                <label>Street 2</label>
                                <TextInput name={"street2"} onChange={this.handleOnChange} value={this.state.street2} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>City</label>
                                <TextInput name={"city"} onChange={this.handleOnChange} value={this.state.city} />
                            </div>
                            <div className="col-lg-6">
                                <label>State</label>
                                <TextInput name={"state"} onChange={this.handleOnChange} value={this.state.state} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Website</label>
                                <TextInput name={"website"} onChange={this.handleOnChange} value={this.state.website}  />
                            </div>
                            <div className="col-lg-6">
                                <label>Role</label>
                                <TextInput disabled name={"role"} onChange={this.handleOnChange} value={this.state.role} />
                            </div>
                        </div>
                        <div className="my-4 text-center w-100">
                            <FormButton type="submit">
                                Update
                            </FormButton>
                        </div>
                    </form>
                </div>
            </Dashboard>
        )
    }
}


export default connect(null, actions)(ManageProfile);