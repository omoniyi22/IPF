import React, { Component } from 'react'
import CardTwo from './../../components/Cards/CardTwo'
import EventScreen from './../../components/Screens/EventScreen/EventScreeen'
import QandA from './../../components/Screens/Q&A_Screen/Q&A_Screen'
import Switch from './../../utils/Switch_2'
import EditForm from './../../components/Forms/Event'
import InviteForm from './../../components/Forms/Invite/Invite'
import { Link } from 'react-router-dom'


class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switch: false
    }
  }
  render() {
    let swit = Switch(EditForm, InviteForm)
    return (
      <div className={`${swit[2]}`}>
        <div className="home1">
          <div className="Event_Page">
            <div className="main_page">
              <div className="main_button    flex ">
                <Link className="text-init ml-auto " to="/edit_event">
                  <div className="edit_b heart  text-center btn border flex   rounded-pill">
                    <div className="fa fa-edit" />
                    <div className="text">Edit Event</div>
                  </div>
                </Link>
                <Link to="/invite">
                  <div className="edit_b a  ml-2 heart text-center btn border flex   rounded-pill">
                    <div className="fa fa-user-plus pl-1" />
                    <div className="text pr-1 ">Invite</div>
                  </div>
                </Link>
              </div>
              <CardTwo />
              <div className="switch_button mb-4  ">
                <div className={`one border btn ${this.state.switch === false && "bem"}`}
                  onClick={() => this.setState({ switch: false })}
                >
                  Attendance Summary
            </div>
                <div className={`two border btn  ${this.state.switch === true && "bem"} `}
                  onClick={() => this.setState({ switch: true })}
                >
                  Audience Q & A
            </div>
              </div>
              <div className="screens">
                <div className="ones">
                  {this.state.switch === false ? <EventScreen /> : <QandA />}
                </div>
                <div className="twon"></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${swit[1]} heart`}>
          {swit[0]}
        </div>
      </div>
    )
  }
}
export default Event