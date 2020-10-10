import React, { Component } from 'react'
import EventCard from '../../components/Cards/EventCard'
import LandingCard from '../../components/Cards/LandingCard'
import EventTable from '../../components/Tables/Event/Event'
import EventForm from '../../components/Forms/Event'
import Switch from './../../utils/Switch'
import { Link } from 'react-router-dom'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matter: "",
      position: true
    }
    this.move = this.move.bind(this)
    this.moveOut = this.moveOut.bind(this)
  }
  move() {
    this.setState({
      position: true
    })
  }
  moveOut() {
    this.setState({
      position: false
    })
  }
  render() {
    let swit = Switch(EventForm)
    return (
      <div className={`${swit[2]} `}>
        <div className="home1 ">
          <LandingCard />
          <div className=" my-4 mt-5 mb-4 h4 metro font-weight-bold">
            <div className="  home_2 mx-0">
              <div className="upcoming_text mb-4 ml-1">
                Upcoming Events
              </div>
              <div className="flex my_events_card">
                <div className="seprate w-50 pr-1 ">
                  <EventCard />
                </div>
                <div className="seprate w-50 pl-1 ">
                  <EventCard />
                </div>
              </div>
            </div>
            <div className=" home_3 mx- pt-5 pb-3">
              <div className="upcoming_text mb-4 ml-2">
                Events
            </div>
              <div className="home_3b flex-2 flex mt-1 mb-2">
                <div className=" home_header ">
                  <div className="flex awls small font-weight-light">
                    <div className={`other_Events px-2 pnt ${this.state.position}`} onClick={this.move}>
                      Other Events
                  </div>
                    <div className={`view_all px-3 pnt ${!this.state.position}`} onClick={this.moveOut}>
                      All Events
                </div>
                  </div>
                  <div className="lines  rounded-pill">
                    <div className={`rounded-pill lines_move w-50  ${this.state.position}`} />
                  </div>
                </div>
                <div class="download active   px-2 py-1 small dropdown">
                  <div id="dropdownMenu1" className="download_icon mx-auto pr-3" data-toggle="dropdown" />
                  <div className="flex">
                    <select className="border-0 text-center mx-auto">
                      <option className="text-center w-100 mx-auto">
                        Download As
                      </option>
                      <option className="text-center w-100 mx-auto">
                        PDF
                      </option>
                      <option className="text-center w-100 mx-auto">
                        DOCX
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <EventTable />
                <EventTable />
                <EventTable />
              </div>
            </div>
          </div>
        </div>
        <div className={`${swit[1]} heart`}>
          {swit[0]}
        </div>
      </div>

    )
  }
}
export default HomePage