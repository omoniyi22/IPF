import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DateForm, TimeForm } from "./../../../assets/utiils/date"
import { noOFmem } from '../../../services/all_service'


class Event_Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      no: 0
    }
  }

  componentDidMount() {
    noOFmem(this.props.event.event_id, this)
  }

  render() {
    let { isAdmin, kin, event: { created_by, event_name, event_date, event_time, event_id }, click } = this.props
    return (
      <Link to="/event_page" className="opacy text-init event_table  py-3 flex w-100 mb-4" onClick={click}>
        <div className="numb rounded-pill text-center  heart border">
          {`${Number(kin) + 1}`}
        </div>
        <div className="data">
          <div>
            <div className="title mr-4">
              {event_name}
            </div>
            <div className="date">
              {`${DateForm(event_date)}`} {TimeForm(event_time)}
            </div>
          </div>
          <div className="numn border-top flex ">
            <div className="members">
              {this.state.no} Members
            </div>
            <div className="name">
              {created_by}
            </div>
          </div>
        </div>
        {isAdmin === 1 ? <div className="manage my-auto mr-3 heart border text-white rounded-pill z-depth-1 btn text-capitalize">
          Manage
        </div> :
          <div className="manage my-auto mr-3 heart border text-white rounded-pill z-depth-1 btn text-capitalize">
            View
        </div>}
      </Link>
    )
  }
}
export default Event_Table