import React, { Component } from 'react'
import Form from './Form'
import Preview from './Preview'
import { Link, withRouter } from 'react-router-dom'

class EventForm extends Component {
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
              this.props.history.push("/")
            }, 290);
          }}
        />
        <div className={`event-form heart ${this.state.close} faster animated white width z-depth-1`}
        >
          <div className="form_1  flex  white w-100 ">
            <div className={`pincher going ${this.state.move} px-1`}>
              <Form move={this.onMove} />
            </div>
            <div className="pincher go px-1">
              <Preview unmove={this.unMove} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(EventForm)