import React, { Component } from 'react'
import { fontSize } from '@material-ui/system'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ""
    }
  }
  render() {
    return (
      <div className=" text-left  form_1">
        <div className="form_title">
          Create Event
        </div>
        <div className="  real_form">
          <div className="   first_form_row">
            <div className="  col_1 sjs">
              <div className="tex">Event Name</div>
              <div className="input">
                <input className="form-control p-0" placeholder="Event Name" value={this.state.name} />
              </div>
            </div>
            <div className="flex w-100 ">
              <div className="  col_2  sjs w-100 px-2 ">
                <div className="tex">Date</div>
                <div className="input ">
                  <input className="form-control"
                    placeholder="Event Date"
                    value={this.state.name} />
                </div>
              </div>
              <div className=" w-100  col_3 sjs ml-auto">
                <div className="tex">Time</div>
                <div className="input -danger ">
                  <select className="form-control" placeholder="Time" value={this.state.name}>
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                  <select className="form-control ml-2" placeholder="Time" value={this.state.name}>
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="  first_form_row ">
            <div className="  col_1 sjs">
              <div className="tex">Event Details</div>
              <div className="input">
                <textarea style={{ resize: "none" }} className="form-control" value={this.state.name} />
              </div>
            </div>
            <div className="px-2 col_2 sjs ">
              <div className="tex">Add an attachment</div>
              <div className="flex-2  flex attacher ">
                <div className="border attach" value={this.state.name} >

                </div>
                <div className="attached flex" value={this.state.name}>
                  <div className=" border flex-2" />
                  <div className="fa fa-check heart h-100 w-fit text-success ml-auto my-auto pl-2" />
                </div>
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
                  <input type="radio" className="  w-fit custom-control-input" id="defaultGroupExample2" name="groupOfDefaultRadios" />
                  <label className="custom-control-label " for="defaultGroupExample2">Yes</label>
                </div>
                <div className="custom-control lso custom-radio ml-4">
                  <input type="radio" className=" w-fit  custom-control-input" id="defaultGroupExample3" name="groupOfDefaultRadios" />
                  <label class="custom-control-label" for="defaultGroupExample3">No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="  for_form_row">
            <div className="  col_1 ">
              <div className="   tex text-left">Body</div>
              <textarea style={{ resize: "none", fontSize: "14px" }} placeholder="Type your reminder" className="form-control mr-auto w-100" />
            </div>
          </div>
          <div className="fiv_form_row">
            <div className="col_1 text-left">
              <div className="tex">Send Reminder in</div>
              <div className="two_input">
                <div className=" w-50 flex  pr-2">
                  <input className="mr-2 h-100 ml-auto form-control " placeholder="Type your reminder" type="date" />
                  <div className=" cag  fa fa-calendar heart" />
                </div>
                <div className="w-50 pl-2 allss">
                  <div className="mr-2 h-100 ml-auto btn  btn-sm btn-success flex" placeholder="Type your reminder" type="date">
                    <div className="gac fa fa-bell heart h-100 " />
                    <div className="text ml-1 heart" style={{ fontSize: "12px" }}>
                      Add another reminder
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="  six_form_row col_2 flex ml-auto w-fit">
              <div className="inner   text-white text-left  mr-2">
                <button
                  onClick={this.props.unmove}
                  className="btn eppes btn-sm m-0 h-100 w-100 flex p-0">
                  <div className="fa fa-times heart " />
                  <div className="text f ml-2 heart  h-100">
                    Close
                  </div>
                </button>
              </div>
              <div className="inner  text-white text-left ">
                <button
                  onClick={this.props.move}
                  className="btn eppe btn-sm m-0 h-100 w-100 flex p-0">
                  <div className="fa  fa-eye heart " />
                  <div className="text  ml-2 heart h-100">
                    Preview
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Form