import HomePage from "./HomePage"
import { connect } from 'react-redux'
import { Get_All_Event, Select_Event } from './../../redux/actions/eventsActions'

const mapStateToProps = state => ({
  allEvents: state.event.allEvent,
  isAdmin: state.user.currentUser.isAdmin,
  nrole: state.user.currentUser.nrole,
  closed: state.event.closed,
  active: state.event.active,
  user: state.user.currentUser
})



export default connect(mapStateToProps, { Get_All_Event, Select_Event })(HomePage)