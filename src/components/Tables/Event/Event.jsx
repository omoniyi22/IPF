import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Event_Table extends Component {
  render() {
    return (
      <Link to="/event_page" className=" text-init event_table  py-3 flex w-100 mb-4">
        <div className="numb rounded-pill text-center  heart border">
          1
        </div>
        <div className="numn border-top flex ">
          <div className="members">20 Members</div>
          <div className="name">Andrew John</div>
        </div>
      </Link>
    )
  }
}
export default Event_Table
