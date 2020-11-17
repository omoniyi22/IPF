import React, { Component } from 'react'
import Header from './../../Headers/Header'
import MemberTable from './../../Tables/Member/Member'
import { CSVDownload, CSVLink } from "react-csv";
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import { PDFDownloadLink, Document, View, Page, Text, StyleSheet } from "@react-pdf/renderer";
import TableLoader from './../../../components/Loaders/table_loader'
import { ErrorPage } from './../../../assets/utiils/page_error.jsx'
const headers = [
  { label: "Invite ID", key: "id" },
  { label: "Member Name", key: "member_name" },
  { label: "Member Role", key: "member_role" },
  { label: "Email Address", key: "email_address" },
  { label: "Event ID", key: "event_id" },
  { label: "Date Sent", key: "date_sent" },
  { label: "Date Rejected", key: "date_rejected" },
  { label: "Date Accepted", key: "date_accepted" },
  { label: "Updated At", key: "updated_at" }
]


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

class EventScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "",
      opacy: "",
      search: "",
      position: true,
      invites: [...this.props.accepted_invite, ...this.props.rejected_invite, ...this.props.pending_invite],
      searches: []
    }
    this.move = this.move.bind(this)
    this.moveOut = this.moveOut.bind(this)
    this.chose_All = this.chose_All.bind(this)
    this.chose_pending = this.chose_pending.bind(this)
    this.chose_rejected = this.chose_rejected.bind(this)
    this.chose_accepted = this.chose_accepted.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
  }
  chose_All() {
    this.setState({
      invites: [...this.props.accepted_invite, ...this.props.rejected_invite, ...this.props.pending_invite],
      type: "all",
      opacy: ""
    })
    setTimeout(() => {
      this.setState({
        // searches: this.state.invites.filter(invite => invite.member_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1),
        opacy: "opacy"
      })
    }, 1)
  }
  chose_accepted() {
    this.setState({
      invites: [...this.props.accepted_invite],
      type: "accepted",
      opacy: ""
    })
    setTimeout(() => {
      this.setState({
        // searches: this.state.invites.filter(invite => invite.member_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1),
        opacy: "opacy"
      })
    }, 1)
  }
  chose_pending() {
    this.setState({
      invites: [...this.props.pending_invite],
      type: "pending",
      opacy: ""
    })
    setTimeout(() => {
      this.setState({
        // searches: this.state.invites.filter(invite => invite.member_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1),
        opacy: "opacy"
      })
    }, 1)
  }
  chose_rejected() {
    this.setState({
      invites: [...this.props.rejected_invite],
      type: "rejected",
      opacy: "",
      searches: []
    })
    setTimeout(() => {
      this.setState({
        // searches: this.state.invites.filter(invite => invite.member_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1),
        opacy: "opacy"
      })
    }, 1)
  }

  move() {
    this.setState({
      position: true
    })
  }
  moveOut() {
    this.setState({
      position: false
    })
  }
  updateSearch(e) {
    console.log({ dat: this.state.invites })
    this.setState({
      search: e.target.value.substr(0, 20),
      searches: this.state.invites.filter(invite => invite.member_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
    })
  }

  render() {
    let {
      rejected_invite, accepted_invite, invitatio,
      pending_invite, invite_error, invite_loading
    } = this.props
    console.log({ invitatio })
    let {
      type, invites, opacy, searches, search
    } = this.state

    const error = (
      <div>
        ERROR
      </div>
    )
    let filter = this.state.invites.filter(invite => invite.member_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
    return (

      <>

        {invite_loading === true ?
          <div style={{ marginTop: "-110px" }}>
            <TableLoader />
          </div>
          :
          <>{
            invite_error === true ? <div><ErrorPage /></div> :

              < div className="member_page" >
                <div className="invite_button"></div>
                <div className="EventScreen opacy">
                  <div className="inner flex ">
                    <div className="oner  heart z-depth-1"
                      onClick={this.chose_All}
                    >
                      <div className="icon s border heart rounded-pill z-depth-1">
                        <div className="icon_1" />
                      </div>
                      <div className="text flex-2  mr-auto">
                        <div className="text_1  sand_small">
                          {accepted_invite.length + rejected_invite.length + pending_invite.length}
                        </div>
                        <div className="text_2  me">
                          Invitation Sent
                      </div>
                      </div>
                    </div>
                    <div className="oner t   heart z-depth-1 "
                      onClick={this.chose_accepted}
                    >
                      <div className="icon s border heart rounded-pill z-depth-1">
                        <div className="icon1 fa fa-check text-white" />
                      </div>
                      <div className="text flex-2  mr-auto">
                        <div className="text_1  sand_small">
                          {accepted_invite.length}
                        </div>
                        <div className="text_2  me">
                          Accepted
                      </div>
                      </div>
                    </div>
                    <div className="oner h  heart z-depth-1"
                      onClick={this.chose_rejected}
                    >
                      <div className="icon s border heart rounded-pill z-depth-1 ">
                        <div className="icon_1" />
                      </div>
                      <div className="text flex-2  mr-auto">
                        <div className="text_1  sand_small">
                          {rejected_invite.length}
                        </div>
                        <div className="text_2  me">
                          Rejected
                        </div>
                      </div>
                    </div>
                    <div className="oner  heart z-depth-1  f"
                      onClick={this.chose_pending}
                    >
                      <div className="icon s border heart rounded-pill z-depth-1 ">
                        <div className="icon_1" />
                      </div>
                      <div className="text flex-2  mr-auto">
                        <div className="text_1  sand_small">
                          {pending_invite.length}
                        </div>
                        <div className="text_2  me">
                          Pending
                        </div>
                      </div>
                    </div>
                    <div className="oner  heart z-depth-1  f g"
                      onClick={this.chose_pending}
                    >
                      <div className="icon s border heart rounded-pill  z-depth-1">
                        <div className="icon_1" />
                      </div>
                      <div className="text flex-2  mr-auto">
                        <div className="text_1  sand_small">
                          {pending_invite.length}
                        </div>
                        <div className="text_2  me">
                          Not Sure
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" home_3 mx- pt-5 pb-3">
                    <div className="upcoming_text mb-4 ml-2">
                      {invitatio === true ? "Invitation Recieved" : "Invitation Sent"}
                    </div>
                    <div className="home_3b wq flex-2 flex mt-1 mb-2">
                      <div className=" home_header  bread ">
                        <div className="flex awls small h-fit w-fit font-weight-light">
                          <input className={`form-control z-balm rounded-pill m-0 px-2 pnt ${this.state.position}`} onClick={this.move}
                            placeholder="Search..." onChange={this.updateSearch} value={this.state.search}
                          />
                          <div className="fa fa-search my-auto" />
                        </div>
                      </div>
                      <div class="download active   px-2 py-1 small dropdown">
                        <div id="dropdownMenu1" className="download_icon mx-auto pr-3" />
                        <div className="flex">
                          <div className="dropas " id="dropas">
                            <div id="drope" className="">Download As</div>
                            <div id="dropa" className="z-depth-1 mt-1">
                              <div className="toe" id={"toe"}>

                                <PDFDownloadLink
                                  document={<Melo data={invite_loading === false ? [
                                    ...rejected_invite, ...accepted_invite, ...pending_invite
                                  ] : []} headers={headers} />}
                                  fileName="ipf_events.pdf">
                                  PDF
                          </PDFDownloadLink>
                              </div>
                              <div className="toe" id={"toe"}>
                                <CSVLink data={invite_loading === false ? [
                                  ...rejected_invite, ...accepted_invite, ...pending_invite
                                ] : []} headers={headers} >
                                  CSV
                          </CSVLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="home_4 ">
                    {invitatio === true ?
                      <Header first="Event Name" second="My Role" third="Date" fourth="Status" classx={`${opacy + " " + type}`} /> :
                      <Header first="Member Name" second="Email" third="Date" fourth="Role" classx={`${opacy + " " + type}`} />
                    }
                    <>
                      {type === "" && search === "" ?
                        <>
                          {[...this.props.accepted_invite, ...this.props.rejected_invite, ...this.props.pending_invite].length < 1 ?
                            <div className="mx-auto text-center my-3 py-2 opacy">No Record Found</div> :
                            [...this.props.accepted_invite, ...this.props.rejected_invite, ...this.props.pending_invite].map(dat => <MemberTable dat={dat} invitatio={invitatio} changeStatus={this.props.changeStatus} />)
                          }
                        </>
                        :
                        <>
                          {type === "all" &&
                            <>
                              {
                                filter.length < 1 ?
                                  <div className="mx-auto text-center my-3 py-2 opacy">No Record Found</div> :
                                  filter.map(dat => <MemberTable dat={dat} invitatio={invitatio} changeStatus={this.props.changeStatus} />)
                              }
                            </>
                          }
                          {type === "rejected" &&
                            <>
                              {
                                filter.length < 1 ?
                                  <div className="mx-auto text-center my-3 py-2 opacy">No Record Found</div> :
                                  filter.map(dat => <MemberTable dat={dat} invitatio={invitatio} changeStatus={this.props.changeStatus} />)
                              }
                            </>
                          }
                          {type === "accepted" &&
                            <>
                              {
                                filter.length < 1 ?
                                  <div className="mx-auto text-center my-3 py-2 opacy">No Record Found</div> :
                                  filter.map(dat => <MemberTable dat={dat} invitatio={invitatio} changeStatus={this.props.changeStatus} />)
                              }
                            </>
                          }

                          {type === "pending" &&
                            <>
                              {
                                filter.length < 1 ?
                                  <div className="mx-auto text-center my-3 py-2 opacy">No Record Found</div> :
                                  filter.map(dat => <MemberTable dat={dat} invitatio={invitatio} changeStatus={this.props.changeStatus} />)
                              }
                            </>
                          }
                        </>
                      }
                    </>
                  </div>
                </div>
              </div >
          }</>
        }
      </>
    )
  }
}
export default EventScreen