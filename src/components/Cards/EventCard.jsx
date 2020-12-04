import React, { Component } from 'react'
import { DateForm, TimeForm } from './../../assets/utiils/date'
import Loader from 'react-loader-spinner'
import { getInvites, sendInvites, sendMemInvites, invitations, noOFmem } from '../../services/all_service'

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



class EventCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reg_fail: false,
      reg_pass: false,
      reg_load: true,
      no: 0

    }
    this.Register = this.Register.bind(this)
    this.close = this.close.bind(this)
  }
  close() {
    this.setState({
      reg_fail: false
    })
  }
  async  Register() {
    this.setState({ reg_load: true })
    try {
      let data = {
        "event_id": this.props.event.event_id,
        "email": this.props.user.emailAddress
      }
      let member_id
      if (this.props.user.isAdmin === 1) {
        member_id = await sendInvites(data)
      } else {
        member_id = await sendMemInvites(data)
      }
      console.log({
        "event_id": this.props.event.event_id,
        "email": this.props.user.email
      })
      member_id = await member_id.data
      console.log({ member_id })
      this.setState({ reg_pass: true, reg_fail: false, reg_load: false })
    } catch (error) {
      console.log({ error: error.response })
      this.setState({ reg_fail: true, reg_pass: false, reg_load: false })
    }
  }

  async componentDidMount() {
    noOFmem(this.props.event.event_id, this)
    try {
      let member_id = await invitations()
      member_id = await member_id.data
      member_id = await member_id.data
      member_id = member_id.some(dat => dat.event_id === this.props.event.event_id)
      console.log({ member_id })
      if (member_id === true) {
        this.setState({ reg_pass: true })
      }
    } catch (error) {
      console.log(error.response)
    } finally {
      this.setState({ reg_load: false })
    }
  }



  render() {
    let { event, isAdmin } = this.props
    let { reg_load, reg_pass, reg_fail, no } = this.state
    return (
      <>
        <div className="EventCard mx-0  white">
          <div className="card_pix"
            style={{ backgroundImage: `url(${event.banner_image || require('./../../assets/medias/land_svg.png')})` }}

          />
          <div className="EC_content  metro">
            <div className="EC_title metro">
              {event.event_name}
            </div>
            <div className="EC_date metro py-1 small">
              {DateForm(event.event_date
              )} {TimeForm(event.event_time)}
            </div>
            {isAdmin === 1 &&
              <div className="EC_members metro">
                {no} members acecepted invitations
          </div>}
            <div className="EC_down flex ">
              {/* {
                reg_load === true ?
                  < button className="rounded-pill text-center z-depth-1 ovin">
                    <Loader
                      type="ThreeDots"
                      color="white"
                      height={14}
                      width={14}
                      secondaryColor={"white"}
                    />
                  </button> :
                  <>{reg_fail === true ?
                    < button className="rounded-pill text-center z-depth-1 ovin"
                      onClick={this.Register}
                    >
                      Register
                    </button>
                    :
                    <>
                      {reg_pass === true ?
                        <div className="rounded-pill text-center  soab white text-black">
                          You have been registered
                   </div> :
                        < button className="rounded-pill text-center z-depth-1 ovin"
                          onClick={this.Register}
                        >
                          Register
                   </button>

                      }
                    </>
                  }
                  </>

              } */}
              {/* <div className=" circle-box flex flex-2 mt-2">
              <div className="circum  rounded-pill  ml-auto " />
              <div className="circum border rounded-pill  " />
              <div className="circum z-depth-1 rounded-pill white heart">
                <span className="fa fa-angle-right" />
              </div>
            </div> */}
              <div>
              </div>
            </div>
          </div>
        </div >

        <Snackbar open={this.state.reg_fail} autoHideDuration={3600} onClose={this.close}>
          <Alert onClose={this.close} severity={"error"}>
            <span style={{ fontWeight: "bold" }}>{this.state.reg_fail && "Registration Failed, Try Again"}</span>
          </Alert>
        </Snackbar>

      </>


    )
  }
}


export default EventCard