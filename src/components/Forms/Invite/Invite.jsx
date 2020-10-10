import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class InviteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      close: "zoomIn",
      move: "move"
    }
    this.onMove = this.onMove.bind(this)
    this.unMove = this.unMove.bind(this)
  }

  onMove() {
    this.setState({
      move: "move"
    })
  }
  unMove() {
    this.setState({
      move: "mov"
    })
  }
  render() {

    return (
      <>
        <div className="backup h-100 w-100 text-init "
          onClick={() => {
            this.setState({
              close: "zoomOut",
              move: ""
            })
            setTimeout(() => {
              this.props.history.goBack()
            }, 290);
          }}
        />
        <div className={`white invitation_form  text-left z-depth-1 ${this.state.close} faster animated white width z-depth-1`}>
          <div className="title ">
            Send a personal Invite
          </div>
          <div className="form ">
            <div className="form_iti">Member E-mail</div>
            <input type="text" className="form-control rounded-sm" />
            <div className="  six_form_row sdle col_2 flex ml-auto w-fit">
              <div className="inner   text-white text-left  mr-2">
                <button
                  onClick={this.props.unmove}
                  className="btn eppes btn-sm m-0 h-100 w-100 flex p-0">
                  <div className="fa fa-times heart " />
                  <div className="text f ml-2 heart  h-100">
                    Close
                  </div>
                </button>
              </div>
              <div className="inner  text-white text-left ">
                <button
                  onClick={this.props.move}
                  className="btn eppe btn-sm m-0 h-100 w-100 flex p-0">
                  <div className="fa  fa-plus heart " />
                  <div className="text  ml-1 heart lens h-100">
                    Send Invite
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(InviteForm)