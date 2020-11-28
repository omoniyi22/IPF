import React, { Component } from 'react'
class Preview extends Component {
  render() {
    let {
      event,
      data: {
        event_name,
        event_details,
        event_date,
        event_time,
        event_venue,
        reminder,
        reminders,
        banner_image,
        set_reminder,
        meridiem,
        file,
        reminder_date,
        reminder_body },
      edit,
      create } = this.props
    return (
      <div className="Preview  text-left  ">
        <div className="preview_title mt-3 text-left">
          Preview
        </div>
        <div className="row_1  ">
          <div className="w-50  first">
            <div className="w-1 border-bottom">
              <div className="name">Event Name</div>
              <div className="r_name">{event_name}</div>
            </div>
          </div>
          <div className="flue  w-50  ">
            <div className="w-1 border-bottom one w-50">
              <div className="date">Event date</div>
              <div className="r_date">{event_date}</div>
            </div>
            <div className="w-1 border-bottom w-50">
              <div className="time">Time</div>
              <div className="r_time">{event_time}</div>
            </div>
          </div>
        </div>



        <div className="row_2 ">
          <div className="w-50  first">
            <div className="w-1 border-bottom">
              <div className="name">Event Details</div>
              <div className="r_name">{event_details}</div>
            </div>
          </div>


          <div className="w-50  first">
            <div className="w-1 border-bottom">
              <div className="name">Event Venue</div>
              <div className="r_name">{event_venue}</div>
            </div>
          </div>
        </div>

        <div className="row_2 ">
          <div className="flue  w-50">
            <div className="flex-2 border-bottom">
              <div className="date">Attachment</div>
              <div className="r_date">{file && file.original_filename}</div>
            </div>
          </div>
        </div>

        {reminder_body && <div className="row_3 ">
          <div className="border-bottom pb-2 flex-2">
            <div className="w-1 ">
              <div className="name">Reminder Body</div>
              <div className="r_name">
                {reminder_body}
              </div>
            </div>
          </div>
        </div>}


        <div className="row_2 awow">
          {reminder &&
            reminder.map(time =>
              <div className="w-50 borde first  bpp">
                <div className="w-1 border-bottom">
                  <div className="name">Reminder Date</div>
                  <div className="r_name">{time}</div>
                </div>
              </div>
            )}
        </div>
        {/* <div className="flue  w-50">
            <div className="flex-2 border-bottom">
              <div className="date">Other Reminder</div>
              <div className="r_date">2 weeks</div>
            </div>
          </div> */}
        <div className="  six_form_row sdle col_2 flex ml-auto w-fit">
          <div className="inner   text-white text-left  mr-2">
            <button
              onClick={this.props.unmove}
              className="btn eppes btn-sm m-0 h-100 w-100 flex p-0">
              <div className="fa fa-arrow-left heart text-white " />
              <div className="text f ml-2 heart lens h-100  text-white">
                Go Back
                  </div>
            </button>
          </div>
          <div className="inner  text-white text-left ">
            <button
              onClick={() => {
                set_reminder === true
                  ? create({
                    event_name,
                    event_details,
                    event_date,
                    event_time,
                    banner_image,
                    reminder,
                    reminder_body
                  },
                    event && event.event_id
                  ) :
                  create({
                    event_name,
                    event_details,
                    event_date,
                    event_time,
                    banner_image
                  },
                    event && event.event_id
                  )
              }}
              className="text-uppercase border-white eppe w-fit btn-sm m-0 h-100 w-100 flex p-0">
              <div className="fa  fa-plus heart text-white pr-1" />
              <div className="text  ml-1 heart lens h-100 w-fit text-white">
                {edit ?
                  <div className="flex"><div>Edit</div> <div className="pl-1">Event</div> </div> :
                  <div className="flex"><div>Create</div> <div className="pl-1">Event</div> </div>}
              </div>
            </button>
          </div>
        </div>



      </div>
    )
  }
}

export default Preview