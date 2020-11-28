import React, { Component } from 'react'
import { fontSize } from '@material-ui/system'
import { withRouter } from 'react-router-dom'
import { ReminderFormat } from './../../../assets/utiils/vet'

const up_icon = require("./up_icon.png")

class Form extends Component {
  min
  constructor(props) {
    super(props)
    this.min = new Date().toISOString().split("T")[0];
    this.state = {
      event_name: this.props.event.event_name ? this.props.event.event_name : "",
      event_details: this.props.event.event_details ? this.props.event.event_details : "",
      event_date: this.props.event.event_date ? this.props.event.event_date.slice(0, 10) : "",
      event_time: this.props.event.event_time ? this.props.event.event_time : "",
      reminder: this.props.event.reminder ? ReminderFormat(this.props.event.reminder) : [],
      banner_image: this.props.event.banner_image ? this.props.event.banner_image : "",
      set_reminder: this.props.event.reminder ? true : false,
      meridiem: this.props.event.meridiem ? this.props.event.meridiem : "AM",
      file: this.props.event.banner_image ? { original_filename: this.props.event.banner_image } : null,
      reminder_date: this.props.event.reminder_date ? this.props.event.reminder_date : "",
      reminder_body: this.props.event.reminder_body ? this.props.event.reminder_body : "",
      event_venue: this.props.event.event_venue ? this.props.event.event_venue : ""
    }
    this.onChange = this.onChange.bind(this)
    this.onUpload = this.onUpload.bind(this)
    this.uploadWidget = this.uploadWidget.bind(this)
  }

  onUpload(e) {
    if (e.target.files.length > 0) {
      this.setState({
        file: e.target.files[0],
        banner_image: e.target.files[0].name
      })
    }
  }

