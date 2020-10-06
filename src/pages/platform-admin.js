import React, { useEffect, useState, useCallback } from "react";
import MaterialTable from "material-table";
import Dashboard from "../hoc/Dashboard";
import { api, attachApiToken } from "../services/api";
import { addPlatformAdmin, removeMemberPlatformAdmin } from "../services";
import AppWrapper from "../components/appWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";

const memberColumn = [
  {
    title: "Name",
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

  const removeUserAsPlatformAdmin = (event, rowData) => {
    remove(rowData);
  };

  const makeUserAsPlatformAdmin = (event, rowData) => {
    add(rowData);
  };

  return (
    <MaterialTable
      actions={[
        {
          icon: add ? "add" : "delete",
          tooltip: add ? "Make platform admin " : "Remove as platform admin",
          onClick: add ? makeUserAsPlatformAdmin : removeUserAsPlatformAdmin,
        },
      ]}
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
    />
  );
};

function PlatformAdmin() {
  const [memberState, setMember] = useState([]);
  const [active, setActive] = useState(0);
  const [snackbar, setSnack] = useState({
    msg: "",
    type: "default",
    open: false,
  });
  const dispatch = useDispatch();
  const initiateMember = useCallback(() => {
    getUser();
  }, [setMember]);

  const getUser = async () => {
    try {
      const authApi = await attachApiToken(api);
      const response = await authApi.get("/admin/get-members");
      setMember(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    initiateMember();
  }, [initiateMember]);

  async function addMemberType(data) {
    const confirm = window.confirm("Add member as Platform Admin?");
    if (!confirm) return;

    try {
      dispatch(actions.showLoader(true));
      await addPlatformAdmin(data);
      firesnackbar("Successfully made member platform admin", "success");
      dispatch(actions.showLoader(false));
      getUser();
    } catch (error) {
      dispatch(actions.showLoader(false));
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
    const confirm = window.confirm("Remove member as Platform Admin?");
    if (!confirm) return;
    try {
      dispatch(actions.showLoader(true));
      await removeMemberPlatformAdmin(data);
      firesnackbar("Successfully removed member as Platform Admin", "success");
      dispatch(actions.showLoader(false));
      getUser();
    } catch (error) {
      dispatch(actions.showLoader(false));
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

  const TabView = () => {
    return (
      <div className="row mt-5">
        <div className="shadow rounded bg-white col-md-12 px-3 py-1">
          <div className="d-flex justify-content-center align-items-center">
            <div style={{ position: "relative" }} onClick={() => setActive(0)}>
              <h4 className={`member-type-header ${!active && "active"}`}>
                Platform Admins
              </h4>
            </div>
            <div style={{ position: "relative" }} onClick={() => setActive(1)}>
              <h4 className={`member-type-header ${active && "active"}`}>
                All Members
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AllMembersView = () => {
    return (
      <div className="row">
        <div className="col-md-12" style={{ minHeight: "60vh" }}>
          <AdminTable
            title={""}
            columns={memberColumn}
            data={memberState}
            add={addMemberType}
          />
        </div>
      </div>
    );
  };

  const PlatformAdminsView = () => {
    return (
      <div className="row">
        <div className="col-md-12" style={{ minHeight: "60vh" }}>
          <AdminTable
            title={""}
            columns={memberColumn}
            data={admins}
            remove={removeMemberType}
          />
        </div>
      </div>
    );
  };

  return (
    <Dashboard>
      <AppWrapper
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.msg}
        onClose={onClose}
      >
        <TabView />
        <div className="container" style={{ width: "90%" }}>
          <div className="row">
            <div className="col-md-12">
              <h5 className="mt-3" style={{ color: "#089242" }}>
                {active ? "All Members" : "Platform Admins"}
              </h5>
            </div>
          </div>
          {!active && <PlatformAdminsView />}
          {active && <AllMembersView />}
        </div>
      </AppWrapper>
    </Dashboard>
  );
}

export default PlatformAdmin;
