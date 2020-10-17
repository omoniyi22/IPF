import Members from './member'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  hello: null
})

export default connect(mapStateToProps)(Members)