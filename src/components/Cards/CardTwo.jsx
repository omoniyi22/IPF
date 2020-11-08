import React, { useEffect, useState } from 'react'

const CardTwo = ({ event }) => {

  const calculateTimeLeft = () => {
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    // return () => clearTimeout(timer);
  });








  return (
    <div className="CardTwo  z-depth-1 rounded-lg z-balm">
      <div className="inner flex   metro">
        <div className="left   w-50">
          <div className="title metro ">
            {event ? event.event_name : "Please try again"}
          </div>
          <div className="sub_title  metro ">
            {event ? event.event_details : "Unable to fetch event details"}
          </div>
          <div className="button btn m-0 text-capitalize metro text-center">
            <a href={event && `blob:${event.banner_image}`}>  Download Attachment</a>
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
    </div>
  )
}

export default CardTwo