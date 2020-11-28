import React, { useEffect, useState } from 'react'
import Download from './../../assets/utiils/download'
import { DateForm, TimeForm } from './../../assets/utiils/date'
const CardTwo = ({ event }) => {

  const calculateTimeLeft = () => {

    if (event && event.event_date) {

      let difference = +new Date(event ? event.event_date.slice(0, 10) : "2020-11-07T00:00:00.000Z".slice(0, 10)) - +new Date();
      let timeLeft = {};
      // if (difference > 0) {
      timeLeft = {
        days: Number(Math.floor(difference / (1000 * 60 * 60 * 24))) > 1 ? Number(Math.floor(difference / (1000 * 60 * 60 * 24))) : 0,
        hours: Number(Math.floor((difference / (1000 * 60 * 60)) % 24)) > 1 ? Number(Math.floor((difference / (1000 * 60 * 60)) % 24)) : 0,
        minutes: Number(Math.floor((difference / 1000 / 60) % 60)) > 1 ? Number(Math.floor((difference / 1000 / 60) % 60)) : 0,
        seconds: Number(Math.floor((difference / 1000) % 60)) > 1 ? Number(Math.floor((difference / 1000) % 60)) : 0
      };
      // }
      return timeLeft;
    }
    return 0

  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    // return () => clearTimeout(timer);
  });







  return (
    <div
      style={{ backgroundImage: `url("${event.banner_image}")` }}
      className="CardTwo  z-depth-1 rounded-lg z-balm">
      <div className="inner flex   metro">
        <div className="left    w-50">
          <div className="title metro ">
            {event ? event.event_name : "Please try again"}
          </div>
          <div className="sub_title  metro ">
            {event ? event.event_details : "Unable to fetch event details"}
          </div>
          <div
            onClick={
              event ?
                () => {
                  Download(event.banner_image, event.banner_image)
                } :
                () =>
                  console.log("ks;d")
            } className="button z-depth-1 m-0 px-0 text-capitalize metro text-center soos ">
            <span className="don">    {event ? "Download Attachment" : "No attachment for donwload"}</span>
          </div>
        </div>
        <div className="right  w-50">
          <div className="circles  h-fit mt-auto mb-4 w-100">
            <div className="circle_one border rounded-pill heart z-depth-2">
              <div>
                <div className="days text-center ">{timeLeft.days}</div>
                <div className="tine  text-center ">Days</div>
              </div>
            </div>
            <div className="circle_one border rounded-pill heart z-depth-2">
              <div>
                <div className="days text-center ">{timeLeft.hours}</div>
                <div className="tine  text-center ">Hours</div>
              </div>
            </div>
            <div className="circle_one border rounded-pill heart z-depth-2">
              <div>
                <div className="days text-center ">{timeLeft.minutes}</div>
                <div className="tine  text-center ">Minutes</div>
              </div>
            </div>
            <div className="circle_one border rounded-pill heart z-depth-2">
              <div>
                <div className="days text-center ">{timeLeft.seconds}</div>
                <div className="tine  text-center ">Seconds</div>
              </div>
            </div>


          </div>
        </div>
      </div>
      <div className="kopiu py-2 break_1 ">Time: {DateForm(event.event_date)} {TimeForm(event.event_time)}</div>
      <div className="kopi py-2 break_2 ">Venue: {event && event.event_venue} 90, Kuffo Street, Ayobo, Lagos</div>
    </div>
  )
}

export default CardTwo