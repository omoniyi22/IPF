
import React, { Component } from "react";
import UserDashboard from "../hoc/UserDashboard";
import bg01 from "../assets/bg01.png";
import * as actions from '../redux/actions'
import {connect} from 'react-redux';
import Axios from "axios";
import { TextInput } from "../components/components";
import EventRole from "../components/event-role";

class UserProfile extends Component{
    state = {
        DomPurchase: '',
address: '',
approved: 0,
avatar: '',
barcode: '',
city: '',
companyDetails: '',
company_id: 0,
country: '',
createdAt: "2020-08-15T16:30:09.000Z",
dob: '',
emailAddress: "chika.egon@techparlons.com",
emailAddress2: '',
enrolled: '',
expiryDate: '',
expiryStatus: '',
firstName: "Narcisse",
industryClassification: '',
industryType: '',
isAdmin: 0,
lastName: "Egonu",
memberId: 281,
memberNumber: '',
member_id: "216244c9-df4f-4b34-a549-a220dab233c4",
membershipType: "AM",
nameOfCompany: "Techparlons",
passport: '',
password: '',
phoneNumber: "07067656151",
phoneNumber2: '',
position: '',
position_duration: '',
profileCompleted: 0,
qualifications: '',
registeredBy: '',
role: '',
state: '',
street1: '',
street2: '',
suspended: 0,
website: '',
    }
    componentDidMount(){
        this.getUserDetails()
        window.$('.modal').modal();
    }
    openModal = () => {
        window.$('#modal1').modal('open')
    }
    getUserDetails = async () => {
        try{
            this.props.showLoader(true)
            const token = localStorage.getItem('x-access-token')
            const response = await Axios.get('/api/v1/auth/details', {headers: {'x-access-token': token}});
            this.props.showLoader()
            const data = response.data.data;
            console.log(data)
            this.setState({...data})
        }catch(error){
            console.error(error);
            this.props.showLoader()
        }
    }
    handleOnChange = (e) => {
        e.preventDefault()
        const {target: {name, value}} = e;

        this.setState({
            [name]: value
        })
    } 
    submit = async (e) => {
        e.preventDefault()
        console.log(this.state)

        try{
           if(this.state.firstName.trim() === '' || this.state.lastName === ''){
               return alert('First name and last name is required')
           }
            const phoneNumberRegx = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/
            const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
            if(!phoneNumberRegx.test(this.state.phoneNumber)){
                alert('Phone Number is not valid')
                return ;
            }
            if(!emailRegx.test(this.state.emailAddress)){
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
    viewEvent = () => {

    }
    render(){
        
        return (
            <UserDashboard>
                <div className="">
                    
                    <div style={{height: 250}}>
                        <img src={bg01} className="img-fluid h-100" alt="background" />
                    </div>
                    <div className="container-fluid user-profile-container">
                        <div className="row">
                            <div className="col-md-6" style={{position:'relative'}}>
                                <div className="user-profile-score-card shadow bg-white p-1">
                                <div className="row justify-content-between px-3 border-bottom mb-0" >
                                        <div className="d-flex">
                                        <h5 className="fw-bold book-family">Member Id:</h5>
                                        <h5  className="mx-2 fw-bold book-family">{this.state.memberId}</h5>
                                        </div>
                                             <div className="d-flex flex-grow-1 justify-content-end"><h5 onClick={this.openModal} className="book-family text-underline">Edit Profile</h5></div>
                                        </div>
                                    <div className="">
                                        <div className="w-1oo" >
                                            <img src={`${this.state.avatar ? this.state.avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=60'}`}  className="user-profile-image" alt="bg" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h5 className="book-family">Welcome, {this.state.firstName}</h5>
                                            <h6 className="book-family w-100 mt-0">{this.state.nameOfCompany}</h6>
                                    </div>
                                    <div>
                                        <span className="mx-3"><i className="material-icons">stay_current_portrait</i></span><span classNam="px-3 book-family">{this.state.phoneNumber}</span>
                                    </div>
                                    <div className="row">
                                        <span className="mx-3"><i className="material-icons">mail</i></span><span classNam="px-3 book-family">{this.state.emailAddress}</span>
                                    </div>
                                    <div className="row justify-content-center">
                                            <button className="waves-effect waves-light btn ">Membership status: {this.state.approved === 1 ? 'Approved': 'Pending'}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3 className="book-family" style={{fontSize: 24}}>Member Type</h3>
                                            <div className="shadow bg-white p-2">
                                                <div className="row border-bottom">
                                                    <h5 className="book-family w-100 fw-bold ">Upcoming Events</h5>
                                                
                                                </div>
                                                <div className="row">
                                                    <EventRole title="Annual Conference 2020" details="June 15th, 2020" onClick={this.viewEvent} />
                                                    <EventRole title="Annual Conference 2020" details="June 15th, 2020" onClick={this.viewEvent} />
                                                    <EventRole title="Annual Conference 2020" details="June 15th, 2020" onClick={this.viewEvent} />
                                                </div>
                                            </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="shadow bg-blue p-1">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <p><h5 className="book-family fw-bold text-white" style={{fontSize: 18}}> 2020 Innovation Conference</h5></p>
                                                    <p><h5 className="book-family text-white" style={{fontSize: 16}}>
                                                    Interesting seakers, delicious food, do not miss the event!
                                                        </h5></p>
                                                </div>
                                                <div className="col-md-4">
                                                       <div className="row h-100 align-items-center">
                                                       <span className="cs-bottom fw-bold">Sign Up</span>
                                                       </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="shadow bg-white p-2">
                                <div className="row border-bottom">
                                                    <h5 className="book-family w-100 fw-bold ">Upcoming Events</h5>
                                                
                                                </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                 <div className="shadow bg-white p-2">
                                 <div className="row border-bottom">
                                                    <h5 className="book-family w-100 fw-bold ">Upcoming Events</h5>
                                                
                                                </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div id="modal1" class="modal modal-fixed-footer">
                        <div class="modal-content">
                        <h4>{'Update Profile'}</h4>
                        <div className="container-fluid mt-3">
                            <div className="row justify-content-center">
                            <div className="circle-avatar text-center d-flex align-items-center justify-content-center">
                                {
                                    this.state.avatar ? <img className="img-avatar" src={this.state.avatar} alt="profile" />
                                    : <span><i style={{fontSize: 200, color: '#bdbdbd'}} className="material-icons">account_circle</i></span>
                                }
                                <span onClick={this.uploadWidget} className="camera-button"><i className="material-icons">camera_enhance</i></span>
                            </div>
                            </div>
                            
                                
                            <div className="row">
                                <TextInput name={"firstName"} placeholder="First Name" onChange={this.handleOnChange} value={this.state.firstName} />
                            </div>
                            <div className="row">
                                <TextInput name={"lastName"} placeholder="Last Name" onChange={this.handleOnChange} value={this.state.lastName} />
                            </div>
                            <div className="row">
                                <TextInput name={"emailAddress"} placeholder="Email Addresss" onChange={this.handleOnChange} value={this.state.emailAddress} />
                            </div>
                            <div className="row">
                                <TextInput name={"phoneNumber"} placeholder="Phone Number" onChange={this.handleOnChange} value={this.state.phoneNumber} />
                                <span>format: 2348070706069</span>
                            </div>
                                  
                            
                        </div>
                        </div>
                        <div class="modal-footer">
                        
                        <a href="#!" class="modal-close  waves-effect waves-green btn-flat">Close</a>
                        <button onClick={this.submit} className="waves-effect waves-green btn-primary btn">Update</button>
                        </div>
                    </div>
            </UserDashboard>
        )
    }
}

export default connect(null, actions)(UserProfile);