import HomePage from "./HomePage"
import { connect } from 'react-redux'
import { Get_All_Event, Select_Event } from './../../redux/actions/eventsActions'
import { Register } from './../../redux/actions/inviteActions'


const mapStateToProps = state => ({
  allEvents: state.event.allEvent,
  isAdmin: state.user.currentUser.isAdmin,
  nrole: state.user.currentUser.nrole,
  closed: state.event.closed,
  active: state.event.active,
  user: state.user.currentUser,

  reg_load: state.register.loading,
  reg_fail: state.register.failed,
  reg_pass: state.register.done
})



export default connect(mapStateToProps, { Get_All_Event, Select_Event, Register })(HomePage)