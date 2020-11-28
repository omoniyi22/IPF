import React, { Component } from 'react'
import CardTwo from './../../components/Cards/CardTwo'
import EventScreen from './../../components/Screens/EventScreen/EventScreeen'
import QandA from './../../components/Screens/Q&A_Screen'
import Switch from './../../utils/Switch_2'
import EditForm from './../../components/Forms/Event'
import InviteForm from './../../components/Forms/Invite/index'
import { Link, withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switch: false
    }
  }

  componentDidMount() {
    // if (this.props.event_id === undefined) {
    //   this.props.history.goBack()
    // }
    if (window.location.href.search("event_page") === 22) {
      this.props.Fetch_Event(this.props.event_id)
      this.props.Get_Sent_Invite(this.props.event_id)
    }
  }

  render() {
    let swit = Switch(EditForm, InviteForm)
    let {
      event, close_pass,
      rejected_invite, accepted_invite,
      pending_invite, invite_error, invite_loading, isAdmin,
      del_load, deleted, Delete, event_id, close_load, statu,
      Close_Event, close_error
    } = this.props

    return (
      <>
        <div className={`${swit[2]}`}>
          <div className="home1">
            <div className="Event_Page">
              <div className="main_page">
                {isAdmin === 1 && <div className="main_button     flex ">
                  <Link className="text-init ml-auto " to="/edit_event">
                    <div className="edit_b heart  ssa text-center btn border flex   rounded-pill">
                      <div className="fa fa-edit" />
                      <div className="text text-white">Edit <span className="dssp text-white">Event</span></div>
                    </div>
                  </Link>
                  <Link to="/invite">
                    <div className="edit_b a  ml-2 heart text-center btn border flex   rounded-pill">
                      <div className="fa fa-user-plus pl-1" />
                      <div className="text pr-1 ">Invite</div>
                    </div>
                  </Link>
                  <Link>
                    <div className="edit_b a  ml-2 heart text-center btn border flex   rounded-pill">

                      {(deleted === null || deleted === false) && del_load === false &&
                        <>
                          <div className="fa fa-trash pl-1" />
                          <div className="text pr-1 "
                            onClick={() => Delete(event_id, this.props.history)}
                          >Delete</div>
                        </>
                      }

                      {deleted === true && del_load === false &&
                        <div className="text pr-1 ">Deleted</div>
                      }

                      {del_load === true && deleted === false &&
                        <Loader
                          type="ThreeDots"
                          color="white"
                          height={40}
                          width={40}
                          secondaryColor={"white"}
                        />
                      }

                    </div>
                  </Link>
                  {statu !== undefined &&
                    <>
                      <Link>
                        <div className="edit_b  ssa ml-2 heart text-center btn border flex   rounded-pill">
                          {close_load === true &&
                            <Loader
                              type="ThreeDots"
                              color="white"
                              height={40}
                              width={40}
                              secondaryColor={"white"}
                            />
                          }
                          {statu === "active" && close_load === false &&
                            <>
                              <div className="fa fa-times pl-1" />
                              <div className="text pr-1 text-white"
                                onClick={() => { Close_Event({ status: "closed" }, event_id) }}
                              >Close</div>
                            </>
                          }
                          {statu === "closed" && close_load === false &&
                            <>
                              <div className="text pr-1 text-white ">Closed</div>
                            </>}
                        </div>
                      </Link>
                    </>
                  }
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

        <Snackbar open={close_error || close_pass} autoHideDuration={3600}>
          <Alert severity={close_error === true ? "error" : close_pass === true ? "success" : "error"}>
            <span style={{ fontWeight: "bold" }}>{close_error && "Event failed to close, Try Again"}{close_pass && "Event closed Successfully"}</span>
          </Alert>
        </Snackbar>

        <Snackbar open={deleted !== null} autoHideDuration={3600}>
          <Alert severity={deleted === true ? "success" : deleted === false ? "error" : "error"}>
            <span style={{ fontWeight: "bold" }}>{deleted === false && "Event failed to delete, Try Again"}{deleted === true && "Event deleted Successfully"}</span>
          </Alert>
        </Snackbar>

      </>
    )
  }
}
export default withRouter(Event)