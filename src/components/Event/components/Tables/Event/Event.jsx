import React, { Component } from 'react'

class Event_Table extends Component {
  render() {
    return (
      <div className="event_table  py-3 flex w-100 mb-4">
        <div className="numb rounded-pill text-center  heart border">
          1
        </div>
        <div className="data">
          <div>
            <div className="title mr-4">
              All Tech Conference
            </div>
            <div className="date">
              12th Semptember, 2020
          </div>
          </div>
          <div className="numn flex ">
            <div className="members">
              20 Members
            </div>
            <div className="name">
              Andrew John
            </div>
          </div>
        </div>
        <div className="manage my-auto mr-3 border text-white rounded-pill">
          Manage
        </div>
      </div>
    )
  }
}
export default Event_Table