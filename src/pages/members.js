import React, { Component } from "react";
import MaterialTable from "material-table";
import TableAction from "../components/table-action";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import Axios from "axios";
import UserAction from "../components/user-action";
import Dashboard from "../hoc/Dashboard";
import { TextInput } from "../components/components";
import MemberActions from "../components/member-actions";
import roleSanitizer from "../utils/roleSanitizer";
import { createCompanyCall } from "../services/requests";
import { emailRegx, phoneNumberRegx } from "../utils/regex";
import PhoneNumber from "../components/General/phoneInput";
import AppWrapper from "../components/appWrapper";
import { api, attachApiToken } from "../services/api";
import { getCompanies, getMembershipTypes, getMembers } from "../services";
import EditOrganization from "../components/organization/edit";
import EditMember from "../components/Members/editMember";
import styled from "styled-components";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ProfileModal, useStyle, neat } from "../components/Modal/Profile/ProfileModal";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { CSVDownload, CSVLink } from "react-csv";


import ReactToPdf from 'react-to-pdf'
import { I_M, O_M, A_M, C_M } from "../assets/utiils/memberData";
import { ProfileModal2, headers } from './home/soata'





const pageSizeOptions = [20, 50, 100, 200];
class Members extends Component {



  state = {
    pdf_load: true,
    memberPDF: [],
    corporatePDF: [],
    anchorEl: null,
    openSnackbar: false,
    currentTab: "organisation",
    companies: [],
    registeredMembers: [],
    data: {},
    members: [],
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    types: [],
    companyCode: "",
    phone_number: "",
    company_name: "",
    codes: ["AB", "AA", "LB", "LA"],
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPhoneNumber: "",
    company_address: "",
    type: "default",
    companyData: {},
    editCompany: false,
    userData: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
    },
    open: false,
    fullWidth: true,
    maxWidth: "sm",
    memberData: {}
  };



  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  handleMaxWidthChange = (event) => {
    this.setState({
      maxWidth: event.target.value
    });
  };


  async componentDidMount() {
    //initialize materialize modal
    try {
      let aa = await getMembers()
      aa = await aa.data
      aa = await aa.data

      let bb = await getCompanies()
      bb = await bb.data
      bb = await bb.data

      console.log({ aa, bb })

      setTimeout(() => {
        console.log({ oya: [aa, bb] })
        this.setState({
          memberPDF: aa,
          corporatePDF: bb,
          pdf_load: false,
        })
        console.log({ oya: [this.state.memberPDF, this.state.corporatePDF] })
      }, 2000);
    } catch (error) {
      console.log({ erroo: error.message })
      console.log({ erroo: error.response })
    }
    window.$(".modal").modal();
    this.getDataAtOnce();

  }

  perfromUserAction = (action, data) => {
    switch (action) {
      case "assign-admin":
        this.assignAdmin(data);
        break;
      case "view-profile":
        this.setState({ open: true, memberData: data });
        break;
      case "block":
        // this.blockUser(data);
        break;
      case "remove":
        this.removeUser(data);
        break;
      default:
        break;
    }
  };

  editMember = (data) => {
    this.setState(
      {
        userData: data,
      },
      () => {
        window.$("#modal6").modal("open");
      }
    );
  };
  assignAdmin = async (data) => {
    try {
      this.props.showLoader(true);
      const authApi = await attachApiToken(api);
      await authApi.patch("/admin/assign-role", {
        userId: data["member_id"],
        role: "super-user",
        type: "role",
      });
      this.props.showLoader(false);
      this.handleFireSnackbar("Operation Successful", "success");
    } catch (error) {
      this.props.showLoader(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return this.handleFireSnackbar(error.response.data.message, "error");
      }
      this.handleFireSnackbar("some errors were encountered", "error");
    }
  };

  removeUser = async (data) => {
    try {
      const onConfirm = window.confirm("Are you sure?");
      if (onConfirm) {
        this.props.showLoader(true);
        const authApi = await attachApiToken(api);
        await authApi.delete("/admin/remove", {
          data: { userId: data.member_id },
        });
        this.props.showLoader();
        this.handleFireSnackbar("Action Successful", "success");
        this.getDataAtOnce();
      }
    } catch (error) {
      this.props.showLoader();
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return this.handleFireSnackbar(error.response.data.message, "error");
      }
      this.handleFireSnackbar("some errors were encountered", "error");
    }
  };

  getDataAtOnce = async () => {
    try {
      // this.props.showLoader(true);
      const [memberRes, compRes, memTypeRes] = await Promise.all([
        getMembers(),
        getCompanies(),
        getMembershipTypes(),
      ]);
      const registeredMembers = memberRes.data.data;
      const companies = compRes.data.data;
      const types = memTypeRes.data.data;
      this.setState({ companies, registeredMembers, types }, () => {
        // this.props.showLoader(false);
      });
    } catch (error) {
      // this.props.showLoader(false);
    }
  };

  handleOnChange = (e, phone = false) => {
    if (phone) {
      const { name, value } = e;
      this.setState({
        [name]: value,
      });

      return;
    }

    const {
      target: { name, value },
    } = e;

    this.setState({
      [name]: value,
    });
  };

  handleOnClick = (action, data) => {
    switch (action) {
      case "view-profile":
        this.setState({ open: true, memberData: data });
        break;
      case "view-members":
        this.viewMembers(data);
        break;
      case "add-member":
        this.addMemberToCompany(data);
        break;
      case "remove-company":
        this.removeCompany(data);
        break;
      case "edit-detail":
        this.saveEditedCompanyDetail(data);
        break;
      default:
        return;
    }
  };

  removeCompany = async (data) => {
    const response = window.confirm(
      "You are about to remove a Company. This action is irreversible! Proceed with action?"
    );
    if (response) {
      try {
        this.props.showLoader(true);
        const authApi = await attachApiToken(api);
        await authApi.delete("/admin/corporate-member", {
          data: {
            company_id: data["company_id"],
          },
        });
        this.handleFireSnackbar("Removal Successful", "success");
        this.props.showLoader(false);
        this.getDataAtOnce();
      } catch (error) {
        this.props.showLoader(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          return this.handleFireSnackbar(error.response.data.message, "error");
        }
        this.handleFireSnackbar("some errors where encountered", "error");
      }
    }
  };

  addMemberToCompany = (data) => {
    try {
      this.setState({ data }, () => window.$("#modal2").modal("open"));
    } catch (error) {
      this.props.showLoader();

      this.handleFireSnackbar("some errors where encountered", "error");
    }
  };

  addMember = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phoneNumber } = this.state;
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      phoneNumber.trim() === ""
    ) {
      return this.handleFireSnackbar(
        "Incomplete details, please fill all required",
        "error"
      );
    }

    if (!emailRegx.test(email)) {
      return this.handleFireSnackbar("Email is incorrect", "error");
    }

    if (!phoneNumberRegx.test(phoneNumber)) {
      return this.handleFireSnackbar("Phone number is incorrect", "error");
    }

    if (phoneNumber.trim().length < 14) {
      return this.handleFireSnackbar("Phone number is incorrect", "error");
    }

    try {
      const token = localStorage.getItem("x-access-token");
      const data = this.state.data;
      this.props.showLoader(true);
      await Axios.post(
        "/api/v1/admin/corporate-member",
        {
          company_id: data.memberNumber,
          firstName,
          lastName,
          email,
          phoneNumber,
        },
        { headers: { "x-access-token": token } }
      );
      this.props.showLoader(false);
      this.setState(
        {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        },
        () => this.handleFireSnackbar("Operation successful", "success")
      );

      this.getDataAtOnce();
    } catch (error) {
      this.props.showLoader(false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return this.handleFireSnackbar(error.response.data.message, "error");
      }

      return this.handleFireSnackbar(
        "some errors were encountered, please contact admin",
        "error"
      );
    }
  };

  addCompany = async () => {
    try {
      const {
        company_name,
        email,
        phone_number,
        adminFirstName,
        adminLastName,
        adminEmail,
        adminPhoneNumber,
        companyCode: company_type,
      } = this.state;

      const addCompany = {
        company_name,
        phone_number,
        email,
        company_type,
        companyAdmin: {
          firstName: adminFirstName,
          lastName: adminLastName,
          emailAddress: adminEmail,
          phoneNumber: adminPhoneNumber,
        },
      };

      if (
        company_name.trim() === "" ||
        phone_number.trim() === "" ||
        email.trim() === "" ||
        adminEmail.trim() === "" ||
        adminPhoneNumber.trim() === "" ||
        adminFirstName.trim() === "" ||
        adminLastName.trim() === ""
      ) {
        return this.handleFireSnackbar(
          "Incomplete details, please fill all required",
          "error"
        );
      }
      if (
        !phoneNumberRegx.test(adminPhoneNumber) ||
        !phoneNumberRegx.test(phone_number)
      ) {
        return this.handleFireSnackbar("Phone Number is invalid", "error");
      }

      if (phone_number.length < 14 || adminPhoneNumber.length < 14) {
        return this.handleFireSnackbar("Phone Number is invalid", "error");
      }

      if (!emailRegx.test(email) || !emailRegx.test(adminEmail)) {
        return this.handleFireSnackbar("Email is invalid", "error");
      }

      this.props.showLoader(true);
      await createCompanyCall(addCompany);

      this.props.showLoader(false);
      this.setState(
        {
          company_name: "",
          company_address: "",
          firstName: "",
          lastName: "",
          email: "",
          phone_number: "",
          phoneNumber: "",
          adminFirstName: "",
          adminLastName: "",
          adminEmail: "",
          adminPhoneNumber: "",
        },
        () => {
          this.handleFireSnackbar("Operation successful", "success");
          this.getDataAtOnce();
        }
      );
    } catch (error) {
      this.props.showLoader(false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return this.handleFireSnackbar(error.response.data.message, "error");
      }

      this.handleFireSnackbar("some errors were encountered", "error");
    }
  };

  addIndividualMember = async (e) => {
    e.preventDefault();
    if (this.state.companyCode.trim() === "") {
      return this.handleFireSnackbar("please select company type", "error");
    }
    try {
      if (!this.state.codes.includes(this.state.companyCode)) {
        const { firstName, lastName, email, phoneNumber } = this.state;
        if (
          firstName.trim() === "" ||
          lastName.trim() === "" ||
          email.trim() === "" ||
          phoneNumber.trim() === ""
        ) {
          return this.handleFireSnackbar(
            "Incomplete details, please fill all required",
            "error"
          );
        }
        if (!phoneNumberRegx.test(phoneNumber)) {
          return this.handleFireSnackbar("Phone Number is invalid", "error");
        }
        if (!emailRegx.test(email)) {
          return this.handleFireSnackbar("Email is invalid", "error");
        }
        if (phoneNumber.length < 14) {
          return this.handleFireSnackbar("Phone Number is invalid", "error");
        }
        const token = localStorage.getItem("x-access-token");
        this.props.showLoader(true);
        await Axios.post(
          "/api/v1/admin/register-user",
          {
            firstName,
            lastName,
            email,
            membershipType: this.state.companyCode,
            phoneNumber,
          },
          { headers: { "x-access-token": token } }
        );
        this.props.showLoader(false);
        return this.setState(
          {
            company_name: "",
            company_address: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
          },
          () => this.handleFireSnackbar("Operation successful", "success")
        );
      }

      this.addCompany();
    } catch (error) {
      this.props.showLoader(false);
      if (error.response && error.response.data) {
        this.setState({
          openSnackbar: true,
          msg: error.response.data.message,
        });

        return;
        // alert(error.response.data.error);
      }

      return this.handleFireSnackbar(
        "some errors were encountered, please contact admin"
      );
    }
  };

  viewMembers = async (data) => {
    this.setState({ data });
    try {
      this.props.showLoader(true);
      const token = localStorage.getItem("x-access-token");
      const response = await Axios.get(
        `/api/v1/admin/company-members?company_id=${data.memberNumber}`,
        { headers: { "x-access-token": token } }
      );

      this.setState(
        {
          members: response.data.data,
        },
        () => window.$("#modal1").modal("open")
      );
      this.props.showLoader();
    } catch (error) {
      if (error.response) {
        this.handleFireSnackbar(error.response.data.error);
        return this.props.showLoader();
      }

      this.props.showLoader();
      return this.handleFireSnackbar(
        "some errors were encountered, please contact admin",
        "error"
      );
    }
  };
  handleOnClickMemberActions = (action, data) => {
    switch (action) {
      case "assign-position":
        break;

      case "suspend":
        this.suspendMember(data);
        break;
      case "view-profile":
        this.setState({ open: true, memberData: data });
        break;

      case "edit-member":
        this.editMember(data);
        break;

      case "remove":
        this.removeMemeber(data);
        break;

      default:
        break;
    }
  };
  removeMemeber = async (data) => {
    try {
      const onDelete = window.confirm("Are you sure?");
      if (onDelete) {
        this.props.showLoader(true);
        const authApi = await attachApiToken(api);
        await authApi.delete("/admin/remove", {
          data: {
            userId: data.member_id,
          },
        });

        this.props.showLoader();
        this.handleFireSnackbar("Operation successful", "success");
        this.getDataAtOnce();
      }
    } catch (error) {
      this.props.showLoader(false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return this.handleFireSnackbar(error.response.data.message, "error");
      }
      this.handleFireSnackbar("some errors were encountered", "error");
    }
  };
  suspendMember = async (data) => {
    try {
      const onApproved = window.confirm("Are you sure?");
      if (onApproved) {
        this.props.showLoader(true);
        const token = localStorage.getItem("x-access-token");
        await Axios.put(
          "/api/v1/admin/suspend",
          { userId: data.member_id },
          { headers: { "x-access-token": token } }
        );
        this.props.showLoader();
        this.handleFireSnackbar("Operation successful", "success");
      }
    } catch (error) {
      this.props.showLoader(false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return this.handleFireSnackbar(error.response.data.message, "error");
      }

      this.handleFireSnackbar("some errors were encountered", "error");
    }
  };

  handleEditUserOnchange = ({ target: { name, value } }) => {
    this.setState({
      userData: Object.assign({}, this.state.userData, {
        [name]: value,
      }),
    });
  };
  renderIndividualBlock = () => {
    const _members = this.state.registeredMembers || [];
    let _list = ["AM", "P", "LM"];
    let individualMembers = [];
    _members.forEach((item) => {
      if (_list.includes(item.membershipType)) {
        individualMembers.push(item);
      }
    });





    return (
      <div className="shadow rounded bg-white col-md-12 p-3 material">
        <MaterialTable

          detailPanel={[
            {
              tooltip: "More",
              render: (rowData) => {
                return (
                  <div
                    style={{
                      fontSize: 15,
                      color: "white",
                      backgroundColor: "#2A4B5A",
                      display: "flex",
                      flexDirection: "row",
                      padding: 10,
                      width: "fit-content"

                    }}
                  >
                    <SpanContainer>
                      <Item className="mr-1">Passport:</Item>
                      <Item>{rowData.passport}</Item>
                    </SpanContainer>

                    <SpanContainer>
                      <Item className="mr-1">Street:</Item>
                      <Item>{rowData.street1}</Item>
                    </SpanContainer>

                    <SpanContainer>
                      <Item className="mr-1">Industry Type:</Item>
                      <Item>{rowData.industry_type}</Item>
                    </SpanContainer>

                    <SpanContainer>
                      <Item className="mr-1">Industry Classification:</Item>
                      <Item>{rowData.industryClassification}</Item>
                    </SpanContainer>
                  </div>
                );
              },
            },
          ]}
          components={{
            Action: (props) => {
              if (props.action.icon === "save") {
                return (
                  <MemberActions
                    data={props.data}
                    onClick={this.handleOnClickMemberActions}
                  />
                );
              }
              return <button></button>;
            },
          }}

          title=""
          columns={
            //   [
            //   { title: "First Name", field: "firstName", defaultSort: "asc" },
            //   { title: "Last Name", field: "lastName" },
            //   { title: "Email", field: "emailAddress" },
            //   { title: "Member No", field: "memberNumber", defaultSort: "asc" },
            //   { title: "Member Type", field: "membershipType" },
            //   { title: "Phone Number", field: "phoneNumber" },
            //   { title: "Company", field: "company_name" },
            // ]
            I_M.map(keey => ({ title: neat(keey), field: keey }))
          }
          data={individualMembers}
          options={{
            // exportButton: true,
            exportAllData: true,
            pageSizeOptions: pageSizeOptions,
            sorting: true,
            headerStyle: {
              background: "#FA6400",
              color: "#FFF",
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: "bold",
              zIndex: 1,
            },
            searchFieldStyle: {},
            actionsColumnIndex: -1,
          }}

          actions={[
            {
              icon: "save",
              tooltip: "Save User",
              onClick: (event, rowData) => { },
            },
          ]}
        />
      </div>
    );
  };

  renderCorporateMemberBlock = () => {
    const _members = this.state.registeredMembers || [];
    const comp = this.state.companies || [];

    let _list = ["AM", "P", "LM"];
    let individualMembers = [];
    _members.forEach((item) => {
      if (!_list.includes(item.membershipType)) {
        individualMembers.push(item);
      }
    });

    comp.forEach((item) => {
      individualMembers.forEach((member) => {
        if (item.memberNumber === member.company_id) {
          member.company_name = item.company_name;
        }
      });
    });

    return (
      <div className="shadow rounded bg-white col-md-12 p-3 material">
        <MaterialTable
          detailPanel={[
            {
              tooltip: "More",

              render: (rowData) => {
                return (
                  <div
                    style={{
                      fontSize: 15,
                      color: "white",
                      backgroundColor: "#2A4B5A",
                      display: "flex",
                      flexDirection: "row",
                      padding: 10,
                    }}
                  >
                    <SpanContainer>
                      <Item className="mr-1">Passport:</Item>
                      <Item>{rowData.passport}</Item>
                    </SpanContainer>

                    <SpanContainer>
                      <Item className="mr-1">Street:</Item>
                      <Item>{rowData.street1}</Item>
                    </SpanContainer>

                    <SpanContainer>
                      <Item className="mr-1">Industry Type:</Item>
                      <Item>{rowData.industry_type}</Item>
                    </SpanContainer>

                    <SpanContainer>
                      <Item className="mr-1">Industry Classification:</Item>
                      <Item>{rowData.industryClassification}</Item>
                    </SpanContainer>
                  </div>
                );
              },
            },
          ]}
          components={{
            Action: (props) => {
              if (props.action.icon === "save") {
                return (
                  <MemberActions
                    data={props.data}
                    onClick={this.handleOnClickMemberActions}
                  />
                );
              }
              return <button></button>;
            },

          }}


          title=""
          columns={
            //   [
            //   { title: "First Name", field: "firstName", defaultSort: "asc" },
            //   { title: "Last Name", field: "lastName" },
            //   { title: "Email", field: "emailAddress" },
            //   { title: "Member No", field: "memberNumber", defaultSort: "asc" },
            //   { title: "Member Type", field: "membershipType" },
            //   { title: "Phone Number", field: "phoneNumber" },
            //   {
            //     title: "Company",
            //     field: "company_name",
            //   },
            // ]

            O_M.map(keey => ({ title: neat(keey), field: keey }))

          }
          data={individualMembers}
          options={{
            // exportButton: true,
            exportAllData: true,
            sorting: true,
            pageSizeOptions: pageSizeOptions,
            headerStyle: {
              background: "#FA6400",
              color: "#FFF",
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: "bold",
              zIndex: 1,
            },
            searchFieldStyle: {},
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: "save",
              tooltip: "Save User",
              onClick: (event, rowData) => { },
            },
          ]}
        />
      </div>
    );
  };

  renderAllMembersBlock = () => {
    const _members = this.state.registeredMembers || [];
    const comp = this.state.companies || [];
    comp.forEach((item) => {
      _members.forEach((member) => {
        if (item.memberNumber == member.company_id) {
          member.company_name = item.company_name;
        }
      });
    });

    return (


      <div className="shadow rounded bg-white col-md-12 p-3 material">
        <MaterialTable
          detailPanel={[
            {
              tooltip: "More",
              render: (rowData) => {
                return (
                  <div
                    style={{
                      fontSize: 15,
                      color: "white",
                      backgroundColor: "#2A4B5A",
                      display: "flex",
                      flexDirection: "row",
                      padding: 10,
                      maxWidth: '100%'
                    }}
                  >
                    <SpanContainer>
                      <Item className="mr-1">Passport:</Item>
                      <Item>{rowData.passport}</Item>
                    </SpanContainer>

                    <SpanContainer>
                      <Item className="mr-1">Street:</Item>
                      <Item>{rowData.street1}</Item>
                    </SpanContainer>

                    <SpanContainer>
                      <Item className="mr-1">Industry Type:</Item>
                      <Item>{rowData.industry_type}</Item>
                    </SpanContainer>

                    <SpanContainer>
                      <Item className="mr-1">Industry Classification:</Item>
                      <Item>{rowData.industryClassification}</Item>
                    </SpanContainer>
                  </div>
                );
              },
            },
          ]}
          components={{
            Action: (props) => {
              if (props.action.icon === "save") {
                return (
                  <MemberActions
                    data={props.data}
                    onClick={this.handleOnClickMemberActions}
                  />
                );
              }
              return <button></button>;
            },
          }}
          title=""
          columns={
            //   [
            //   { title: "First Name", field: "firstName", defaultSort: "asc" },
            //   { title: "Last Name", field: "lastName" },
            //   { title: "Email", field: "emailAddress" },
            //   { title: "Member No", field: "memberNumber", defaultSort: "asc" },
            //   { title: "Member Type", field: "membershipType" },
            //   { title: "Phone Number", field: "phoneNumber" },
            //   { title: "Company", field: "company_name" },
            // ]
            A_M.map(keey => ({ title: neat(keey), field: keey }))
          }
          data={_members}

          options={{
            // exportButton: true,
            exportAllData: true,
            pageSizeOptions: pageSizeOptions,
            sorting: true,
            headerStyle: {
              background: "#FA6400",
              color: "#FFF",
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: "bold",
              zIndex: 1,
            },
            searchFieldStyle: {},
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: "save",
              tooltip: "Save User",
              onClick: (event, rowData) => { },
            },
          ]}
        />
      </div>
    );
  };

  openAddMemberModal = async (e) => {
    try {
      window.$("#modal7").modal("open");
    } catch (error) { }
  };

  handleFireSnackbar = (msg, type = "default") => {
    this.setState({
      msg,
      openSnackbar: true,
      type,
    });
  };

  saveEditedCompanyDetail = async (data) => {
    this.setState({ editCompany: true, companyData: data }, () => {
      window.$("#modal3").modal("open");
    });
  };
  render() {
    let { role } = this.props
    role = role === "super-user"

    const ref = React.createRef();
    const refo = React.createRef();


    let { open, fullWidth, maxWidth } = this.state
    let { handleClickOpen, handleClose, handleMaxWidthChange } = this

    return (
      <>
        <Dashboard clas={"new_bg"}>
          <AppWrapper
            open={this.state.openSnackbar}
            onClose={() => {
              this.setState({
                openSnackbar: false,
              });
            }}
            message={this.state.msg}
            type={this.state.type}
          >
            <div className="container-fluid px-0 mx-0" style={{ maxWidth: "100%", overflow: "hidden" }}>
              <div className="d-flex justify-content-end mb-3">
                <button
                  onClick={this.openAddMemberModal}
                  class="waves-effect waves-light btn"
                >
                  Add Member
              </button>

                <div className="border px-2 dowlud z-depth-1 white "
                  onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
                />
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={() => this.setState({ anchorEl: null })}
                >

                  <MenuItem onClick={() => this.setState({ anchorEl: null })}>
                    <span className="small">
                      <CSVLink data={this.state.companies}
                        headers={
                          this.state.currentTab === "organisation" || this.state.currentTab === "corporate" ?
                            O_M.map(data => ({ label: neat(data), key: data })) :
                            I_M.map(data => ({ label: neat(data), key: data }))
                        } >
                        All Companies CSV
                      </CSVLink>
                    </span>
                  </MenuItem>

                  <MenuItem onClick={() => this.setState({ anchorEl: null })}>
                    <span className="small">
                      <CSVLink data={this.state.registeredMembers}
                        headers={
                          this.state.currentTab === "organisation" || this.state.currentTab === "corporate" ?
                            O_M.map(data => ({ label: neat(data), key: data })) :
                            I_M.map(data => ({ label: neat(data), key: data }))
                        } >

                        All Members CSV

                      </CSVLink>
                    </span>
                  </MenuItem>
                  <MenuItem onClick={() => this.setState({ anchorEl: null })} style={{ fontSize: "12" }}>
                    {this.state.pdf_load === false && this.state.memberPDF.length > 0 &&
                      <>
                        <div>
                          <ProfileModal2 title="All Companies PDF" dat={this.state.pdf_load === true ? [] : this.state.memberPDF} />
                        </div>
                      </>
                    }
                  </MenuItem>
                  <MenuItem onClick={() => this.setState({ anchorEl: null })} style={{ fontSize: "12" }}>
                    {this.state.pdf_load === false && this.state.corporatePDF.length > 0 &&
                      <>
                        <div>
                          <ProfileModal2 title="All Members PDF" dat={this.state.pdf_load === true ? [] : this.state.corporatePDF} />
                        </div>
                      </>
                    }
                  </MenuItem>
                </Menu>




              </div>
              <div className="row mt-5">
                <div className="shadow rounded bg-white col-md-12 px-3 py-1">
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      onClick={() => this.setState({ currentTab: "individual" })}
                      style={{ position: "relative" }}
                    >
                      <h4
                        className={`member-type-header ${
                          this.state.currentTab === "individual" ? "active" : ""
                          }`}
                      >
                        Individual Members
                    </h4>
                    </div>

                    <div
                      onClick={() => this.setState({ currentTab: "corporate" })}
                      style={{ position: "relative" }}
                    >
                      <h4
                        className={`member-type-header ${
                          this.state.currentTab === "corporate" ? "active" : ""
                          }`}
                      >
                        Corporate Members
                    </h4>
                    </div>

                    <div
                      onClick={() => this.setState({ currentTab: "all" })}
                      style={{ position: "relative" }}
                    >
                      <h4
                        className={`member-type-header ${
                          this.state.currentTab === "all" ? "active" : ""
                          }`}
                      >
                        All Members
                    </h4>
                    </div>

                    <div
                      onClick={() =>
                        this.setState({ currentTab: "organisation" })
                      }
                      style={{ position: "relative" }}
                    >
                      <h4
                        className={`member-type-header mx-2 ${
                          this.state.currentTab === "organisation" ? "active" : ""
                          }`}
                      >
                        Organisation
                    </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4" style={{ overflow: "scroll" }}>
                {this.state.currentTab === "corporate" &&
                  this.renderCorporateMemberBlock()}

                {this.state.currentTab === "individual" &&
                  this.renderIndividualBlock()}

                {this.state.currentTab === "all" && this.renderAllMembersBlock()}

                {this.state.currentTab === "organisation" && (
                  <div className="shadow rounded bg-white col-md-12 p-3">
                    <MaterialTable

                      components={{
                        Action: (props) => {
                          if (props.action.icon === "save") {
                            return (
                              <TableAction
                                data={props.data}
                                onClick={this.handleOnClick}
                              />
                            );
                          }
                          return <button></button>;
                        },
                      }}
                      title=""

                      columns={
                        // [
                        //   {
                        //     title: "Name",
                        //     field: "company_name",
                        //     defaultSort: "asc",
                        //   },
                        //   { title: "Email", field: "email" },

                        //   {
                        //     title: "Member No",
                        //     field: "memberNumber",
                        //     defaultSort: "asc",
                        //   },
                        //   { title: "Member Type", field: "company_type" },
                        //   { title: "Phone Number", field: "phone_number" },
                        // ]
                        O_M.map(keey => ({ title: neat(keey), field: keey }))
                      }
                      data={this.state.companies}
                      // onRowClick={(event, memberData) => {
                      //   this.setState({
                      //     open: true,
                      //     memberData
                      //   })
                      // }}
                      options={{
                        pageSizeOptions: [20, 50, 100, 200],
                        // exportButton: true,
                        exportAllData: true,
                        sorting: true,
                        headerStyle: {
                          background: "#FA6400",
                          color: "#FFF",
                          fontFamily: '"Open Sans", sans-serif',
                          fontWeight: "bold",
                          zIndex: 1,
                        },
                        searchFieldStyle: {},
                        actionsColumnIndex: -1,
                      }}
                      actions={[
                        {
                          icon: "save",
                          tooltip: "Save User",
                          onClick: (event, rowData) => {
                            // Do save operation
                          },
                        },
                      ]}
                    />
                  </div>
                )}
              </div>

              <div id="modal1" class="modal modal-fixed-footer">
                <div class="modal-content">
                  <h4>{this.state.data.company_name + " Members"}</h4>
                  <div className="container-fluid px-0   mt-3">
                    {this.state.members.map((item) => (
                      <div className="row shadow bg-white rounded p-2"

                      >



                        <div className="col-md-12"
                          onClick={() => {
                            this.setState({
                              open: true
                            })
                          }}>
                          <div className="row " style={{ marginBottom: 8 }}>
                            <div className="col-md-8">
                              <h5>{`${item.firstName} ${item.lastName}`}</h5>
                            </div>
                            <div className="col-md-4">
                              <h5 className="text-primary">{`#${item.memberNumber}`}</h5>
                            </div>
                          </div>
                          <div className="row " style={{ marginBottom: 8 }}>
                            <div className="col-md-12">
                              <span>
                                Email :
                              <span
                                  style={{ fontWeight: "bold", fontSize: "16px" }}
                                >
                                  {" "}
                                  {`${item.emailAddress}`}
                                </span>
                              </span>
                            </div>
                          </div>

                          <div className="row " style={{ marginBottom: 8 }}>
                            <div className="col-md-12">
                              <span>Phone number :</span>

                              <span
                                style={{ fontWeight: "bold", fontSize: "16px" }}
                              >
                                {" "}
                                {`${item.phoneNumber || " "}`}
                              </span>
                            </div>
                          </div>
                          <div className="row " style={{ marginBottom: 8 }}>
                            <div className="col-md-12">
                              <span>Position :</span>

                              <span
                                style={{ fontWeight: "bold", fontSize: "16px" }}
                              >{`${item.position || " Member"}`}</span>
                            </div>
                          </div>

                          <div className="row " style={{ marginBottom: 8 }}>
                            <div className="col-md-12">
                              <span>
                                {`Role:`}
                                <span
                                  className="mx-1"
                                  style={{ fontWeight: "bold", fontSize: "16px" }}
                                >
                                  {roleSanitizer(item.role)}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="row " style={{ marginBottom: 8 }}>
                            <div className="col-md-12 d-flex justify-content-end">
                              <UserAction
                                data={item}
                                onClick={this.perfromUserAction}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div class="modal-footer">
                  <a
                    href="#!"
                    class="modal-close  waves-effect waves-green btn-info btn"
                  >
                    Close
                </a>
                </div>
              </div>

              <div id="modal2" class="modal modal-fixed-footer">
                <div class="modal-content">
                  <h4>{"Add members to " + this.state.data.company_name}</h4>
                  <div className="container-fluid px-0   mt-3">
                    <div className="row">
                      <TextInput
                        name={"firstName"}
                        placeholder="First Name"
                        onChange={this.handleOnChange}
                        value={this.state.firstName}
                      />
                    </div>
                    <div className="row">
                      <TextInput
                        name={"lastName"}
                        placeholder="Last Name"
                        onChange={this.handleOnChange}
                        value={this.state.lastName}
                      />
                    </div>
                    <div className="row">
                      <TextInput
                        name={"email"}
                        placeholder="Email Addresss"
                        onChange={this.handleOnChange}
                        value={this.state.email}
                      />
                    </div>
                    <div className="row">
                      <PhoneNumber
                        name={"phoneNumber"}
                        placeholder="Phone Number"
                        onChange={this.handleOnChange}
                        value={this.state.phoneNumber}
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <a
                    href="#!"
                    class="modal-close  waves-effect waves-green btn-flat"
                  >
                    Close
                </a>
                  <button
                    onClick={this.addMember}
                    className="waves-effect waves-green btn-primary btn"
                  >
                    Add
                </button>
                </div>
              </div>
              <div id="modal3" class="modal modal-fixed-footer">
                <EditOrganization
                  data={this.state.companyData}
                  onClose={() => {
                    this.setState({
                      editCompany: false,
                    });
                  }}
                />
              </div>

              <div id="modal7" class="modal modal-fixed-footer">
                <>
                  <div class="modal-content">
                    <h4>{"Add members"}</h4>
                    <div className="container-fluid px-0   mt-3">
                      <div className="row input-field">
                        <select name="companyCode" onChange={this.handleOnChange}>
                          <option>Select membership type</option>

                          {this.state.types.map((ele) => (
                            <option value={ele.code}>{ele.name}</option>
                          ))}
                        </select>
                      </div>
                      {!this.state.codes.includes(this.state.companyCode) ? (
                        <>
                          <div className="row">
                            <TextInput
                              name={"firstName"}
                              placeholder="First Name"
                              onChange={this.handleOnChange}
                              value={this.state.firstName}
                            />
                          </div>
                          <div className="row">
                            <TextInput
                              name={"lastName"}
                              placeholder="Last Name"
                              onChange={this.handleOnChange}
                              value={this.state.lastName}
                            />
                          </div>
                          <div className="row">
                            <TextInput
                              name={"email"}
                              placeholder="Email Addresss"
                              onChange={this.handleOnChange}
                              value={this.state.email}
                            />
                          </div>
                          <div className="row">
                            <PhoneNumber
                              name={"phoneNumber"}
                              placeholder="Phone Number"
                              onChange={this.handleOnChange}
                              value={this.state.phoneNumber}
                            />
                          </div>
                        </>
                      ) : null}
                      {this.state.codes.includes(this.state.companyCode) ? (
                        <>
                          <div className="row">
                            <TextInput
                              name={"company_name"}
                              placeholder="Company Name"
                              onChange={this.handleOnChange}
                              value={this.state.company_name}
                            />
                          </div>
                          <div className="row">
                            <TextInput
                              name={"email"}
                              placeholder="Email"
                              onChange={this.handleOnChange}
                              value={this.state.email}
                            />
                          </div>
                          <div className="row">
                            <PhoneNumber
                              name={"phone_number"}
                              placeholder="Phone Number"
                              onChange={this.handleOnChange}
                              value={this.state.phone_number}
                            />
                            {/* <TextInput
                        name={"phone_number"}
                        placeholder="Phone Number"
                        onChange={this.handleOnChange}
                        value={this.state.phone_number}
                      /> */}
                            {/* <span>format: 2348070706069</span> */}
                          </div>
                          <div className="row">
                            <TextInput
                              name={"adminFirstName"}
                              placeholder="Company Admin First Name"
                              onChange={this.handleOnChange}
                              value={this.state.adminFirstName}
                            />
                          </div>
                          <div className="row">
                            <TextInput
                              name={"adminLastName"}
                              placeholder="Company Admin Last Name"
                              onChange={this.handleOnChange}
                              value={this.state.adminLastName}
                            />
                          </div>
                          <div className="row">
                            <TextInput
                              name={"adminEmail"}
                              placeholder="Company Admin Email Addresss"
                              onChange={this.handleOnChange}
                              value={this.state.adminEmail}
                            />
                          </div>
                          <div className="row">
                            <PhoneNumber
                              name={"adminPhoneNumber"}
                              placeholder="Company Admin Phone Number"
                              onChange={this.handleOnChange}
                              value={this.state.adminPhoneNumber}
                            />
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a
                      href="#!"
                      class="modal-close  waves-effect waves-green btn-flat"
                    >
                      Close
                  </a>
                    <button
                      onClick={this.addIndividualMember}
                      className="waves-effect waves-green btn-primary btn"
                    >
                      Add
                  </button>
                  </div>
                </>
              </div>
              <div id="modal6" class="modal modal-fixed-footer">
                <EditMember
                  getAll={this.getDataAtOnce}
                  data={this.state.userData}
                />
              </div>
            </div>
          </AppWrapper>
        </Dashboard >

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={this.state.open}
          onClose={() => this.setState({
            open: false
          })}
          aria-labelledby="max-width-dialog-title"
          ref={ref}
        >

          <div
          >
            <ProfileModal
              data={this.state.memberData}
            />
          </div>

          <DialogActions>
            <ReactToPdf targetRef={ref} filename="profile.pdf" x={1.5} y={1.5} scale={0.8}>
              {({ toPdf }) => (
                <Button onClick={toPdf}>Generate pdf</Button>
              )}
            </ReactToPdf>
            <Button onClick={handleClose} color="primary">
              Close
          </Button>

          </DialogActions>
        </Dialog>

        {/* <div className="hiiisf">
          <div ref={refo}>
            {this.state.currentTab === "organisation" ?
              this.state.companies.map(soa =>
                <ProfileModal
                  data={soa} />
              )

              :
              this.state.registeredMembers.map(soa =>
                <ProfileModal
                  data={soa}
                />
              )}
          </div>
        </div> */}
      </>
    );
  }
}


const mapStateToProps = state => ({
  role: state.user.currentUser.role
})

export default connect(mapStateToProps, actions)(Members);

const SpanContainer = styled.div`
              border: 1px solid orage;
              display: flex;
              margin: 5px 5px;
            `;

const Item = styled.p`
              font-weight: bold;
              text-transform: capitalize;
            `;






{/*
import React, { Component } from 'react'
import { PDFDownloadLink, Document, View, Page, Text, StyleSheet, Image } from "@react-pdf/renderer";



const style = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row"
  },
  view: {
    marginBottom: 10
  },
  text: {
    paddingHorizontal: "3px",
    paddingVertical: 3,
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 12
  },

  ve: {
    marginBottom: "4"
  },
  size: {
    width: "100%"
    // width: "fitContent",
    // maxWidth: "fit-content",
  }

})


export const headers = [
  { label: "Event ID", key: "event_id" },
  { label: "Event Name", key: "event_name" },
  { label: "Event Details", key: "event_details" },
  { label: "Event Date", key: "event_date" },
  { label: "Event Time", key: "event_time" },
  { label: "Set Reminder", key: "set_reminder" },
  { label: "Reminder", key: "reminder" },
  { label: "Status", key: "status" },
  { label: "Banner Image", key: "banner_image" }
]


export const Melo = ({ data }) =>
  <PDFDownloadLink
    document={
      <Document>
        <Page size="A3" style={style.size}>
          <View style={style.view}>
            <View style={style.flex}>
              {headers.map((data) =>
                <Text break style={style.text}>
                  {data.label}
                </Text>
              )}
            </View>
            <View style={style.ve}>
              {data.map((data) =>
                <View style={style.flex}>
                  {Object.values(data).map((data) =>
                    <Text break style={style.text}>
                      {data}
                    </Text>
                  )}
                </View>
              )}
            </View>
            <View>
              <Text break>
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    }>
    PDF
  </PDFDownloadLink >


export const neat = (data) => {
  let first = data.replace("_", " ")

  let sec = Array.from(first)
  let third = []
  let i
  for (i in sec) {
    if (Number(i) > 0 && Number(i) < (sec.length - 1) && sec[Number(i)] === sec[Number(i)].toUpperCase()) {

      third.push(" ")
    }
    third.push(sec[i])
  }
  return third.join("").toString()
}


const s = StyleSheet.create({
  deds: {
    padding: "10",
    width: "100%"

  },
  sstt: {
    paddingVertical: "6",
    fontWeight: "light",
    marginBottom: "30",
    width: "100%"
  },
  picpack: {
    borderStyle: "solid",
    borderWidth: "1",
    paddingTop: "10"
  },
  picto: {
    marginHorizontal: "auto",
    borderRadius: "50%",
    height: "120",
    width: "120",
    borderWidth: "10px",
    borderColor: "white",
    borderStyle: "solid"
  },
  the_name: {
    fontSize: "16",
    marginTop: "60",
    fontWeight: "bold"
  },
  osaml: {
    fontWeight: "light",
    fontSize: "12"
  },
  adfe: {
    borderRadius: "5",
    border: "1 solid",
    marginVertical: "auto",
    width: "100%",
    marginTop: "30"
  },
  packa: {
    display: "flex",
    marginHorizontal: "auto",
    width: "97%",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    textAlign: "center"
  },
  packaa: {
    paddingRight: "10",
    // paddingVertical: "",
    fontSize: "15",
    width: "50%",
    maxWidth: "50%",
    fontWeight: "bold",
    textAlign: "right",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    textOverflow: "ellipsis"
  },

  packab: {
    paddingLeft: "10",
    // paddingVertical: "6",
    fontSize: "15",
    width: "50%",
    maxWidth: "50%",
    fontWeight: "bold",
    textAlign: "left",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    textOverflow: "ellipsis"
  }
})



export const ProfileModal2 = ({ dat, title }) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A3">
            {dat.map(data =>
              <View style={s.deds}>
                <View style={s.sstt}>
                  <View style={s.picpack}>
                    <View style={s.picto}>
                      <Image source={{ uri: data.logo || data.avatar || "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png" }} />
                    </View>
                  </View>

                  <View style={s.the_name}>
                    <Text>
                      {data.firstName} {data.lastName}
                    </Text>
                    <View>
                      <Text>
                        {data.company_name}
                      </Text>
                    </View>
                  </View>
                  <View style={s.adfe}>
                    {Object.entries(data).filter(dat => (dat[0] !== "tableData") &&
                      (dat[0] !== "company_name") &&
                      (dat[0] !== "firstName") && (dat[0] !== "lastName") &&
                      (dat[0] !== "logo") && (dat[0] !== "memberId") &&
                      (dat[0] !== "member_id") &&
                      (
                        dat[0] !== "password") && (dat[0] !== "default_password"
                      ) && (dat[0] !== "companyId") && (dat[0] !== "company_id") &&
                      (dat[0] !== "avatar")).map(dat =>
                        <View style={s.packa}>
                          <View style={s.packaa}>
                            <Text>
                              {`${neat(dat[0])}`}
                            </Text>
                          </View>
                          <View style={s.packab}>
                            <Text>
                              {`${dat[1] || "_____________________"}`}
                            </Text>
                          </View>
                        </View>
                      )
                    }
                  </View>

                </View>
              </View>
            )}
          </Page>
        </Document >
      }>
      {({ blob, url, loading, error }) => (loading ? 'Loading..' : title)}
    </PDFDownloadLink >
  )
}*/}