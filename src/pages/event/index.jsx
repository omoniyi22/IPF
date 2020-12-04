import EventPage from './event'
import { Fetch_Event, Delete, Close_Event } from "./../../redux/actions/eventsActions";
import { Get_Sent_Invite } from "./../../redux/actions/inviteActions";

import { connect } from 'react-redux'
const mapStateToProps = state => ({
  event: state.event.selectedEvent !== null ? state.event.selectedEvent : undefined,
  event_id: state.event.selectedEvent !== null ? state.event.selectedEvent.event_id : undefined,
  accepted_invite: state.invite.accepted,
  rejected_invite: state.invite.rejected,
  pending_invite: state.invite.pending,
  not_sure: state.invite.not_sure,
  invite_error: state.invite.invite_error,
  invite_loading: state.invite.invite_loading,
  isAdmin: state.user.currentUser.isAdmin,
  deleted: state.event.deleted,
  del_load: state.event.del_load,


  close_load: state.event.closed_load,
  close_pass: state.event.close_pass,
  close_error: state.event.close_error,
  statu: state.event.selectedEvent !== null ? state.event.selectedEvent.status : undefined,


})
export default connect(mapStateToProps, { Fetch_Event, Delete, Get_Sent_Invite, Close_Event })(EventPage)