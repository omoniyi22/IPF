import React from "react";
import { Link } from "react-router-dom";

const LandingCard = ({ user }) => {
  console.log(user)
  return (
    <div className="LandingCard flex white">
      <div className="content heart">
        <div className=" text-left">
          <div className="metro font-weight-bold h4 ">Welcome {user && user.firstName} {user && user.lastName}</div>
          <div className="msg">
            To get started, start by creating your first event
          </div>
          <Link
            to="/create-event"
            className="btn m-0 sm-btn mt-1 text-capitalize"
          >
            <span className="fa fa-plus mr-1" /> Create Event
          </Link>
        </div>
      </div>
      <div className="svg "></div>
    </div>
  );
};

export default LandingCard;
