import React, { Component } from 'react'
import { DateForm, TimeForm } from './../../assets/utiils/date'
import Loader from 'react-loader-spinner'


class EventCard extends Component {
  render() {
    let { event, Register, reg_load, reg_pass, reg_fail } = this.props
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
            {event.event_members || "event_members"}
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
                    onClick={Register}
                  >
                    Try Again
                    </button>
                  :
                  <>
                    {reg_pass === true ?
                      < button className="rounded-pill text-center z-depth-1 ovin">
                        Registered
                   </button> :
                      < button className="rounded-pill text-center z-depth-1 ovin"
                        onClick={Register}
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