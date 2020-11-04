import EventPage from './event'
import { Fetch_Event } from "./../../redux/actions/eventsActions";

import { connect } from 'react-redux'
const mapStateToProps = state => ({
  event: state.event.selectedEvent !== null ? state.event.selectedEvent : undefined,
  event_id: state.event.selectedEvent !== null ? state.event.selectedEvent.event_id : undefined
})
export default connect(mapStateToProps, { Fetch_Event })(EventPage)