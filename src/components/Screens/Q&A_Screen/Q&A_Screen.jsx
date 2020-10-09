import React, { Component } from 'react'
import Question from './../../Question/Question'
const QA_Screen = () => {
  return (
    <div className="border Q_A ">
      <div className="event_1 border w-50">
        <div className="event_1_head border-bottom mb-3 sokk flex">
          <div className="title my-auto">Live</div>
          <div className="btn rounded-lg  mt-auto heart w-fit ml-auto">
            <div className="fa fa-angle-double-left mr-1" />
            <div className="text-capitalize sand_small">Go Back</div>
          </div>
        </div>
        <div className="event_1_form ">
          <div className="box z-balmer ">
            <div className="fa fa-edit" />
            <div className="ppso red ">
              <textarea style={{ resize: "none" }}
                placeholder="Type your question"
                className="form-control m-0 rounded-0 wwe border-0"
              />
            </div>
          </div>
          <div className="btty w-fit">
            <div className="btn rounded-lg text-capitalize">
              Send
          </div>
          </div>
        </div>
        <div >
          <div className="questions border">

            <div className="question_head border">
              <div className="text-center btn text-capitalize rounded-lg">
                Popular
            </div>
              <div className="text-center btn text-capitalize rounded-lg">
                Recent
            </div>
            </div>
            <div className="question_right border heart">
              2 Questions
          </div>
          </div>
          <Question />
          <Question />
          <Question />
        </div>
      </div>

      <div className="event_1 sd border w-50">
        <div className="event_1_head border-bottom mb-3 sokk mt-2 flex">
          <div className="title my-auto pb-0">Archive</div>

        </div>
        <div className="empty_archive heart border">
          <div>
            <div className="title">Archive is Empty</div>
            <div className="content">
              You can archive questions in the
            Live tab after they <br /> were answered
               or are no longer relevant.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default QA_Screen