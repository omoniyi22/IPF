import HomePage from "./HomePage"
import { connect } from 'react-redux'
import { Get_All_Event, Select_Event } from './../../redux/actions/eventsActions'

const mapStateToProps = state => ({
  allEvents: state.event.allEvent
})



export default connect(mapStateToProps, { Get_All_Event, Select_Event })(HomePage)