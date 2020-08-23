import { Grid, makeStyles, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import axios from "axios";
import clsx from "clsx";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import CustomTab2 from "../components/tab2";
import DashBoard from "../hoc/UserDashboard";
import * as actions from "../redux/actions";
import { api, attachApiToken } from "../services/api";
import { sanitizeMember } from "../utils/memberType";
import { TextInput } from "../components/components";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#3E5E6E",
    padding: "8px 10px",
  },
  padding: {
    padding: "8px 10px",
  },
  white: {
    color: "#fff",
  },
  smallFont: {
    fontSize: "0.9rem",
  },
  borderRight: {
    borderRight: "1px solid #fff",
  },
  boxShadow: {
    boxShadow: "1px 2px 5px 0px #8fceec42",
  },
  grey: {
    color: "#7f7c7c",
  },
  borderBottomGreen: {
    borderBottom: "10px solid #46B049",
  },
  backgroundWhite: {
    backgroundColor: "#fff",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-left: 200px;
  margin-right: 5px;
`;
const AddMembers = ({
  userDetails,
  getUserDetails,
  updateDetails,
  isLoading,
  history,
  addMember,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const initiateState = React.useCallback(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get("/auth/get-registered-members");
        setMembers(response.data.data);
      } catch (error) {
        console.error(error);
      }
      //   getUserDetails();
    };
    // getDetails();
  }, []);
  //   React.useEffect(() => {
  //     dispatch({ type: SET_ACTIVE_LINK, payload: "addMember" });
  //     initiateState();
  //   }, [initiateState, dispatch]);

  function updateAccountDetails(data) {
    isLoading(true);
    updateDetails(data);
  }
  const renderMemberList = () => {
    return members.map((item, i) => (
      <Grid
        className={clsx(
          classes.backgroundWhite,
          classes.padding,
          classes.borderBottomGreen
        )}
        container
        spacing={2}
        key={i}
      >
        <Grid item sm={2}>
          <Typography
            className={clsx(classes.grey, classes.smallFont)}
            variant="h6"
          >
            {`${item.firstName} ${item.lastName}`}
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography
            className={clsx(classes.grey, classes.smallFont)}
            variant="h6"
          >
            {item.emailAddress}
          </Typography>
        </Grid>
        <Grid item sm={2}>
          <Typography
            className={clsx(classes.grey, classes.smallFont)}
            variant="h6"
          >
            {item.phoneNumber}
          </Typography>
        </Grid>
        <Grid item sm={2}>
          <Typography
            className={clsx(classes.grey, classes.smallFont)}
            variant="h6"
          >
            {sanitizeMember(item.membershipType)}
          </Typography>
        </Grid>
        <Grid item sm={2}>
          <div className="btn-grid">
            <div className="item1">
              <button
                className="btn small-padding btn-danger"
                onClick={() => {}}
                // disabled={item.approved ? true : false}
              >
                Remove
              </button>
            </div>
            {/* <div className="item2">
              <button
                disabled={item.approved ? true : false}
                className="btn small-padding color-white btn-danger"
              >
                Reject
              </button>
            </div> */}
          </div>
        </Grid>
      </Grid>
    ));
  };

  const saveMember = async (data) => {
    try {
      const authApi = await attachApiToken(api);
      const re = await authApi.post("/auth/add-member", {
        ...data,
        email: data.emailAddress,
      });
      const response = await authApi.get("/auth/get-registered-members");
      setMembers(response.data.data);

      return re;
    } catch (error) {
      throw error;
    }
  };

  return (
    <DashBoard other>
      <Container style={{}}>
        <CustomTab2
          userDetails={userDetails}
          updateDetails={updateAccountDetails}
          saveMember={saveMember}
        />

        {/* <SearchAppBar handleSearch={() => {}} /> */}
        <div style={{ marginTop: 100 }}>
          <Grid
            className={clsx(classes.header, classes.boxShadow)}
            container
            spacing={2}
          >
            <Grid item sm={2}>
              <Typography
                variant="h5"
                className={clsx(
                  classes.white,
                  classes.smallFont,
                  classes.borderRight
                )}
              >
                Name
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <Typography
                variant="h5"
                className={clsx(
                  classes.white,
                  classes.smallFont,
                  classes.borderRight
                )}
              >
                Email
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography
                variant="h5"
                className={clsx(
                  classes.white,
                  classes.smallFont,
                  classes.borderRight
                )}
              >
                Phone Number
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography
                variant="h5"
                className={clsx(
                  classes.white,
                  classes.smallFont,
                  classes.borderRight
                )}
              >
                Membership
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography
                variant="h5"
                className={clsx(classes.white, classes.smallFont)}
              >
                Actions
              </Typography>
            </Grid>
          </Grid>
          {renderMemberList()}
        </div>
      </Container>
    </DashBoard>
  );
};

const mapStateToProps = (state) => {
  const {
    user: { userDetails },
  } = state;
  return { userDetails };
};

export default connect(mapStateToProps, actions)(AddMembers);
