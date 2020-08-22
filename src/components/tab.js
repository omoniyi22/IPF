import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import "date-fns";
import * as dateFns from "date-fns";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Images from "../assets/images";
import { SHOW_ALERT, SHOW_LOADER } from "../redux/types";
import { api, attachApiToken } from "../services/api";
import CustomAvatar from "./avatar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = {
  formGroup: { width: "100%", marginBottom: 40, marginTop: 40 },
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    color: "#000000",
    fontWeight: "bold",
  },

  formGroup: { width: "100%", marginBottom: 40, marginTop: 40 },
  edit: {
    background: "#4164E3",
    height: 48,
    margin: "10px 0px",
    "&:hover": {
      background: "#fff",
      color: "#4164E3",
    },
  },
}));

export default function CustomTab({ userDetails, updateDetails }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    emailAddress2: "",
    city: "",
    state: "",
    country: "",
    passport: "",
    dob: "",
    street1: "",
    street2: "",
    qualifications: "",
    phoneNumber: "",
    phoneNumber2: "",
    companyDetails: "",
    industryType: "",
    industryClassification: "",
    website: "",
    logo: "",
  });
  const [avatar, setAvatar] = React.useState(state.avatar || "");
  const [qualification, setQual] = React.useState([]);
  const [company, setCompany] = React.useState({
    company_name: "",
    company_details: "",
    industry_type: "",
    industryClassification: "",
    website: "",
    logo: "",
  });

  const [industryType, setType] = React.useState([]);
  const [industryClass, setClass] = React.useState([]);

  const dispatch = useDispatch();

  const [msg, setOpen] = React.useState({
    message: "",
    type: "",
    open: false,
  });

  const handleClick = (message, type) => {
    setOpen({
      ...msg,
      message,
      type,
      open: true,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({
      ...msg,
      open: false,
    });
  };

  React.useEffect(() => {
    setState({
      ...state,
      ...userDetails,
    });
  }, [userDetails]);

  const initiateState = React.useCallback(() => {
    const getUser = () => {
      var user = JSON.parse(localStorage.getItem("ipf-user"));
      setState({
        ...state,
        ...user,
      });
    };
    getUser();
  }, [setState]);

  React.useEffect(() => {
    initiateState();
  }, [initiateState]);

  const initiateQualification = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/admin/qualifications");
        setQual(response.data.data);
        // console.log("===========>", response.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, [setQual]);

  React.useEffect(() => {
    initiateQualification();
  }, [initiateQualification]);

  const initiateCompany = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/company");
        setCompany({ ...company, ...response.data.data });
        // console.log("===========>", response.data.data);
      } catch (error) {
        // alert(JSON.stringify(error));
        // console.log(error);
      }
    };
    getUser();
  }, [setCompany]);

  // Industry type

  const initiateIndustry = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/industry/type");
        setType(response.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, [setType]);

  const initiateClass = React.useCallback(() => {
    const getUser = async () => {
      try {
        const authApi = await attachApiToken(api);
        const response = await authApi.get("/industry/class");
        setClass(response.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, [setClass]);

  React.useEffect(() => {
    initiateIndustry();
  }, [initiateIndustry]);

  React.useEffect(() => {
    initiateClass();
  }, [initiateClass]);

  React.useEffect(() => {
    initiateCompany();
  }, [initiateCompany]);

  const getCompany = async () => {
    try {
      const response = await axios.get("/company");
      setCompany({ ...company, ...response.data.data });
    } catch (error) {}
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Paper className={classes.root}>
        <Tabs
          style={{ background: "#3E5E6E" }}
          value={value}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {state.nrole === "super-user" && (
            <Tab
              style={{ color: "#fff", fontWeight: "bold" }}
              label="Company Details"
            />
          )}
        </Tabs>
      </Paper>

      <div className="tab-container">
        {value === 1 && state.nrole === "super-user" && (
          <>
            <AvatarContainer>
              <CustomAvatar
                url={company.logo}
                alt={company.company_name}
                onChangeAvatar={(url) => {
                  setCompany({
                    ...company,
                    logo: url,
                  });
                }}
              />

              <span style={{ fontWeight: "bold" }}>Upload Corporate Logo</span>
            </AvatarContainer>

            <section className="custom-form-group">
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <FormGroup className style={styles.formGroup}>
                  <TextField
                    classes={classes.input}
                    disabled
                    id="outlined-uncontrolled"
                    label={"Company Name"}
                    value={company.company_name || ""}
                    variant="outlined"
                    name="nameOfCompany"
                    onChange={({ target: { value, name } }) => {
                      setCompany({
                        ...company,
                        company_name: value,
                      });
                    }}
                  />
                </FormGroup>
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <FormGroup className style={{ width: "49%" }}>
                  <FormControl className="w-49" variant="outlined">
                    <InputLabel id="demo-simple-select-helper">
                      Industry Classification
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper"
                      id="demo-simple-select-helper"
                      value={company.industryClassification}
                      name="industryClassification"
                      onChange={({ target: { value } }) => {
                        setCompany({
                          ...company,
                          industryClassification: value,
                        });
                      }}
                      label="Industy Classification"
                      // className={classes.select}
                    >
                      {industryClass.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.industry_name}>
                            {item.industry_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </FormGroup>

                <FormGroup className style={{ width: "49%" }}>
                  <FormControl className="w-49" variant="outlined">
                    <InputLabel id="demo-simple-select-helper">
                      Industry Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper"
                      id="demo-simple-select-helper"
                      value={company.industry_type}
                      name="industryClassification"
                      onChange={({ target: { value } }) => {
                        setCompany({
                          ...company,
                          industry_type: value,
                        });
                      }}
                      label="Industy Classification"
                      // className={classes.select}
                    >
                      {industryType.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.industry_name}>
                            {item.industry_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </FormGroup>
              </div>

              <FormGroup className style={styles.formGroup}>
                <TextField
                  classes={classes.input}
                  id="outlined-uncontrolled"
                  label={"Company Details"}
                  value={company.company_details || ""}
                  variant="outlined"
                  name="companyDetails"
                  onChange={({ target: { value } }) => {
                    setCompany({
                      ...company,
                      company_details: value,
                    });
                  }}
                />
              </FormGroup>

              <FormGroup className style={styles.formGroup}>
                <TextField
                  classes={classes.input}
                  label={"Company Website"}
                  value={company.website || ""}
                  variant="outlined"
                  name="website"
                  onChange={({ target: { value } }) => {
                    setCompany({
                      ...company,
                      website: value,
                    });
                  }}
                />
              </FormGroup>
              <Button
                className={classes.edit}
                variant="contained"
                onClick={updateCompanyDetails}
                color="secondary"
              >
                Update
              </Button>
            </section>
          </>
        )}
      </div>

      <Snackbar open={msg.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msg.type}>
          <span stye={{ fontWeight: "bold" }}>{msg.message}</span>
        </Alert>
      </Snackbar>
    </Fragment>
  );

  async function updateCompanyDetails() {
    if (company.company_name.trim() === "") {
      return handleClick("Company's name cannot be empty", "error");
    }

    dispatch({ type: SHOW_LOADER, payload: true });
    try {
      const authApi = await attachApiToken(api);
      await authApi.patch("/company/", {
        ...company,
      });

      dispatch({ type: SHOW_LOADER, payload: false });

      //   getMembers();
      return handleClick("Company details updated successfully", "success");
    } catch (error) {
      dispatch({ type: SHOW_LOADER, payload: false });

      let message = "some errors were encountered, please try again";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      }

      handleClick(message, "error");
    }
  }
}

const AvatarContainer = styled.div`
  // border: 1px solid orange;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
