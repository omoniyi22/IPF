import React, { Component } from 'react'
import CardTwo from './../../components/Cards/CardTwo'
import EventScreen from './../../components/Screens/EventScreen/EventScreeen'
import QandA from './../../components/Screens/Q&A_Screen/Q&A_Screen'
import Switch from './../../utils/Switch_2'
import EditForm from './../../components/Forms/Event'
import InviteForm from './../../components/Forms/Invite/index'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'


class Event extends Component {

  constructor(props) {
    super(props)
    this.state = {
      switch: false
    }
  }

  componentDidMount() {
    if (this.props.event_id === undefined) {
      this.props.history.goBack()
    }
    if (window.location.href.search("event_page") === 22) {
      this.props.Fetch_Event(this.props.event_id)
      this.props.Get_Sent_Invite(this.props.event_id)
    }
  }

  render() {
    let swit = Switch(EditForm, InviteForm)

    let {
      event,
      rejected_invite, accepted_invite,
      pending_invite, invite_error, invite_loading, isAdmin
    } = this.props

    return (
      <div className={`${swit[2]}`}>
        <div className="home1">
          <div className="Event_Page">
            <div className="main_page">
              {isAdmin === 1 && <div className="main_button    flex ">
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
              </div>}
              <CardTwo event={event} />
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
                  {this.state.switch === false ?
                    <EventScreen
                      // invitatio={true}
                      rejected_invite={rejected_invite} accepted_invite={accepted_invite}
                      pending_invite={pending_invite} invite_error={invite_error}
                      rejected_invite={rejected_invite} accepted_invite={accepted_invite}
                      invite_loading={invite_loading} pending_invite={pending_invite}
                    />
                    : <QandA />}
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
export default withRouter(Event)