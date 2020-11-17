import React, { Component } from 'react'
import { DateForm, TimeForm } from './../../assets/utiils/date'


class EventCard extends Component {
  render() {
    let { event } = this.props
    return (
      <div className="EventCard mx-0 ">
        <div className="card_pix"
          style={{ backgroundImage: `url(${require('./../../assets/medias/land_svg.png')})` }}
        />
        <div className="EC_content  metro">
          <div className="EC_title metro">
            {event.event_name}
          </div>
          <div className="EC_date metro py-1 small">
            {DateForm(event.event_date)} {TimeForm(event.event_time)}
          </div>
          <div className="EC_members metro">
            {event.event_members || "event_members"}
          </div>
          <div className="EC_down flex ">
            <button className="rounded-pill text-center z-depth-1 ovin">
              Register
            </button>
            {/* <div className=" circle-box flex flex-2 mt-2">
              <div className="circum  rounded-pill  ml-auto " />
              <div className="circum border rounded-pill  " />
              <div className="circum z-depth-1 rounded-pill white heart">
                <span className="fa fa-angle-right" />
              </div>
            </div> */}
            <div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default EventCard