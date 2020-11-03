import Event from './Event'
import { connect } from 'react-redux'
import { Create_Event, Clear_Error, Edit_Event } from "./../../../redux/actions/eventsActions";
const mapStateToProps = (state) => ({
  loader: state.load_or_error.pop_loader,
  pop: state.load_or_error.pop,
  pop_data: state.load_or_error.pop_data,
  event: state.event.selectedEvent
})

export default connect(mapStateToProps, {  Create_Event, Clear_Error, Edit_Event })(Event)
