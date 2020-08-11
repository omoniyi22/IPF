import React , {Component} from 'react';
import MaterialTable from 'material-table'
import TableAction from '../components/table-action';
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import Axios from 'axios';
import UserAction from '../components/user-action';
import Dashboard from '../hoc/Dashboard';
import { TextInput } from '../components/components';

class Members extends Component{
    state = {
        currentTab: 'organisation' ,
        companies: [],
        data: {},
        members: [],
        firstName:'',
        lastName: '',
        email: '',
        phoneNumber: '',

        }
    async componentDidMount(){
        //initialize materialize modal
        window.$('.modal').modal();
        this.getCompanies()
    }

    perfromUserAction = (action, data) => {
        switch(action){
            case 'assign-admin':
                this.assignAdmin(data)
                break
            case 'block':
                this.blockUser(data)
                break;
            case 'remove':
                this.removeUser(data)
                break;
            default:
                break;
        }
    }

    assignAdmin = async (data) => {
        try{

        }catch(error){
            this.props.showLoader();
            console.error(error)
            alert('Some errors were encountered')
        }
    }

    blockUser = async (data) => {

    }

    removeUser = async (data) => {
        try{
            const onConfirm = window.confirm('Are you sure?')
            if(onConfirm){
                this.props.showLoader(true)
                const token = localStorage.getItem('x-access-token');
                await Axios.delete('/api/v1/admin/remove',{userId: data.memberId}, {headers: {'x-access-token': token}})
                this.props.showLoader()
                alert('Action Successful')
            }
            
            
        }catch(error){
            this.props.showLoader()
            console.error(error)
            alert('some errors were encountered')
        }
    }

