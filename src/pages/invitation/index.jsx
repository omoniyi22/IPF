import { connect } from 'react-redux'
import { Invitations, changeStatus, Clear_Error } from '../../redux/actions/inviteActions'
import Inviting from './invitation'
const mapSateToProps = state => ({
  invitations: state.invite.invitations,
  loading: state.invite.loading,
  error: state.invite.error,
  accepted_invitation: state.invite.accepted_invitation,
  rejected_invitation: state.invite.rejected_invitation,
  pending_invitation: state.invite.pending_invitation,

  loader: state.load_or_error.pop_loader,
  pop: state.load_or_error.pop,
  pop_data: state.load_or_error.pop_data,


})

export default connect(mapSateToProps, { Invitations,  Clear_Error, changeStatus })(Inviting)