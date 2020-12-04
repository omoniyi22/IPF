import React, { useEffect, useState } from 'react'
import Download from './../../assets/utiils/download'
import { DateForm, TimeForm } from './../../assets/utiils/date'
import Modal from './Modal'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));


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

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };





  return (
    <>
      <div
        style={{ backgroundImage: `url("${event.banner_image}")` }}
        className="CardTwo  z-depth-1 rounded-lg z-balm">
        <div className="inner flex   metro">
          <div className="left    w-50">
            <div className="title metro  break_2 ">
              {event ? event.event_name : "Please try again"}
            </div>
            <div className="sub_title  metro break_2 ">
              {event ? event.event_details : "Unable to fetch event details"}
            </div>
            {event ?
              <div
                className="button z-depth-1 m-0 px-0 text-capitalize metro text-center soos ">
                <span className="don">
                  <span className="spoaa rounded-pill p-2 px-3 mx-2 z-depth-1"
                    onClick={
                      event ?
                        () => {
                          Download(event.banner_image, event.banner_image)
                        } :
                        () =>
                          console.log("ks;d")
                    }>
                    Download
                </span>
                  <span className="spoaa rounded-pill p-2 px-3 mx-2 z-depth-1" onClick={handleClickOpen}>
                    View
                </span>
                </span>
              </div> :
              <div
                className="button z-depth-1 m-0 px-0 text-capitalize metro text-center soos ">
                <span className="don"> No attachment for donwload</span>
              </div>}
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
        <div className="kopi py-2 break_1 ">Venue: {event && event.event_venue}</div>
      </div>


      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >

        <Modal
          time={`${DateForm(event.event_date) + " " + TimeForm(event.event_time)}`}
          venue={event.event_venue}
          detail={event.event_details}
          title={event.event_name}
          imag={event.banner_image}
          status={event.status}
        />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default CardTwo