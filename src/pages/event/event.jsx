import React, { Component } from 'react'
import CardTwo from './../../components/Cards/CardTwo'
import EventScreen from './../../components/Screens/EventScreen/EventScreeen'
import QandA from './../../components/Screens/Q&A_Screen/Q&A_Screen'

class Event extends Component {
  render() {
    return (
      <div className="Event_Page">
        <div className="main_page">
          <div className="main_button    flex ">
            <div className="edit_b heart  ml-auto text-center btn border flex   rounded-pill">
              <div className="fa fa-edit" />
              <div className="text">Edit Event</div>
            </div>
            <div className="edit_b a  ml-2 heart text-center btn border flex   rounded-pill">
              <div className="fa fa-user-plus pl-1" />
              <div className="text pr-1 ">Invite</div>
            </div>
          </div>
          <CardTwo />
          <div className="switch_button mb-4">
            <div className="one border btn">
              Attendance Summary
            </div>
            <div className="two border btn">
              Audience Q & A
            </div>
          </div>
          <div className="screens">
            <div className="ones">
              {/* <EventScreen /> */}
              <QandA />
            </div>
            <div className="twon"></div>
          </div>
        </div>
      </div>
    )
  }
}
export default Event