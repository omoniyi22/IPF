import MaterialTable from "material-table";
import React, { Component } from "react";
import { connect } from "react-redux";
import MemberActions from "../components/member-actions";
import Dashboard from "../hoc/Dashboard";
import * as actions from "../redux/actions";
import { getMembers, getPositionCall, assignPosition } from "../services";

class Designation extends Component {
  state = {
    currentTab: "organisation",
    companies: [],
    registeredMembers: [],
    data: {},
    members: [],
    firstName: "",
    lastName: "",
    name: "",
    positions: [],
  };
  async componentDidMount() {
    //initialize materialize modal
    window.$(".modal").modal();
    this.getMembers();
  }

  async openDesignation(data) {
    try {
      this.setState({
        name: data.firstName + " " + data.lastName,
        data,
      });
      this.openModal();
    } catch (error) {
      console.log(error, "Assign error");
      alert("Try again");
    }
  }

  getMembers = async () => {
    try {
      const membersReq = getMembers();
      const positionsReq = getPositionCall();
      const [memberRes, positionRes] = await Promise.all([
        membersReq,
        positionsReq,
      ]);
      const registeredMembers = memberRes.data.data;
      const positions = positionRes.data.data;

      this.setState({ registeredMembers, positions });
    } catch (error) {
      console.error(error);
    }
  };

  handleOnChange = (e) => {
    const {
      target: { name, value },
    } = e;
    this.setState({
      [name]: value,
    });
  };

  assignDesignation = async () => {
    try {
      const data = {
        userId: this.state.data.member_id,
        position: this.state.designation,
      };
      await assignPosition(data);
      alert("SUccessfully");
      this.getMembers();
    } catch (error) {
      console.log(error.response);
      alert("Error");
    }
  };

  removeDesignation = async (data) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to carry out this action?"
      );

      if (!confirm) return;
      data = {
        userId: data.member_id,
        position: null,
      };
      await assignPosition(data);
      this.getMembers();
      alert("SUccessfully");
    } catch (error) {
      console.log(error.response);
      alert("Error");
    }
  };
  clickActions = (action, data) => {
    switch (action) {
      case "assign-position":
        this.openDesignation(data);
        break;

      case "remove":
        this.removeDesignation(data);
        break;
      default:
        break;
    }
  };

  renderIndividualBlock = () => (
    <div className="shadow rounded bg-white col-md-12 p-3">
      <MaterialTable
        components={{
          Action: (props) => {
            return (
              <MemberActions
                data={props.data}
                type="designation"
                onClick={this.clickActions}
              />
            );
          },
        }}
        title=""
        columns={[
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Member No", field: "memberNumber" },
          {
            title: "Position",
            field: "position",
            render: (rowdata) => {
              return <span>{rowdata.position || "N/A"}</span>;
            },
          },
        ]}
        data={this.state.registeredMembers}
        options={{
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
  );

  openModal = async (e) => {
    try {
      window.$("#modal2").modal("open");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { positions } = this.state;
    return (
      <Dashboard>
        <div className="container-fluid" style={{ width: "90%" }}>
          <div className="row mt-5">
            <div className="shadow rounded bg-white col-md-12 px-3 py-1">
              <div className="d-flex justify-content-center align-items-center">
                <div
                  onClick={() => this.setState({ currentTab: "individual" })}
                  style={{ position: "relative" }}
                >
                  <h4 className={`member-type-header mx-2`}>
                    Manage Designations
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">{this.renderIndividualBlock()}</div>

          <div id="modal2" class="modal modal-fixed-footer">
            <div class="modal-content">
              <h4>{"Assign " + this.state.name}</h4>
              <div className="container-fluid mt-3">
                <div className="row">
                  <select name="designation" onChange={this.handleOnChange}>
                    <option>Select Designation</option>
                    {positions.map((ele) => (
                      <option key={ele.id} value={ele.name}>
                        {ele.name}
                      </option>
                    ))}
                  </select>
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
                onClick={this.assignDesignation}
                className="waves-effect waves-green btn-primary btn"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </Dashboard>
    );
  }
}

export default connect(null, actions)(Designation);
