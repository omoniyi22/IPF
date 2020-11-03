import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Event_Table extends Component {
  render() {
    let { event: { event_name, event_date }, click } = this.props
    return (
      <Link to="/event_page" className=" text-init event_table  py-3 flex w-100 mb-4" onClick={click}>
        <div className="numb rounded-pill text-center  heart border">
          1
        </div>
        <div className="data">
          <div>
            <div className="title mr-4">
              {event_name}
            </div>
            <div className="date">
              {event_date}
            </div>
          </div>
          <div className="numn border-top flex ">
            <div className="members">
              20 Members
            </div>
            <div className="name">
              Andrew John
            </div>
          </div>
        </div>
        <div className="manage my-auto mr-3 heart border text-white rounded-pill z-depth-1 btn text-capitalize">
          Manage
        </div>
      </Link>
    )
  }
}
export default Event_Table