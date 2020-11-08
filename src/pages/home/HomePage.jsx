import React, { Component } from 'react'
import EventCard from '../../components/Cards/EventCard'
import LandingCard from '../../components/Cards/LandingCard'
import EventTable from '../../components/Tables/Event/Event'
import EventForm from '../../components/Forms/Event'
import { Link } from 'react-router-dom'
import Switch from './../../utils/Switch'
import { CSVDownload, CSVLink } from "react-csv";
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import { PDFDownloadLink, Document, View, Page, Text, StyleSheet } from "@react-pdf/renderer";

const style = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row"
  },
  view: {
    marginBottom: 10
  },
  text: {
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 12
  },

  ve: {
    marginBottom: "4"
  },
  size: {
    width: "100%"
    // width: "fitContent",
    // maxWidth: "fit-content",
  }

})

const Melo = ({ headers, data }) =>
  <Document>
    <Page size="A3" style={style.size}>
      <View style={style.view}>
        <View style={style.flex}>
          {headers.map((data) =>
            <Text break style={style.text}>
              {data.label}
            </Text>
          )}
        </View>
        <View style={style.ve}>
          {data.map((data) =>
            <View style={style.flex}>
              {Object.values(data).map((data) =>
                <Text break style={style.text}>
                  {data}
                </Text>
              )}
            </View>
          )}
        </View>
        <View>
          <Text break>
          </Text>
        </View>
      </View>
    </Page>
  </Document>


const headers = [
  { label: "Event ID", key: "event_id" },
  { label: "Event Name", key: "event_name" },
  { label: "Event Details", key: "event_details" },
  { label: "Event Date", key: "event_date" },
  { label: "Event Time", key: "event_time" },
  { label: "Set Reminder", key: "set_reminder" },
  { label: "Reminder", key: "reminder" },
  { label: "Status", key: "status" },
  { label: "Banner Image", key: "banner_image" }
]

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
  }
  componentDidMount() {
    if (window.location.href.search("create-event") === -1) {
      this.props.Get_All_Event()
    }
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
    let { Get_All_Event, allEvents, Select_Event, active, closed } = this.props

    return (
      <div className={`${swit[2]} `}>
        <div className="home1 ">
          <LandingCard />
          <div className=" my-4 mt-5 mb-4 h4 metro font-weight-bold">
            <div className="  home_2 mx-0">
              <div className="upcoming_text mb-4 ml-1">Upcoming Events</div>
              <div className="flex my_events_card">
                <div className="seprate w-50 pr-1 ">
                  <EventCard />
                </div>
                <div className="seprate w-50 pl-1 ">
                  <EventCard />
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
                      Passed Events
                    </div>
                    <div
                      className={`view_all px-3 pnt ${!this.state.position}`}
                      onClick={this.moveOut}
                    >
                      Active Events
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
                      <div id="dropa" className="z-depth-1 mt-1">
                        <div className="toe" id={"toe"}>
                          <PDFDownloadLink
                            document={<Melo data={position === true ? closed : active} headers={headers} />}
                            fileName="ipf_events.pdf">
                            PDF
                          </PDFDownloadLink>
                        </div>
                        <div className="toe" id={"toe"}>
                          <CSVLink data={position === true ? closed : active} headers={headers} >
                            CSV
                          </CSVLink>
                        </div>
                      </div>
                    </div>





                    {/* <Dropdown
                      text={(<span>Download As <span className="fa fa-angle-down" /></span>)}
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item text='Download As' disabled className="text-center" />
                        <Dropdown.Item text='CSV' className="text-center">
                            CSV
                        </Dropdown.Item>
                        <Dropdown.Item text='PDF' className="text-center" />
                      </Dropdown.Menu>
                    </Dropdown>
 */}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                {/* {`${position}`} */}
                {<>
                  {this.state.position === true &&
                    <div className={` ${position === true && "opacy"}`}>
                      {
                        closed.map(event => (
                          <EventTable event={event} click={() => { Select_Event(event) }} />
                        ))}
                    </div>
                  }
                  {this.state.position === false &&
                    <div className={` ${position === false && "opacy"}`}>
                      {
                        active.map(event => (
                          <EventTable event={event} click={() => { Select_Event(event) }} />
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
    );
  }
}
export default HomePage;