  uploadWidget = () => {
    const $this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: "dnevwxinm", upload_preset: "onfjtj7b", tags: ["xmas"] },
      function (error, result) {
        if (error) {
          return console.log(error);
        }
        $this.setState({
          file: result[0],
          banner_image: result[0].url,
        });
      }
    );
  };


  onChangeDate() {
    this.setState({
      event_time: () => {
        if (this.state.meridiem === "PM") {
          return (Number(this.state.event_date) * 12).toString()
        } else
          return (Number(this.state.event_date) * 1).toString() + ":00"
      }
    })
  }


  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let {
      set_reminder, event_name, event_venue, event_date, event_details, reminder_body,
      event_time, reminder, banner_image, file, reminder_date
    } = this.state
    let { onVet, closeModal } = this.props
    return (
      <div className=" text-left  form_1 h-fit">
        <div className="form_title py-1">
          {this.props.title !== true ? "Create Event" : "Edit Event"}
        </div>
        <div className="  real_form">
          <div className="   first_form_row">
            <div className="  col_1 sjs">
              <div className="tex">Event Name</div>
              <div className="input">
                <input className="form-control p-0" name="event_name" placeholder="Event Name" value={event_name} onChange={this.onChange} />
              </div>
            </div>

            <div className="flex w-100 ">
              <div className="  col_2  sjs w-100 px-2 ">
                <div className="tex">Date</div>
                <div className="input ">
                  <input className="form-control"
                    placeholder="Event Date" min={this.min}
                    value={event_date} name="event_date" onChange={this.onChange}
                    type="date" />

                </div>
              </div>
              <div className=" w-100  col_3 sjs ml-auto">
                <div className="tex">Time</div>
                <div className="input -danger ">
                  <input className="form-control"
                    placeholder="Event Date"
                    value={event_time} name="event_time"
                    type="time" onChange={this.onChange} />
                  {/* <select className="form-control" placeholder="Time" value={this.state.name}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,].map((num) => < option >{num}</option>)}
                  </select>
                  <select className="form-control ml-2" placeholder="Time" value={this.state.name}>
                    <option>AM</option>
                    <option>PM</option>
                  </select> */}
                </div>
              </div>
            </div>
          </div>



          <div className="  first_form_row ">
            <div className="  col_1 sjs">
              <div className="tex" >Event Details</div>
              <div className="input">
                <textarea style={{ resize: "none" }} name="event_details" className="form-control" onChange={this.onChange} value={event_details} />
              </div>
            </div>
            <div className="px-2 col_2 sjs ">
              <div className="tex">Add an attachment</div>
              <div className="flex-2  flex attacher ">
                <div className="border attach rounded-lg" value={this.state.name} >
                  <label for="file" type="file" className="w-100 h-100 heart" onClick={this.uploadWidget}>
                    <img src={up_icon} alt="" width="37px" />
                    <div className="text">Upload a file</div>
                  </label>
                </div>

                <input type="file" id="fil" accept="image/*" style={{ display: "none" }}
                  maxLength="1"
                />

                {
                  file !== null && <div className="attached flex" >
                    <div className=" border flex-2 heart soft rounded-lg"><div className="fileds  px-1">{file.original_filename}</div></div>
                    <div className="fa fa-check heart h-100 w-fit text-success ml-auto my-auto pl-2" />
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="first_form_row mt-3">
            <div className="col_1 sjs w-100">
              <div className="tex">Event Venue</div>
              <div className="input">
                <input className="form-control p-0" name="event_venue" placeholder="Event Venue" value={event_venue} onChange={this.onChange} />
              </div>
            </div>
          </div>


          <div className="tir_form_row">
            <div className="col_1 heart ">
              <div className=" mr-auto flex">
                <div className="seT mr-5">
                  Set a reminder ?
                </div>

                <div class="flex mr-1 lso  flex custom-control custom-radio">
                  <input type="radio" className="w-fit custom-control-input" checked={set_reminder} id="defaultGroupExample2" name="groupOfDefaultRadios"
                    onChange={() => this.setState({ set_reminder: true })}
                  />
                  <label className="custom-control-label " for="defaultGroupExample2">Yes</label>
                </div>
                <div className="custom-control lso custom-radio ml-4">
                  <input type="radio" className=" w-fit  custom-control-input" checked={!set_reminder} id="defaultGroupExample3" name="groupOfDefaultRadios"
                    onChange={() => { this.setState({ reminder: [], reminder_body: "", set_reminder: false }) }}
                  />
                  <label class="custom-control-label" for="defaultGroupExample3">No</label>
                </div>
              </div>
            </div>
          </div>

          {set_reminder && <div className="  for_form_row">
            <div className="  col_1 ">
              <div className="   tex text-left">Body</div>
              <textarea style={{ resize: "none", fontSize: "14px" }} placeholder="Type your reminder" className="form-control mr-auto w-100" name="reminder_body" value={reminder_body} onChange={this.onChange} />
            </div>
          </div>}
          <div className="fiv_form_row">
            {set_reminder && <div className="col_1 text-left">
              <div className="tex">Send Reminder in</div>
              <div className="two_input">
                <div className=" w-50 flex  pr-2">
                  <input className="mr-2 h-100 ml-auto form-control" name="reminder_date" onChange={this.onChange} value={reminder_date} min={this.min} placeholder="Type your reminder" type="date" />
                  {/* <div className=" cag  fa fa-calendar heart" /> */}
                </div>
                <div className="w-50 pl-2 allss">
                  <div className="mr-2 h-100 ml-auto btn  btn-sm btn-success flex" type="date"
                    onClick={() => {
                      if (onVet(this.state, reminder_date) === true) {
                        this.setState({
                          reminder: [reminder_date, ...reminder],
                          reminder_date: ""
                        })
                      }
                    }}
                  >
                    <div style={{ fontSize: "14px", marginRight: "-13px", marginBottom: "2px" }}>{reminder.length}</div>
                    <div className="gac fa fa-bell heart h-100" ></div>
                    <div className="text ml-1 heart" style={{ fontSize: "12px" }}>
                      {reminder.length < 1 ? "Add reminder" : "Add another reminder"}
                    </div>
                  </div>
                </div>
              </div>
            </div>}
            <div className="six_form_row col_2 flex ml-auto w-fit ">
              <div className="inner   text-white text-left  mr-2 ">
                <button
                  onClick={closeModal}
                  className="btn eppes btn-sm m-0 h-100 w-100 flex p-0">
                  <div className="fa fa-times heart text-white " />
                  <div className="text f ml-2 heart  h-100 text-white">
                    Close
                  </div>
                </button>
              </div>
              <div className="inner  text-white text-left ">
                <button
                  onClick={() => {
                    this.props.load_data(this.state)
                    setTimeout(() => {
                      this.props.move()
                    }, 300);
                  }}
                  className="btn eppe btn-sm m-0 h-100 w-100 flex p-0">
                  <div className="fa  fa-eye heart text-white " />
                  <div className="text  ml-2 heart h-100 text-white">
                    Preview
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter(Form)