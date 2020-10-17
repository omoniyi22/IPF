import React, { Component } from 'react'
class Preview extends Component {
  render() {
    return (
      <div className="Preview  text-left  ">
        <div className="preview_title mt-3 text-left">
          Preview
        </div>
        <div className="row_1  ">
          <div className="w-50  first">
            <div className="w-1 border-bottom">
              <div className="name">Event Name</div>
              <div className="r_name">Global Leader Summit</div>
            </div>
          </div>
          <div className="flue  w-50  ">
            <div className="w-1 border-bottom one w-50">
              <div className="date">Event date</div>
              <div className="r_date">September 20, 2020</div>
            </div>
            <div className="w-1 border-bottom w-50">
              <div className="time">Time</div>
              <div className="r_time">10:00 AM</div>
            </div>
          </div>
        </div>

        <div className="row_2 ">
          <div className="w-50  first">
            <div className="w-1 border-bottom">
              <div className="name">Event Name</div>
              <div className="r_name">Event Name</div>
            </div>
          </div>
          <div className="flue  w-50">
            <div className="flex-2 border-bottom">
              <div className="date">Event date</div>
              <div className="r_date">Event date</div>
            </div>
          </div>
        </div>
        <div className="row_3 ">
          <div className="border-bottom pb-2 flex-2">
            <div className="w-1 ">
              <div className="name">Reminder Body</div>
              <div className="r_name">
                This is to remind you of the upcoming Global Leader Summit
               event happening on September 20. If you have not
                confirmed your attendance. Please Kindly do.
              </div>
            </div>
          </div>
        </div>


        <div className="row_2">
          <div className="w-50 borde first">
            <div className="w-1 border-bottom">
              <div className="name">Reminder Date</div>
              <div className="r_name">12/10/2020</div>
            </div>
          </div>
          <div className="flue  w-50">
            <div className="flex-2 border-bottom">
              <div className="date">Other Reminder</div>
              <div className="r_date">2 weeks</div>
            </div>
          </div>
        </div>
        <div className="  six_form_row sdle col_2 flex ml-auto w-fit">
          <div className="inner   text-white text-left  mr-2">
            <button
              onClick={this.props.unmove}
              className="btn eppes btn-sm m-0 h-100 w-100 flex p-0">
              <div className="fa fa-arrow-left heart " />
              <div className="text f ml-2 heart lens h-100">
                Go Back
                  </div>
            </button>
          </div>
          <div className="inner  text-white text-left ">
            <button
              onClick={this.props.move}
              className="btn eppe btn-sm m-0 h-100 w-100 flex p-0">
              <div className="fa  fa-plus heart " />
              <div className="text  ml-1 heart lens h-100">
                Create Event
                  </div>
            </button>
          </div>
        </div>



      </div>
    )
  }
}

export default Preview