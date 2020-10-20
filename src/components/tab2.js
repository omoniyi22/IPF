import { Button } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import MuiAlert from "@material-ui/lab/Alert";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { isEmailValid } from "../utils/app";
import { phoneNumberRegx } from "../utils/regex";
import { TextInput } from "./components";
import PhoneNumber from "./General/phoneInput";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  input: {},
  edit: {
    background: "#4164E3",
    "&:hover": {
      background: "#fff",
      color: "#4164E3",
    },
  },
}));
function CustomTab2({ userDetails, saveMember, showLoader }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
  });

  const [user, setUser] = React.useState({});

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

  const initiateState = React.useCallback(() => {
    const getUser = () => {
      var user = JSON.parse(localStorage.getItem("ipf-user"));
      setUser(user);
    };
    getUser();
  }, [setUser]);

  React.useEffect(() => {
    initiateState();
  }, [initiateState]);

  const renderGroup = (
    valueA,
    valueB,
    labelOne,
    labelTwo,
    onChangeText,
    name1,
    name2
  ) => {
    return (
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          width: "100%",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <FormGroup style={{ width: "49%" }}>
          <PhoneNumber
            onChange={onChangeText}
            name={name1}
            value={name1}
            placeholder={labelOne}
          />
          {/* <TextField
            // classes={classes.input}
            id="outlined-controlled"
            label={labelOne}
            name={name1}
            variant="outlined"
            onChange={onChangeText}
            name={name1}
          /> */}
        </FormGroup>
        <FormGroup style={{ width: "49%" }}>
          <TextInput
            // classes={classes.input}
            id="outlined-controlled"
            label={labelTwo}
            value={valueB}
            variant="outlined"
            placeholder="Email address"
            onChange={onChangeText}
            name={name2}
          />
        </FormGroup>
      </div>
    );
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
          <Tab
            style={{ color: "#fff", fontWeight: "bold" }}
            label="Add Member"
          />
        </Tabs>
      </Paper>

      <div className="tab-container">
        {value === 0 && (
          <>
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
                <FormGroup style={{ width: "49%" }}>
                  <TextInput
                    // classes={classes.input}
                    id="outlined-controlled"
                    placeholder={"First Name"}
                    defaultValue={state.firstName}
                    value={state.firstName}
                    variant="outlined"
                    onChange={onChangeText}
                    name="firstName"
                  />
                </FormGroup>
                <FormGroup style={{ width: "49%" }}>
                  <TextInput
                    // classes={classes.input}
                    id="outlined-controlled"
                    placeholder={"Last Name"}
                    defaultValue={state.lastName}
                    value={state.lastName}
                    variant="outlined"
                    onChange={onChangeText}
                    name="lastName"
                  />
                </FormGroup>
              </div>

              {renderGroup(
                state.phoneNumber,
                state.emailAddress,
                "Phone Number",
                "Email Address",
                onChangeText,
                "phoneNumber",
                "emailAddress"
              )}

              <Button
                className={classes.edit}
                onClick={updateBasicInfo}
                variant="contained"
                color="secondary"
              >
                Add Member
              </Button>
            </section>
          </>
        )}
      </div>

      <Snackbar open={msg.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msg.type}>
          {msg.message}
        </Alert>
      </Snackbar>
    </Fragment>
  );

  function onChangeText(e, other = false) {
    if (other) {
      const { value, name } = e;
      return setState({
        ...state,
        [name]: value,
      });
    }

    const {
      target: { value, name },
    } = e;
    setState({
      ...state,
      [name]: value,
    });
    // console.log(name);
  }

  function updateBasicInfo() {
    const { email, firstName, lastName, phoneNumber, emailAddress } = state;

    if (user && !user.approved) {
      return handleClick("Approval still pending", "error");
    }

    if (firstName.trim() === "") {
      return handleClick("First name is required", "error");
    }

    if (lastName.trim() === "") {
      return handleClick("Last name is required", "error");
    }

    if (phoneNumber.trim() === "") {
      return handleClick("Phone number is required", "error");
    }

    if (!phoneNumberRegx.test(phoneNumber)) {
      return handleClick("Phone number is invalid", "error");
    }

    if ((phoneNumber.trim().length !== 14)) {
      return handleClick("Phone number is invalid", "error");
    }

    if (emailAddress.trim() === "") {
      return handleClick("Email address is required", "error");
    }

    if (!isEmailValid(emailAddress.trim())) {
      return handleClick("Email address is invalid", "error");
    }

    const updateData = {
      email: emailAddress,
      firstName,
      lastName,
      phoneNumber,
      company_id: user["company_id"],
      role: user["nrole"],
    };

    showLoader(true);
    saveMember(updateData)
      .then((res) => {
        showLoader(false);
        handleClick("Member Registration Successful", "success");
        setState({
          firstName :'',
          lastName:'',
          phoneNumber:'',
          emailAddress:""
        })
      })
      .catch((error) => {
        console.log(error.response)
        showLoader(false);
        if (error.response && error.response.data.error) {
          return handleClick(error.response.data.message, "error");
        }

        return handleClick("Unsuccessful. Try again", "error");
      });
  }
}

export default connect(null, actions)(CustomTab2);
