import EventPage from './event'
import { Fetch_Event } from "./../../redux/actions/eventsActions";
import { Get_Sent_Invite } from "./../../redux/actions/inviteActions";

import { connect } from 'react-redux'
const mapStateToProps = state => ({
  event: state.event.selectedEvent !== null ? state.event.selectedEvent : undefined,
  event_id: state.event.selectedEvent !== null ? state.event.selectedEvent.event_id : undefined,
  accepted_invite: state.invite.accepted,
  rejected_invite: state.invite.rejected,
  pending_invite: state.invite.pending,
  invite_error: state.invite.invite_error,
  invite_loading: state.invite.invite_loading
})
export default connect(mapStateToProps, { Fetch_Event, Get_Sent_Invite })(EventPage)