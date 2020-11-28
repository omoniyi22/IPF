import EventCard from '../../components/Cards/EventCard'
import LandingCard from '../../components/Cards/LandingCard'
import EventTable from '../../components/Tables/Event/Event'
import EventForm from '../../components/Forms/Event'
import { Link } from 'react-router-dom'
import Switch from './../../utils/Switch'
import { CSVDownload, CSVLink } from "react-csv";
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Melo, headers } from './soata'
import Paid_OR_Failed from './../payment/Paid_OR_Failed/Result'



class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matter: "",
      position: true,
      download: ""
    };
    this.move = this.move.bind(this);
    this.moveOut = this.moveOut.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount() {
    if (window.location.href.search("create-event") === -1) {
      this.props.Get_All_Event()
    }
  }
  close() { 
    this.setState({

    })
  }
  move() {
    this.setState({
      position: true,
    });
  }
  moveOut() {
    this.setState({
      position: false,
    });
  }


  render() {
    let swit = Switch(EventForm);
    let { position } = this.state
    let { user, isAdmin, nrole, Register,
      reg_load, reg_pass, reg_fail,
      Get_All_Event, allEvents, Select_Event, active, closed, event_load } = this.props

    window.onclick = function (event) {
      if (!event.target.matches('#dropas')
        && !event.target.matches('#dropa')
        && !event.target.matches('#drope')
        // && !event.target.matches('#toe')
      ) {
        if (document.getElementById("dropa"))
          document.getElementById("dropa").style.display = "none";
      } else {
        if (document.getElementById("dropa"))
          if (document.getElementById("dropa").style.display === "none")
            document.getElementById("dropa").style.display = "block"
          else
            document.getElementById("dropa").style.display = "none"
      }
    }


    return (
      <>
        {
          event_load === true
            ?
            <Paid_OR_Failed loading={event_load} /> :
            < div className={`${swit[2]} `
            }>
              <div className="home1 ">
                {isAdmin === 1 && <LandingCard user={user} />}
                <div className=" my-4 mt-5 mb-4 h4 metro font-weight-bold">
                  <div className="  home_2 mx-0">
                    <div className="upcoming_text mb-4 ml-1">Upcoming Events</div>
                    <div className="flex my_events_card">
                      <div className="seprate w-50 pr-1 ">
                        {/* {<EventCard
                          reg_load={reg_load} reg_pass={reg_pass} reg_fail={reg_fail}
                          Register={() => Register()}
                          event={{
                            "question_id": "5f286e93-3661-4b4b-9674-4459e0354f13",
                            "event_id": "052d1e09-f422-41aa-91da-a5bd000643eb",
                            "question": "God is good",
                            "member_id": "8787e5bc-0770-4015-bbd2-22dae59e0f39",
                            "created_at": "2020-11-12T08:07:11.000Z",
                            "updated_at": "2020-11-12T08:17:05.000Z"
                          }} />} */}
                        {active[0] && <EventCard event={active[0]}
                          reg_load={reg_load} reg_pass={reg_pass} reg_fail={reg_fail}
                          user={user} Register={() => Register()}
                        />}
                      </div>
                      <div className="seprate w-50 pl-1 ">
                        {active[1] && <EventCard event={active[1]}
                          reg_load={reg_load} reg_pass={reg_pass} reg_fail={reg_fail}
                          user={user} Register={() => Register()}
                        />}
                      </div>
                    </div>
                  </div>
                  <div className=" home_3 mx- pt-5 pb-3">
                    <div className="upcoming_text mb-4 ml-2">Events</div>
                    <div className="home_3b flex-2 flex mt-1 mb-2">
                      <div className=" home_header ">
                        <div className="flex awls small font-weight-light">
                          <div
                            className={`other_Events px-2 pnt ${this.state.position}`}
                            onClick={this.move}
                          >
                            Active Events
                    </div>
                          <div
                            className={`view_all px-3 pnt ${!this.state.position}`}
                            onClick={this.moveOut}
                          >
                            Passed Events
                    </div>
                        </div>
                        <div className="lines  rounded-pill">
                          <div
                            className={`rounded-pill lines_move w-50  ${this.state.position}`}
                          />
                        </div>
                      </div>
                      <div class="download active   px-2 py-1 small dropdown">
                        <div
                          id="dropdownMenu1"
                          className="download_icon mx-auto pr-3"
                        />
                        <div className="flex sema">

                          <div className="dropas " id="dropas">
                            <div id="drope" className="">Download As</div>
                            <div id="dropa" className="z-depth-1 mt-1"
                              style={{ display: "none" }}
                            >

                              {
                                position === false &&
                                <>
                                  <div className="toe" id={"toe"}>
                                    <Melo data={event_load === true ? [] : closed} />
                                  </div>
                                  <div className="toe" id={"toe"}>
                                    <CSVLink data={[...closed]} headers={headers} >
                                      CSV
                                    </CSVLink>
                                  </div>
                                </>
                              }

                              {
                                position === true &&
                                <>
                                  <div className="toe" id={"toe"}>
                                    <Melo data={event_load === true ? [] : active} />
                                  </div>
                                  <div className="toe" id={"toe"}>
                                    <CSVLink data={[...active]} headers={headers} >
                                      CSV
                                    </CSVLink>
                                  </div>
                                </>
                              }


                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      {/* {`${position}`} */}
                      {<>
                        {this.state.position === false &&
                          <div className={` ${position === true && "opacy"}`}>
                            {closed.length < 1 ?
                              <div className="my-3 mx-auto text-center py-2">No record found</div> :
                              closed.map((event, key) => (
                                <EventTable kin={key} isAdmin={user && user.isAdmin} event={event} click={() => { Select_Event(event) }} />
                              ))
                            }
                          </div>
                        }
                        {this.state.position === true &&
                          <div className={` ${position === false && "opacy"}`}>
                            {active.length < 1 ?
                              <div className="my-3 mx-auto text-center py-2">No record found</div> :
                              active.map((event, key) => (
                                <EventTable kin={key} isAdmin={user && user.isAdmin} event={event} click={() => { Select_Event(event) }} />
                              ))}
                          </div>
                        }
                      </>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${swit[1]} heart`}>{swit[0]}</div>
            </div >

        }
     
      </>
    );
  }
}
export default HomePage;