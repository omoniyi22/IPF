import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import MaterialTableDemo from "../components/materialTable";
import Dashboard from "../hoc/Dashboard";
import * as actions from "../redux/actions";
import { api, attachApiToken } from "../services/api";
import {
  industryColumn,
  memberColumn,
  PositionColumn,
  Qual,
} from "../utils/settings.data";
function Settings() {
  const [memberState, setMember] = React.useState([]);
  const [industryState, setIndustry] = React.useState([]);
  const [industryClass, setClass] = React.useState([]);
  const [position, setPosition] = React.useState([]);
  const [qualification, setQual] = React.useState([]);

  const initiateMember = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/admin/membership-type");
        setMember(response.data.data);
        console.log(response.data.data);
      } catch (error) {}
    };
    getUser();
  }, [setMember]);

  const initiateIndustry = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/admin/industry-type");
        setIndustry(response.data.data);
      } catch (error) {}
    };
    getUser();
  }, [setIndustry]);

  const initiateClass = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/admin/industry-classification");
        setClass(response.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, [setClass]);

  const initiatePosition = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/admin/positions");
        setPosition(response.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, [setPosition]);

  const initiateQualification = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/admin/qualifications");
        setQual(response.data.data);
        // console.log("===========>", response.data.data);
      } catch (error) {
        alert(JSON.stringify(error));
        // console.log(error);
      }
    };
    getUser();
  }, [setQual]);

  useEffect(() => {
    initiateQualification();
  }, [initiateQualification]);

  useEffect(() => {
    initiateMember();
  }, [initiateMember]);

  useEffect(() => {
    initiateIndustry();
  }, [initiateIndustry]);

  useEffect(() => {
    initiateClass();
  }, [initiateClass]);

  useEffect(() => {
    initiatePosition();
  }, [initiatePosition]);

  const _getMemberType = async () => {
    try {
      const authApi = await attachApiToken(api);
      const response = await authApi.get("/admin/industry-type");
      setIndustry(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  async function addMemberType(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.post("/admin/membership-type", {
        name: data.name,
        code: data.code,
        enrol_limit: data.enrol_limit,
      });
    } catch (error) {
      // console.log(error);
    }
  }

  async function editMemberType(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.patch("/admin/membership-type", {
        name: data.name,
        code: data.code,
        enrol_limit: parseInt(data.enrol_limit),
        id: data.id,
      });
      _getMemberType();
    } catch (error) {}
  }

  async function removeMemberType(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.delete("/admin/membership-type", {
        data: {
          id: data.id,
        },
      });
      _getMemberType();
    } catch (error) {
      console.log(error.response);
    }
  }

  // Add Industry Type

  async function addIndustryType(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.post("/api/v1/admin/industry-type", {
        industry_name: data.industry_name,
      });
    } catch (error) {}
  }

  async function editIndustryType(data) {
    try {
      await axios.patch("/admin/industry-type", {
        industry_name: data.industry_name,
        id: data.id,
      });
    } catch (error) {}
  }

  async function removeIndustryType(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.delete("/admin/industry-type", {
        data: {
          id: data.id,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  }

  // Add Classification Type

  async function addIndustryClass(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.post("/admin/industry-classification", {
        industry_name: data.industry_name,
      });
    } catch (error) {}
  }

  async function editIndustryClass(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.patch("/admin/industry-classification", {
        industry_name: data.industry_name,
        id: data.id,
      });
    } catch (error) {}
  }

  async function removeIndustryClass(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.delete("/admin/industry-classification", {
        data: {
          id: data.id,
        },
      });
    } catch (error) {}
  }

  // Add Position

  async function addPosition(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.post("/admin/position", {
        name: data.name,
      });
    } catch (error) {}
  }

  async function editPosition(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.patch("/admin/position", {
        name: data.name,
        id: data.id,
      });
    } catch (error) {}
  }

  async function removePosition(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.delete("/admin/position", {
        data: {
          id: data.id,
        },
      });
    } catch (error) {}
  }
  //Qualificationis
  async function addQualification(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.post("/admin/qualifications", {
        name: data.name,
        detail: data.detail,
      });
    } catch (error) {
      alert(JSON.stringify(error.response));
    }
  }

  async function editQualification(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.patch("/admin/qualifications", {
        name: data.name,
        detail: data.detail,
        id: data.id,
      });
    } catch (error) {}
  }

  async function removeQualification(data) {
    try {
      const authApi = await attachApiToken(api);
      await authApi.delete("/admin/qualifications", {
        data: {
          id: data.id,
        },
      });
    } catch (error) {}
  }

  return (
    <Dashboard>
      <div
        className="membership-settings container-fluid mt-5"
        style={{ width: "90%" }}
      >
        <div className="row">
          <div className=" col-lg-6 mb-3 box col-sm-12">
            <div className="shadow h-100 bg-white p-3 ">
              <Title
                className="mt-3"
                style={{ color: "#089242", fontWeight: "bold" }}
              >
                Manage Membership Types
              </Title>
              <MaterialTableDemo
                title={""}
                columns={memberColumn}
                data={memberState}
                add={addMemberType}
                update={editMemberType}
                remove={removeMemberType}
              />
            </div>
          </div>
          <div className=" col-lg-6 mb-3 box col-sm-12">
            <div className="shadow h-100 bg-white p-3 ">
              <h5
                className="mt-3"
                style={{ color: "#089242", fontWeight: "bold" }}
              >
                Manage Industry Type
              </h5>
              <MaterialTableDemo
                title={""}
                columns={industryColumn}
                data={industryState}
                add={addIndustryType}
                update={editIndustryType}
                remove={removeIndustryType}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className=" col-lg-6 mb-3 box col-sm-12">
            <div className="shadow h-100 bg-white p-3 ">
              <h5
                className="mt-3"
                style={{ color: "#089242", fontWeight: "bold" }}
              >
                Manage Industry Classfication
              </h5>
              <MaterialTableDemo
                title={""}
                columns={industryColumn}
                data={industryClass}
                add={addIndustryClass}
                update={editIndustryClass}
                remove={removeIndustryClass}
              />
            </div>
          </div>
          <div className=" col-lg-6 mb-3 box col-sm-12">
            <div className="shadow h-100 bg-white p-3 ">
              <h5
                className="mt-3"
                style={{ color: "#089242", fontWeight: "bold" }}
              >
                Manage Position
              </h5>
              <MaterialTableDemo
                title={""}
                columns={PositionColumn}
                data={position}
                add={addPosition}
                update={editPosition}
                remove={removePosition}
              />
            </div>
          </div>
        </div>

        <div className=" col-lg-6 mb-3 box col-sm-12">
          <div className="shadow h-100 bg-white p-3 ">
            <h5
              className="mt-3"
              style={{ color: "#089242", fontWeight: "bold" }}
            >
              Manage Qualifications
            </h5>
            <MaterialTableDemo
              title={""}
              columns={Qual}
              data={qualification}
              add={addQualification}
              update={editQualification}
              remove={removeQualification}
            />
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default connect(null, actions)(Settings);

const Title = styled.p`
  color: #14bf69;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 22px;
  padding: 0px 0.8rem;
`;
