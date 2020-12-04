import React, { Component } from 'react'
import './modal.scss'

export default class Modal extends Component {
  render() {
    let { time,
      venue,
      detail,
      title,
      imag, status } = this.props
    return (
      <div className=" p-3 dedom">
        <div className="sstt text-center pt-1 pb-2 font-weight-light">
          <span className="text-success pr-2">NOTE :</span>
          {status === "active" ? "This is an upcoming event" :
            "This event has passed"
          }
        </div>
        <div className=" tones header lead metro font-weight-bold white px-0 mx-0 mb-2 pb-1">
          {title}
        </div>
        {/* <div className="opac ">
          <span className="conis fa fa-clipboard font-light-light"></span>
          <span className="jo">
            {ti}
          </span>
        </div> */}
        <div className="opac ">
          <span className="coni fa fa-clock font-light-light"></span>
          <span className="jo">
            {time}
          </span>
        </div>
        <div className="opac ">
          <span className="con fa fa-map-marker-alt font-light-light text-success"></span>
          <span className="jo">
            {venue}
          </span>
        </div>
        <img src={imag || require('./../../assets/medias/land_svg.png')} width="100%" alt="" />

        <div className="contaa">
          {detail}
        </div>
      </div>
    )
  }
}
