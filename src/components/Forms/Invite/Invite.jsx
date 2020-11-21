import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { EmailVet } from "./../../../assets/utiils/vet";
import VetModal from './../../../components/Modal/vetModal/vetModal'

class InviteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      close: "zoomIn",
      move: "move",
      error: "",
      email: ""
    }
    this.onMove = this.onMove.bind(this)
    this.unMove = this.unMove.bind(this)
    this.closeError = this.closeError.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit() {
    if (EmailVet(this.state.email) === false)
      this.setState({
        error: "Please enter a valid address"
      })
    else {
      this.props.Send_Invite(this.state.email)
    }
  }

  closeError() {
    this.setState({
      error: ""
    })
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
    let { error } = this.state
    let { pop, pop_data, Clear_Error, loader, edit, event } = this.props
    return (
      <>
        {error &&
          <VetModal closeError={this.closeError} error={pop === true ? pop_data.data : error} />
        }

        {pop &&
          <VetModal closeError={Clear_Error} error={pop_data.data} classx={pop_data.status} />
        }

        {loader &&
          <VetModal closeError={() => console.log("hola")} error={pop_data.data} loading={loader} classx={pop_data.status} />
        }


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
            <input type="text" className="form-control rounded-sm" onChange={this.onChange} value={this.state.email} name="email" />
            <div className="  six_form_row sdle col_2 flex ml-auto w-fit">
              <div className="inner   text-white text-left  mr-2">
                <button
                  onClick={() => {
                    this.setState({
                      close: "zoomOut",
                      move: ""
                    })
                    setTimeout(() => {
                      this.props.history.goBack()
                    }, 290);
                  }} className="btn eppes btn-sm m-0 h-100 w-100 flex p-0">
                  <div className="fa fa-times heart text-white " />
                  <div className="text f ml-2 heart  h-100 text-white ">
                    <span className="text-white">Close</span>
                  </div>
                </button>
              </div>
              <div className="inner  text-white text-left ">
                <button
                  onClick={this.onSubmit}
                  className="btn eppe btn-sm m-0 h-100 w-100 flex p-0">
                  <div className="fa  fa-plus heart text-white" />
                  <div className="text small ml-1 heart lens h-100 text-white">
                    Send <span className=" text-white sm_go">Invite</span>
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