import React, { Component } from 'react'

class EventScreen extends Component {
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

    return (
      <div className="EventScreen">
        <div className="inner flex ">
          <div className="oner  heart z-depth-1">
            <div className="icon s border heart rounded-pill z-depth-1">
              <div className="icon_1" />
            </div>
            <div className="text flex-2  mr-auto">
              <div className="text_1  sand_small">
                15,000
                </div>
              <div className="text_2  me">
                Invitation Sent
              </div>
            </div>
          </div>
          <div className="oner t   heart z-depth-1 ">
            <div className="icon s border heart rounded-pill z-depth-1">
              <div className="icon1 fa fa-check text-white" />
            </div>
            <div className="text flex-2  mr-auto">
              <div className="text_1  sand_small">
                45,000
                </div>
              <div className="text_2  me">
                Accepted
              </div>
            </div>
          </div>
          <div className="oner h  heart z-depth-1  ">
            <div className="icon s border heart rounded-pill z-depth-1 ">
              <div className="icon_1" />
            </div>
            <div className="text flex-2  mr-auto">
              <div className="text_1  sand_small">
                2,000
                </div>
              <div className="text_2  me">
                Pending
              </div>
            </div>
          </div>
          <div className="oner  heart z-depth-1  f">
            <div className="icon s border heart rounded-pill z-depth-1 ">
              <div className="icon_1" />
            </div>
            <div className="text flex-2  mr-auto">
              <div className="text_1  sand_small">
                10,000
                </div>
              <div className="text_2  me">
                Pending
              </div>
            </div>
          </div>
          <div className="oner  heart z-depth-1  f g">
            <div className="icon s border heart rounded-pill  z-depth-1">
              <div className="icon_1" />
            </div>
            <div className="text flex-2  mr-auto">
              <div className="text_1  sand_small">
                1.5k
                </div>
              <div className="text_2  me">
                Not Sure
              </div>
            </div>
          </div>
        </div>
        <div className=" home_3 mx- pt-5 pb-3">
          <div className="upcoming_text mb-4 ml-2">
            Invitation Sent
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
      </div>
    )
  }
}
export default EventScreen