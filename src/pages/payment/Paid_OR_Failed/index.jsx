import { withRouter } from 'react-router-dom'
import { Okay } from "./../../../redux/actions/payment"
import Result from './Result'
import { connect } from 'react-redux'
const mapStateToProps = state => ({
  error: state.payment.error,
  response: state.payment.response,
  loading: state.payment.loading
})

export default withRouter(connect(mapStateToProps, { okay: Okay })(Result))