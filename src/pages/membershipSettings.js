import React, { Component } from "react"
import AltDasboard from "../hoc/AltDasboard";
// import CustomHeader from "../hoc/CustomHeader";
import MaterialTable from 'material-table'
// import { TableHeader, TableBody } from "../components/components";
// import MembershipStatus from "../components/membershipStatus";
import Axios from "axios";
import * as actions from '../redux/actions';
import { connect } from "react-redux";

class MembershipSettings extends Component {
    state = {
        membershipTypes: [],
        industryTypes: [],
        industryClassification: []
    }
    componentDidMount(){
        this.getPageAccountSettings()
    }
    getPageAccountSettings = async () => {
        try{
            const token = localStorage.getItem('x-access-token');
            Axios.defaults.headers.common['x-access-token'] = token;
            this.props.showLoader(true);
            const response1 = await Axios.get('/api/v1/admin/membership-type', {headers: {'x-access-token': token}});
            const response2 = await Axios.get('/api/v1/admin/industry-type', {headers: {'x-access-token': token}});
            const response3 = await Axios.get('/api/v1/admin/industry-classification', {headers: {'x-access-token': token}});
            // const response4 = await Axios.get('', {headers: {'x-access-token': token}});
            console.log(response2.data)
            this.props.showLoader(false);
            const membershipTypes = response1.data.data;
            const industryTypes = response2.data.data;
            const industryClassification = response3.data.data;
            this.setState({
                membershipTypes,
                industryTypes,
                industryClassification
            })

        }catch(error){
            console.error(error.response);
            this.props.showLoader(false)
        }
    }
    render(){
        return (
            <AltDasboard>
                {/* <CustomHeader>
                    <MembershipStatus></MembershipStatus>
                </CustomHeader> */}
                <div className="membership-settings container-fluid mt-5" style={{width: '90%'}}>
                    <div className="row">
                        <div className=" col-lg-6 mb-3 box col-sm-12">
                            <div className="shadow h-100 bg-white p-3 ">
                            <h5 className="mt-3" style={{color:'#089242', fontWeight:'bold'}}>Manage Membership Type</h5>
                            <MaterialTable
                            title=""
                            
                            columns={[
                                { title: 'Name', field: 'name' },
                                { title: 'Code', field: 'code' },
                                { title: 'Limit', field: 'enrol_limit', type: 'numeric' },
                                // { title: 'Membership NO:', field: 'membershipNo', type: 'numeric' },
                                
                                // {
                                // title: 'Birth Place',
                                // field: 'birthCity',
                                // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                                // },
                            ]}
                            data={this.state.membershipTypes}        
                            
                            options={{
                                headerStyle: {
                                    background: '#FA6400',
                                    color: '#FFF',
                                    fontFamily: '"Open Sans", sans-serif',
                                    fontWeight: 'bold',
                                    zIndex:1,
                                    
                                },
                                searchFieldStyle:{
                                    
                                }
                                
                              }}
                              editable={{
                                isEditable: rowData => true,
                                onRowAdd:  async (newData) => {
                                    this.props.showLoader(true)
                                    try{
                                        await Axios.post('/api/v1/admin/membership-type',newData)
                                        this.props.showLoader(false)

                                        this.getPageAccountSettings();
                                    }catch(error){
                                        console.error(error.response)
                                        this.props.showLoader(false)
                                    }
                                 
                                },
                                onRowUpdate: async (newData, oldData) => {
                                    this.props.showLoader(true)
                                    try{
                                        // const token = localStorage.getItem('x-access-token');
                                        await Axios.patch('/api/v1/admin/membership-type', newData)
                                        this.props.showLoader(false)

                                        this.getPageAccountSettings();
                                    }catch(error){
                                        console.error(error.response)
                                        this.props.showLoader(false)
                                    }
                                
                                },
                                onRowDelete: async (oldData) => {
                                    this.props.showLoader(true)
                                    try{
                                        // const token = localStorage.getItem('x-access-token');
                                        await Axios.delete('/api/v1/admin/membership-type', {id: `${oldData.id}`})
                                        this.props.showLoader(false)

                                        this.getPageAccountSettings();
                                    }catch(error){
                                        console.error(error.response)
                                        this.props.showLoader(false)
                                    }
                                }   
                              }}
                              localization={{
                                  body: {
                                      editRow: {
                                          deleteText: 'Are you really sure to delete record?'
                                      }
                                  }
                              }}
                            />
                            </div>
                        </div>
                        <div className=" col-lg-6 mb-3 box col-sm-12">
                            <div className="shadow h-100 bg-white p-3 ">
                            <h5 className="mt-3" style={{color:'#089242', fontWeight:'bold'}}>Manage Industry Type</h5>
                            <MaterialTable
                            title=""
                            columns={[
                                { title: 'Industry Type', field: 'industry_name' },
                                
                            ]}
                            data={this.state.industryTypes}        
                            
                            options={{
                                headerStyle: {
                                    background: '#FA6400',
                                    color: '#FFF',
                                    fontFamily: '"Open Sans", sans-serif',
                                    fontWeight: 'bold',
                                    zIndex:1,
                                    
                                },
                                searchFieldStyle:{
                                    
                                }
                                
                              }}
                              editable={{
                                onRowAdd: newData => {},
                                onRowUpdate: (newData, oldData) => {},
                                onRowDelete: oldData => {}
                              }}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" col-lg-6 mb-3 box col-sm-12">
                            <div className="shadow h-100 bg-white p-3 ">
                            <h5 className="mt-3" style={{color:'#089242', fontWeight:'bold'}}>Manage Industry Classfication</h5>
                            <MaterialTable
                            title=""
                            columns={[
                                { title: 'Industry Name', field: 'industry_name' },
                                // { title: 'Membership NO:', field: 'membershipNo', type: 'numeric' },
                                
                                // {
                                // title: 'Birth Place',
                                // field: 'birthCity',
                                // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                                // },
                            ]}
                            data={this.state.industryClassification}        
                            
                            options={{
                                headerStyle: {
                                    background: '#FA6400',
                                    color: '#FFF',
                                    fontFamily: '"Open Sans", sans-serif',
                                    fontWeight: 'bold',
                                    zIndex:1,
                                    
                                },
                                searchFieldStyle:{
                                    
                                }
                                
                              }}
                              editable={{
                                onRowAdd: newData => {},
                                onRowUpdate: (newData, oldData) => {},
                                onRowDelete: oldData => {}
                              }}
                            />
                            </div>
                        </div>
                        <div className=" col-lg-6 mb-3 box col-sm-12">
                            <div className="shadow h-100 bg-white p-3 ">
                            <h5 className="mt-3" style={{color:'#089242', fontWeight:'bold'}}>Manage Position</h5>
                            <MaterialTable
                            title=""
                            columns={[
                                { title: 'Name', field: 'name' },
                                { title: 'Code', field: 'code' },
                                { title: 'Limit', field: 'limit', type: 'numeric' },
                                // { title: 'Membership NO:', field: 'membershipNo', type: 'numeric' },
                                
                                // {
                                // title: 'Birth Place',
                                // field: 'birthCity',
                                // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                                // },
                            ]}
                            data={[
                                // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                                { name: 'Aliyu Olateju', code: '090', limit: '0' },
                            ]}        
                            
                            options={{
                                headerStyle: {
                                    background: '#FA6400',
                                    color: '#FFF',
                                    fontFamily: '"Open Sans", sans-serif',
                                    fontWeight: 'bold',
                                    zIndex:1,
                                    
                                },
                                searchFieldStyle:{
                                    
                                }
                                
                              }}
                              editable={{
                                onRowAdd: newData => {},
                                onRowUpdate: (newData, oldData) => {},
                                onRowDelete: oldData => {}
                              }}
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </AltDasboard>
        )
    }
}

export default connect(null, actions)(MembershipSettings);