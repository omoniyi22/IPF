import React, { Component } from 'react'

class CardTwo extends Component {
  render() {
    return (
      <div className="CardTwo  z-depth-1 rounded-lg z-balm">
        <div className="inner flex   metro">
          <div className="left   w-50">
            <div className="title metro ">
              All Tech Conference
            </div>
            <div className="sub_title  metro ">
              Short Description
            </div>
            <div className="button btn m-0 text-capitalize metro text-center">
              Download Attachment
            </div>
          </div>
          <div className="right  w-50">
            <div className="circles  h-fit mt-auto mb-4 w-100">
              <div className="circle_one border rounded-pill heart z-depth-2">
                <div>
                  <div className="days text-center ">10</div>
                  <div className="tine  text-center ">Days</div>
                </div>
              </div>
              <div className="circle_one border rounded-pill heart z-depth-2">
                <div>
                  <div className="days text-center ">20</div>
                  <div className="tine  text-center ">Hours</div>
                </div>
              </div>
              <div className="circle_one border rounded-pill heart z-depth-2">
                <div>
                  <div className="days text-center ">23</div>
                  <div className="tine  text-center ">Minutes</div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CardTwo