import React, { useState, useEffect, useCallback } from "react";
import SideMenu from "../components/side_menu";
import Header from "./Header";
import { Snackbar } from "@material-ui/core";
import LayOut from './../new_App'
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

export default function Dashboard({ children, clas }) {
  const defaultPassword = useSelector((state) => state.user.isDefaultPassword);

  
  return (
    <React.Fragment>
      {/* <div className="container-fluid px-0  " style={{ padding: 0 }}>
        <Header />
        <div className="desktop">
          <div className="side-menu-left ">
            <SideMenu />
          </div>
        </div>
        <div className="menu-content">
        </div>
      </div> */}
      <LayOut clas={clas}>
        {children}
      </LayOut>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={defaultPassword}
      >
        <Alert style={{ marginTop: "8%" }} severity="warning">
          <span>
            <b>
              For your security, please click{" "}
              <Link to="/admin/change-password">
                <b>here </b>
              </Link>
              to change your <b>default password</b>
            </b>
          </span>
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
