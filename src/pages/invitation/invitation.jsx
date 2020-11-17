import React, { Component } from 'react'
import VetModal from './../../components/Modal/vetModal/vetModal'
import EventScreen from './../../components/Screens/EventScreen/EventScreeen'

class invitation extends Component {
  constructor(props) {
    super(props)
    this.closeError = this.closeError.bind(this)
    this.state = {
      error: ""
    }
  }
  closeError() {
    this.setState({
      error: ""
    })
  }
  componentDidMount() {
    this.props.Invitations()
  }


  render() {
    let { pop, pop_data, Clear_Error, loader, changeStatus } = this.props



    let { invitations, loading, error, accepted_invitation, invitatio, rejected_invitation, pending_invitation, } = this.props
    console.log({ invitations, loading, error, accepted_invitation, rejected_invitation, pending_invitation })
    return (
      <>
        {
          this.state.error === true &&
          <VetModal closeError={this.closeError} classx={"pachee"} error={pop === true ? pop_data.data : error} clas={"JOEUI"} clos={"JOE"} />
        }

        {
          pop &&
          <VetModal closeError={Clear_Error} error={pop_data.data} classx={pop_data.status} clas={"JOEUI"} clos={"JOE"} />
        }

        {
          loader &&
          <VetModal closeError={() => console.log("hola")} error={pop_data.data} loading={loader} classx={pop_data.status} clas={"JOEUI"} clos={"JOE"} />
        }
        <div>

          <EventScreen invitatio={true}
          changeStatus={changeStatus}
            rejected_invite={rejected_invitation} accepted_invite={accepted_invitation} invitatio={true}
            pending_invite={pending_invitation} invite_error={error} invite_loading={loading}
          />
        </div>
      </>
    )
  }
}

export default invitation