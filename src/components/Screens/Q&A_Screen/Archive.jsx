import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getArchieves } from './../../../redux/actions/arch_action'
import ChatLoad from './../../Loaders/chat_loader'
import Loader from 'react-loader-spinner'
import Question from './../../Question/Question'

class Archive extends Component {

  componentDidMount() {
    this.props.getArchieves()
  }
  render() {
    let { loading, error, ques, que, user_id } = this.props
    return (
      <>

        {loading === false ?
          <div>
            {
              error === false ?
                <>
                  {
                    ques.length < 1 ?
                      <div className="empty_archive heart">
                        <div>
                          <div className="title">Archive is Empty</div>
                          <div className="content px-3">
                            You can archive questions in the
                              Live tab after they  were answered
                             or are no longer relevant.
                          </div>
                        </div>
                      </div> :
                      <>
                        {ques.map((data, index) => (<Question data={data} edit={this.editQuestion} kin={Number(index)} user={user_id} />))}
                      </>
                  }
                </> :
                <div className="polads heart h-100 w-100 text-center">
                  An Error Occured
                </div>
            }
          </div> :
          <div>
            {<ChatLoad user={user_id} />}
          </div>
        }

      </>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.arch.loading,
  error: state.arch.error,
  que: state.arch.que,
  ques: state.arch.ques,
  user_id: state.user.currentUser.id
})
export default connect(mapStateToProps, { getArchieves })(Archive)