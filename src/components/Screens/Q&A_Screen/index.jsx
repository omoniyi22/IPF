import { connect } from 'react-redux'
import Q_A from './Q&A_Screen'
import {
  sendQuestion, getAllQuestions
} from './../../../redux/actions/QandA_actions'

const mapStateToProps = state => ({
  loading: state.Q_A.loading,
  error: state.Q_A.error,
  que: state.Q_A.que,
  ques: state.Q_A.ques,
  user_id: state.user.currentUser.id
})

export default connect(mapStateToProps, {
  sendQuestion, getAllQuestions
})(Q_A)