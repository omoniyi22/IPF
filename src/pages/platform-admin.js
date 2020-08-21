import React, { Component } from "react";
// import CustomHeader from "../hoc/CustomHeader";
import MaterialTable from "material-table";
import Dashboard from "../hoc/Dashboard";

class PlatformAdmin extends Component {
  render() {
    return (
      <Dashboard>
        {/* <CustomHeader>
                    <MembershipStatus></MembershipStatus>
                </CustomHeader> */}
        <div className="container" style={{ width: "90%" }}>
          <div className="row">
            <div className="col-md-12">
              <h5 className="mt-3" style={{ color: "#089242" }}>
                Platform Admins
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 shadow" style={{ minHeight: "60vh" }}>
              <MaterialTable
                title=""
                columns={[
                  { title: "Name", field: "name" },
                  { title: "Email", field: "email" },
                  {
                    title: "Phone Number",
                    field: "phoneNumber",
                    type: "numeric",
                  },
                  {
                    title: "Membership NO:",
                    field: "membershipNo",
                    type: "numeric",
                  },

                  // {
                  // title: 'Birth Place',
                  // field: 'birthCity',
                  // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                  // },
                ]}
                data={[
                  // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                  {
                    name: "Aliyu Olateju",
                    email: "aliyu.olateju@gmail.com",
                    phoneNumber: "08160809080",
                    membershipNo: "34",
                  },
                ]}
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
                  onRowAdd: (newData) => {},
                  onRowUpdate: (newData, oldData) => {},
                  onRowDelete: (oldData) => {},
                }}
              />
              {/* <TableHeader>
                                <div className="container">
                                    <div className="row">

                                    </div>
                                </div>
                            </TableHeader>
                            <TableBody>

                            </TableBody> */}
            </div>
          </div>
        </div>
      </Dashboard>
    );
  }
}

export default PlatformAdmin;
