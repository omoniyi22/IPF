import Members from './member'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  user: state.user.currentUser
})

export default connect(mapStateToProps)(Members)