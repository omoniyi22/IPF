import React, { Component } from 'react'
import { DateForm, TimeForm } from './../../assets/utiils/date'
import Loader from 'react-loader-spinner'
import { getInvites, sendInvites, sendMemInvites, invitations, noOFmem } from '../../services/all_service'

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
  }

  async  Register() {
    this.setState({ reg_load: true })
    try {
      let data = {
        "event_id": this.props.event.event_id,
        "email": this.props.user.email
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
    let { event } = this.props
    let { reg_load, reg_pass, reg_fail, no } = this.state
    return (
      <div className="EventCard mx-0 ">
        <div className="card_pix"
          style={{ backgroundImage: `url(${require('./../../assets/medias/land_svg.png')})` }}
        />
        <div className="EC_content  metro">
          <div className="EC_title metro">
            {event.event_name}
          </div>
          <div className="EC_date metro py-1 small">
            {DateForm(event.event_date
            )} {TimeForm(event.event_time)}
          </div>
          <div className="EC_members metro">
            {no} members acecepted invitations
          </div>
          <div className="EC_down flex ">
            {
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
                    Try Again
                    </button>
                  :
                  <>
                    {reg_pass === true ?
                      < button className="rounded-pill text-center z-depth-1 ovin">
                        You are Registered already
                   </button> :
                      < button className="rounded-pill text-center z-depth-1 ovin"
                        onClick={this.Register}
                      >
                        Register
                   </button>

                    }
                  </>
                }
                </>

            }
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
    )
  }
}


export default EventCard