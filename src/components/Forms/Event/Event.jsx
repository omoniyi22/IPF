import React, { Component } from 'react'
import Form from './Form'
import Preview from './Preview'
import { Link, withRouter } from 'react-router-dom'
import { vetEvent } from './../../../assets/utiils/vet'
import VetModal from './../../../components/Modal/vetModal/vetModal'



class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      close: "zoomIn",
      move: "",
      data: {},
      error: ""
    }
    this.closeError = this.closeError.bind(this)
    this.onMove = this.onMove.bind(this)
    this.unMove = this.unMove.bind(this)
    this.loadData = this.loadData.bind(this)
    this.onVet = this.onVet.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.setState({
      close: "zoomOut",
      move: ""
    })
    setTimeout(() => {
      this.props.history.goBack()
    }, 290);
  }

  closeError() {
    this.setState({
      error: ""
    })
  }
  onMove() {
    if (vetEvent(this.state.data)[0] === true) {
      this.setState({
        move: "move"
      })
    } else {
      this.setState({
        error: vetEvent(this.state.data)[1]
      })
    }
  }
  onVet(data, reminder_date) {
    if (vetEvent({ ...data, except: true })[0] === true) {
      if (reminder_date === "") {
        this.setState({
          error: "Please add your reminder date"
        })
      } else {
        return true
      }
    } else {
      this.setState({
        error: vetEvent(data)[1]
      })
    }
  }
  unMove() {
    this.setState({
      move: "mov"
    })
  }

  loadData(data) {
    this.setState({
      data
    })
  }

  render() {
    let { error } = this.state
    let { create, Create_Event, Edit_Event, pop, pop_data, Clear_Error, loader, edit, event } = this.props
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
          onClick={this.closeModal}
        />
        <div className={`event-form heart ${this.state.close} faster animated white width z-depth-1`}
        >
          <div className="form_1  flex  white w-100 ">
            <div className={`pincher going ${this.state.move} px-1 h-fit my-auto`}>
              <Form onVet={this.onVet} move={this.onMove} title={this.props.title} load_data={this.loadData} closeModal={this.closeModal} event={(edit === true && event !== null) && event} />
            </div>
            <div className="pincher go px-1">
              <Preview unmove={this.unMove} edit={edit} data={this.state.data} create={create ? Create_Event : Edit_Event} event={(edit === true && event !== null) && event} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(EventForm)