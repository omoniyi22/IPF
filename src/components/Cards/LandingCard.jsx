import React, { Component } from 'react'
class LandingCard extends Component {
  render() {
    return (
      <div className="LandingCard flex">
        <div className="content heart">
          <div className=" text-left">
            <div className="metro font-weight-bold h4 ">
              Welcome Andrew
          </div>
            <div className="msg">
              To get started, start by creating your first event
          </div>
            <div className="btn m-0 sm-btn mt-1 text-capitalize">
              <span className="fa fa-plus mr-1" />  Create Event
            </div>
          </div>
        </div>
        <div className="svg ">
        </div>
      </div>
    )
  }
}
export default LandingCard