    getCompanies = async () => {
        try{
            this.props.showLoader(true)
            const token = localStorage.getItem('x-access-token')
            const response = await Axios.get('/api/v1/admin/companies', {headers: {'x-access-token': token}});
            const companies = response.data.data
            this.props.showLoader(false)
            this.setState({companies})
        }catch(error){
            console.error(error)
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
    
    
    handleOnClick = (action, data) => {
        switch(action){
            case 'view-members':
                this.viewMembers(data)
                break;
            case 'add-member':
                this.addMemberToCompany(data)
            break;

            default:
                return ;
        }
    }

    addMemberToCompany = (data) => {
        try{
            
            this.setState({data}, () => window.$('#modal2').modal('open'))

        
        }catch(error){
            this.props.showLoader()
            console.error(error);
            alert('some errors where encountered')
        }
    }

    addMember = async (e) => {
        e.preventDefault();
        const {firstName, lastName, email, phoneNumber} = this.state;
        if(firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || phoneNumber.trim() === ''){
            return alert('Incomplete details, please fill all required')
        }

        try{
            const token = localStorage.getItem('x-access-token')
            const data = this.state.data;
            this.props.showLoader(true)
            await Axios.post('/api/v1/admin/corporate-member', {company_id: data.company_id, 
                    firstName, lastName, email, phoneNumber}, {headers: {'x-access-token': token}})
            this.props.showLoader(false)
            this.setState({
                firstName: '', lastName: '', email: '', phoneNumber: ''
            }, () => alert('Operation successful') )
            
        }catch(error){
            console.error(error);
            this.props.showLoader()
        }
    }

    viewMembers = async (data) => {
        console.log(window.$('.modal'))
        this.setState({data})
        try{
            this.props.showLoader(true)
            const token = localStorage.getItem('x-access-token');
            const response = await Axios.get(`/api/v1/admin/company-members?company_id=${data.company_id}`, {headers: {'x-access-token': token}})
            console.log(response.data)
            this.setState({
                members: response.data.data
            }, () => window.$('#modal1').modal('open'))
            this.props.showLoader()
            
        }catch(error){
            console.error(error);
            this.props.showLoader()
        }
        
    }
    renderIndividualBlock = () => (<div className="shadow rounded bg-white col-md-12 p-3">
    <MaterialTable
        components={{
            Action: (props) => {
                console.log(props)
                if(props.action.icon === 'save'){
                    return <TableAction data={props.data} onClick={this.handleOnClick} />
                }
                return <button>Hello</button>
            }
        }}
        title=""
        columns={[
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Member No', field: 'memberNo' },
            { title: 'Member Type', field: 'memberType' },
            { title: 'Phone Number', field: 'phoneNumber' },
            // { title: 'Membership NO:', field: 'membershipNo', type: 'numeric' },
            
            // {
            // title: 'Birth Place',
            // field: 'birthCity',
            // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
        ]}
        data={[{
            name: 'charles onuorah', email: 'charles.onuorah@yahoo.com',
            memberNo: 'A091019', memberType: 'Full', phoneNumber: '019019019019'
        }]}        
        
        options={{
            headerStyle: {
                background: '#FA6400',
                color: '#FFF',
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: 'bold',
                zIndex:1,
                
            },
            searchFieldStyle:{
                
            },
            actionsColumnIndex: -1
            
          }}
          actions={[
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData) => {
                // Do save operation
              },
            },
            
          ]}
        //   editable={{
        //     onRowAdd: newData => {},
        //     onRowUpdate: (newData, oldData) => {},
        //     onRowDelete: oldData => {}
        //   }}
        />
    </div>)
    render(){
        console.log('state => ', this.state.currentTab)
        return (
            <Dashboard>
                

                <div className="container-fluid" style={{width: '90%'}}>
                    <div className="row mt-5">
                        <div className="shadow rounded bg-white col-md-12 p-3">
                            <div className="d-flex justify-content-center align-items-center">
                                    <div onClick={() => this.setState({currentTab: 'individual'})} style={{position:'relative'}}>
                                        <h4 className={`member-type-header mx-5 ${this.state.currentTab === 'individual' ? 'active' :''}`}>Individual</h4>
                                    </div>
                                    <div onClick={() => this.setState({currentTab: 'organisation'})} style={{position:'relative'}}>
                                        <h4  className={`member-type-header ${this.state.currentTab === 'organisation' ? 'active' :''}`}>Organisation</h4>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                       { this.state.currentTab === 'organisation' ? (
                       <div className="shadow rounded bg-white col-md-12 p-3">
                        <MaterialTable
                            components={{
                                Action: (props) => {
                                    console.log(props)
                                    if(props.action.icon === 'save'){
                                        return <TableAction data={props.data} onClick={this.handleOnClick} />
                                    }
                                    return <button>Hello</button>
                                }
                            }}
                            title=""
                            columns={[
                                { title: 'Name', field: 'company_name' },
                                { title: 'Email', field: 'email' },
                                { title: 'Member No', field: 'memberNumber' },
                                { title: 'Member Type', field: 'company_type' },
                                { title: 'Phone Number', field: 'phone_number' },
                                // { title: 'Membership NO:', field: 'membershipNo', type: 'numeric' },
                                
                                // {
                                // title: 'Birth Place',
                                // field: 'birthCity',
                                // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                                // },
                            ]}
                            data={this.state.companies}        
                            
                            options={{
                                headerStyle: {
                                    background: '#FA6400',
                                    color: '#FFF',
                                    fontFamily: '"Open Sans", sans-serif',
                                    fontWeight: 'bold',
                                    zIndex:1,
                                    
                                },
                                searchFieldStyle:{
                                    
                                },
                                actionsColumnIndex: -1
                                
                              }}
                              actions={[
                                {
                                  icon: 'save',
                                  tooltip: 'Save User',
                                  onClick: (event, rowData) => {
                                    // Do save operation
                                  },
                                },
                                
                              ]}
                            //   editable={{
                            //     onRowAdd: newData => {},
                            //     onRowUpdate: (newData, oldData) => {},
                            //     onRowDelete: oldData => {}
                            //   }}
                            />
                        </div>)

                        : this.renderIndividualBlock()

                            }
                    </div>
                    <div id="modal1" class="modal modal-fixed-footer">
                        <div class="modal-content">
                        <h4>{this.state.data.company_name + ' Members'}</h4>
                        <div className="container-fluid mt-3">
                        {
                            this.state.members.map((item) => (
                                
                                <div className="row shadow bg-white rounded p-2">
                                    <div className="col-md-12">
                                            <div className="row " style={{marginBottom: 8}}>
                                                <div className="col-md-8">
                                                    <h5>{`${item.firstName} ${item.lastName}`}</h5>
                                                </div>
                                                <div className="col-md-4">
                                                    <h5 className="text-primary">{`#${item.memberNumber}`}</h5>
                                                </div>
                                            </div>
                                            <div className="row " style={{marginBottom: 8}}>
                                                <div className="col-md-12">
                                                    <span>{`${item.emailAddress}`}</span>
                                                </div>
                                            </div>
                                            <div className="row " style={{marginBottom: 8}}>
                                                <div className="col-md-12">
                                                    <span>{`Role:`}<span className="mx-1" style={{fontWeight: 'bold', fontSize:'16px'}}>{item.role}</span></span>
                                                </div>
                                            </div>
                                            <div className="row " style={{marginBottom: 8}}>
                                                <div className="col-md-12 d-flex justify-content-end">
                                                    <UserAction data={item} onClick={this.perfromUserAction} />
                                                </div>
                                            </div>

                                    </div>
                                </div>
                                
                            ))
                        }
                        </div>
                        </div>
                        <div class="modal-footer">
                        
                        <a href="#!" class="modal-close  waves-effect waves-green btn-info btn">Close</a>
                        </div>
                    </div>
                    
                    <div id="modal2" class="modal modal-fixed-footer">
                        <div class="modal-content">
                        <h4>{'Add members to ' + this.state.data.company_name}</h4>
                        <div className="container-fluid mt-3">
                            <div className="row">
                                <TextInput name={"firstName"} placeholder="First Name" onChange={this.handleOnChange} value={this.state.firstName} />
                            </div>
                            <div className="row">
                                <TextInput name={"lastName"} placeholder="Last Name" onChange={this.handleOnChange} value={this.state.lastName} />
                            </div>
                            <div className="row">
                                <TextInput name={"email"} placeholder="Email Addresss" onChange={this.handleOnChange} value={this.state.email} />
                            </div>
                            <div className="row">
                                <TextInput name={"phoneNumber"} placeholder="Phone Number" onChange={this.handleOnChange} value={this.state.phoneNumber} />
                            </div>
                        </div>
                        </div>
                        <div class="modal-footer">
                        
                        <a href="#!" class="modal-close  waves-effect waves-green btn-flat">Close</a>
                        <button onClick={this.addMember} className="waves-effect waves-green btn-primary btn">Add</button>
                        </div>
                    </div>
                </div>
            </Dashboard>
        )
    }
}

export default connect(null, actions)(Members);

/*
DomPurchase: null
address: null
approved: 1
avatar: null
barcode: null
city: null
companyDetails: null
company_id: 21
country: null
createdAt: "2020-07-17T10:22:39.000Z"
dob: null
emailAddress: "narcisse.egonu@gmail.com"
emailAddress2: null
enrolled: null
expiryDate: null
expiryStatus: null
firstName: "Narcisse"
industryClassification: null
industryType: null
isAdmin: 0
lastName: "Egonu"
memberId: 81
memberNumber: "AB02101"
member_id: "8154b680-b833-47d7-8349-573b1b539795"
membershipType: "AB"
nameOfCompany: null
passport: null
password: "$2a$15$Y4VcqasPK.QXnQvXZfvVpeHd0o.JDyG6Wa85FDV74mBkb65OsM4Si"
phoneNumber: "07067656150"
phoneNumber2: null
position: null
position_duration: null
profileCompleted: 0
qualifications: null
registeredBy: null
role: "super-user"
state: null
street1: null
street2: null
suspended: 0
website: null

*/