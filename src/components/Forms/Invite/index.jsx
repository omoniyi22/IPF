import Invite from './Invite'
import { connect } from 'react-redux'
import { Send_Invite, Get_Sent_Invite, Clear_Error } from '../../../redux/actions/inviteActions'

const mapStateToProps = state => ({
  loader: state.load_or_error.pop_loader,
  pop: state.load_or_error.pop,
  pop_data: state.load_or_error.pop_data,

  rejected: state.invite.rejected,
  accepted: state.invite.accepted
})

export default connect(mapStateToProps, {
  Send_Invite, Get_Sent_Invite, Clear_Error
})(Invite)