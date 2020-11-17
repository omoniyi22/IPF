import { connect } from 'react-redux'
import { PayNeeds, Pay } from '../../../redux/actions/payment'

import Annual_Sub from './Annual_Sub'
const mapStateToProps = state => ({
  list_loading: state.payment.list_loading,
  card_list: state.payment.card_list,
  fee_list: state.payment.fee_list,
  list_failed: state.payment.list_failed
})
export default connect(mapStateToProps, { PayNeeds, Pay })(Annual_Sub)