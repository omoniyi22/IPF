import React, { useEffect } from "react";
import MaterialTable from "material-table";
import Dashboard from "../hoc/Dashboard";
import { api, attachApiToken } from "../services/api";
import { addPlatformAdmin, removeMemberPlatformAdmin } from "../services";
import AppWrapper from "../components/appWrapper";

const memberColumn = [
  {
    title: "First Name",
    field: "firstName",
    render: (rowData) => (
      <span>
        {rowData.firstName} {rowData.lastName}
      </span>
    ),
    // editable: "never",
  },
  {
    title: "Email",
    field: "emailAddress",
  },

  {
    title: "Membership No",
    field: "memberNumber",
  },
  {
    title: "Phone No",
    field: "phoneNumber",
  },

  {
    title: "Designation",
    field: "role",
  },
];

const AdminTable = ({ title, columns, data, add, remove }) => {
  const [state, setState] = React.useState({
    columns,
    data,
  });

  useEffect(() => {
    setState({
      ...state,
      data,
      columns,
    });
  }, [data]);

  return (
    <MaterialTable
      title={title}
      columns={state.columns}
      data={state.data}
      options={{
        headerStyle: {
          background: "#FA6400",
          color: "#FFF",
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: "bold",
          zIndex: 1,
        },
        searchFieldStyle: {},
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
              // Add Herea
              add(newData);
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
              remove(oldData);
            }, 600);
          }),
      }}
    />
  );
};

function PlatformAdmin() {
  const [memberState, setMember] = React.useState([]);

  const [snackbar, setSnack] = React.useState({
    msg: "",
    type: "default",
    open: false,
  });

  const initiateMember = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/admin/get-members");
        setMember(response.data.data);
      } catch (error) {}
    };
    getUser();
  }, [setMember]);

  useEffect(() => {
    initiateMember();
  }, [initiateMember]);

  async function addMemberType(data) {
    try {
      await addPlatformAdmin(data);
      firesnackbar("Remove successfully", "success");
    } catch (error) {
      let _error = "Unsuccessful, Try again";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        _error = error.response.data.message;
      }
      firesnackbar(_error, "error");
    }
  }

  async function removeMemberType(data) {
    try {
      await removeMemberPlatformAdmin(data);
      firesnackbar("Remove successfully", "success");
    } catch (error) {
      let _error = "Unsuccessful, Try again";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        _error = error.response.data.message;
      }
      firesnackbar(_error, "error");
    }
  }

  const admins = memberState.filter((item) => item.isAdmin === 1);
  function onClose() {
    setSnack({
      ...snackbar,
      open: false,
    });
  }

  function firesnackbar(msg, type) {
    setSnack({
      ...snackbar,
      open: true,
      msg,
      type,
    });
  }

  return (
    <Dashboard>
      <AppWrapper
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.msg}
        onClose={onClose}
      >
        <div className="container" style={{ width: "90%" }}>
          <div className="row">
            <div className="col-md-12">
              <h5 className="mt-3" style={{ color: "#089242" }}>
                Platform Admins
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12" style={{ minHeight: "60vh" }}>
              <AdminTable
                title={""}
                columns={memberColumn}
                data={admins}
                add={addMemberType}
                remove={removeMemberType}
              />
            </div>
          </div>
        </div>
      </AppWrapper>
    </Dashboard>
  );
}

export default PlatformAdmin;
