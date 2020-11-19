import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ErrorSnack } from "../../assets/utiils/snacks"
import { connect } from 'react-redux'
let outerState = {
  overview: false,
  events: false,
  manage_profile: false,
  notify: false,
  payment: false,
  payment_history: false,
  members: false,
  transactions: false,
  reports: false,
  masters: false,
}



class Nav_Options extends Component {
  constructor(props) {
    super(props)
    this.state = { ...outerState, show: false, error: "" }
    this.onOverview = this.onOverview.bind(this)
    this.onEvents = this.onEvents.bind(this)
    this.onManage = this.onManage.bind(this)
    this.Notify = this.Notify.bind(this)
    this.onPayment = this.onPayment.bind(this)
    this.onPaymentHistory = this.onPaymentHistory.bind(this)
    this.onMember = this.onMember.bind(this)
    this.onTransact = this.onTransact.bind(this)
    this.onReport = this.onReport.bind(this)
    this.onMaster = this.onMaster.bind(this)
    this.onShow = this.onShow.bind(this)
  }
  onShow() {
    this.setState({
      show: !this.state.show
    })
  }
  onOverview(e) {
    this.setState({
      ...outerState,
      overview: true
    })
  }
  onEvents(e) {
    this.setState({
      ...outerState,
      events: true
    })
  }
  onManage(e) {
    this.setState({
      ...outerState,
      manage_profile: true
    })
  }
  Notify(e) {
    this.setState({
      ...outerState,
      notify: true
    })
  }
  onPayment() {
    this.setState({
      ...outerState,
      payment: true
    })
  }
  onPaymentHistory() {
    this.setState({
      ...outerState,
      payment_history: true
    })
  }
  onMember() {
    this.setState({
      ...outerState,
      members: true
    })
  }
  onTransact() {
    this.setState({
      ...outerState,
      transactions: true
    })
  }
  onReport() {
    this.setState({
      ...outerState,
      reports: true
    })
  }
  onMaster() {
    this.setState({
      ...outerState,
      masters: true
    })
  }

  render() {
    // /admin/change-password
    // /admin/dashboard/profile-update
    let { error } = this.state
    let { isAdmin, event } = this.props
    return (
      <>
        {error &&
          <ErrorSnack error={error} close={() => this.setState({ error: "" })} />
        }

        <div className="h-100 ri">
          <div className="nav_options text-left  ">
            <Link to="/overview">
              <div className={`nav_button text-white sm-flex  ${this.state.overview === true && "changed_nav"}`} onClick={this.onOverview}>
                <div className="p-1  rounded-pill white rounded_point sm-show" />
                Overview
            </div>
            </Link>
            {event ?
              <Link to={"/event_"}>
                <div className={`nav_button text-white sm-flex  ${this.state.events === true && "changed_nav"}`} onClick={this.onEvents}>
                  <div className="p-1   rounded-pill white rounded_point sm-show" />
                  Events
                  </div>
              </Link> :
              <Link onClick={() => this.setState({ error: "Pls select an event from overview" })}>
                <div className={`nav_button text-white sm-flex  ${this.state.events === true && "changed_nav"}`} onClick={this.onEvents}>
                  <div className="p-1   rounded-pill white rounded_point sm-show" />
                  Events
                  </div>
              </Link>
            }
            <Link to="/profile-update">
              <div className={`nav_button sm-flex text-white sm-flex  ${this.state.manage_profile === true && "changed_nav"}`} onClick={this.onManage}>
                <div className="p-1   rounded-pill white rounded_point sm-show" />
                <div> Manage Profile</div>
              </div>
            </Link>
            <Link to="/invitations">
              <div className={`nav_button text-white sm-flex  ${this.state.notify === true && "changed_nav"}`} onClick={this.Notify}>
                <div className="p-1   rounded-pill white rounded_point sm-show" />
                Invitations
          </div>
            </Link>
            <Link to="/payment">
              <div className={`nav_button text-white sm-flex  ${this.state.payment === true && "changed_nav"}`} onClick={this.onPayment}>
                <div className="p-1   rounded-pill white rounded_point sm-show" />
                Payment
            </div>
            </Link>
            < Link to="/payment_history">
              <div className={`nav_button text-white sm-flex  ${this.state.payment_history === true && "changed_nav"}`} onClick={this.onPaymentHistory}>
                <div className="p-1   rounded-pill white rounded_point sm-show" />
                Payment History
            </div>
            </Link>
            {isAdmin === 1 &&
              <>
                <Link to="/admin/manage-members">
                  <div className={`nav_button text-white sm-flex  ${this.state.members === true && "changed_nav"}`} onClick={this.onMember}>
                    <div className="p-1   rounded-pill white rounded_point sm-show" />
                    Manage Members
                  </div>
                </Link>
                <Link to="/admin/settings">
                  <div className={`nav_button text-white sm-flex  ${this.state.transactions === true && "changed_nav"}`} onClick={this.onTransact}>
                    <div className="p-1   rounded-pill white rounded_point sm-show" />
                    {/* Transactions */}
                    Manage Admins
              </div>
                </Link>

                <Link to="/admin/designation">
                  <div className={`nav_button text-white sm-flex  ${this.state.transactions === true && "changed_nav"}`} onClick={this.onTransact}>
                    <div className="p-1   rounded-pill white rounded_point sm-show" />
                    {/* Transactions */}
                    Designations
              </div>
                </Link>

                <Link to="/admin/settings/membership">
                  <div className={`nav_button text-white sm-flex  ${this.state.masters === true && "changed_nav"}`} onClick={this.onMaster}>
                    <div className="p-1   rounded-pill white rounded_point sm-show" />
                    Settings
                  </div>
                </Link>
              </>
            }
            <Link to="/change-password">
              <div className={`nav_button text-white sm-flex  ${this.state.masters === true && "changed_nav"}`} onClick={this.onMaster}>
                <div className="p-1   rounded-pill white rounded_point sm-show" />
                Change Password
            </div>
            </Link>
          </div>

          <div className="show_more text-center rali heart">
          </div>
        </div >
      </>
    )
  }
}
const mapStateToProps = state => ({
  isAdmin: state.user.currentUser.isAdmin,
  nrole: state.user.currentUser.nrole,
  event: state.event.selectedEvent
})
export default connect(mapStateToProps)(Nav_Options)