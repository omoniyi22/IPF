import React, { Component } from 'react'
import Header from './../../Headers/Header'
import MemberTable from './../../Tables/Member/Member'

class EventScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "",
      opacy: "",
      search: "",
      position: true,
      invites: [],
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
  componentDidMount() {
    this.chose_All()
  }
  render() {
    let {
      rejected_invite, accepted_invite,
      pending_invite, invite_error, invite_loading
    } = this.props
    let {
      type, invites, opacy, searches
    } = this.state

    const error = (
      <div>
        ERROR
      </div>
    )
    let filter = this.state.invites.filter(invite => invite.member_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
    return (
      <>
        {invite_loading === true ? <div>Invite is Loading</div> :
          <>{
            invite_error === true ? <div>Invite Error</div> :

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
                      Invitation Sent
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
                        <div id="dropdownMenu1" className="download_icon mx-auto pr-3" data-toggle="dropdown" />
                        <div className="flex">
                          <select className="border-0 text-center mx-auto">
                            <option className="text-center w-100 mx-auto">
                              Download As
                            </option>
                            <option className="text-center w-100 mx-auto">
                              PDF
                            </option>
                            <option className="text-center w-100 mx-auto">
                              DOCX
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="home_4 ">
                    <Header first="Name" second="Email" third="Date" fourth="Role" classx={`${opacy + " " + type}`} />
                    {type === "all" && filter.map(dat => <MemberTable />)}
                    {type === "rejected" && filter.map(dat => <MemberTable />)}
                    {type === "accepted" && filter.map(dat => <MemberTable />)}
                    {type === "pending" && filter.map(dat => <MemberTable />)}
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