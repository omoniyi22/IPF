import React, { useState } from 'react'
import Question from './../../Question/Question'
const QA_Screen = () => {
  const [move, setMove] = useState(true)
  const [moved, setMoved] = useState("unmoved")
  function changeMoveToTrue() {
    setMove(true)
    setMoved("unmoved")
  }
  function changeMoveToFalse() {
    setMove(false)
    setMoved("moved")
  }

  return (
    <>
      <div className="Q_and_A_Top">
        <div className=" home_header ">

          <div className="flex awls small font-weight-light  text-center" >
            <div className={`other_Events  flex-2 ml-3 px-2 pnt   ${move}`} onClick={changeMoveToTrue}>
              Live
            </div>
            <div className={`view_all klsd px-2  pnt  ${!move}`} onClick={changeMoveToFalse}>
              Archieve
            </div>
          </div>
          <div className="lines  rounded-pill ">
            <div className={`rounded-pill lines_move w-50  ${move}`} />
          </div>
        </div>
      </div>
      <div className=" Q_A  opacy">
        <div className={`event_1 animated faster blur ${moved}  w-50`}>
          <div className="event_1_head border-bottom mb-3 sokk flex">
            <div className="title my-auto ">Live</div>
            <div className="btn rounded-sm  mt-auto heart w-fit ml-auto">
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
              <div className="btn rounded-sm text-capitalize">
                Send
          </div>
            </div>
          </div>
          <div >
            <div className="questions pr-2">

              <div className="question_head ">
                <div className="text-center btn text-capitalize rounded-sm">
                  Popular
            </div>
                <div className="text-center btn text-capitalize rounded-sm">
                  Recent
            </div>
              </div>
              <div className="question_right  heart">
                2 Questions
          </div>
            </div>
            <Question />
            <Question />
            <Question />
          </div>
        </div>

        <div className="event_1 sd  w-50">
          <div className="event_1_head border-bottom mb-3 sokk mt-2 flex">
            <div className="title my-auto  pb-0">Archive</div>

          </div>
          <div className="empty_archive heart">
            <div>
              <div className="title">Archive is Empty</div>
              <div className="content">
                You can archive questions in the
              Live tab after they  were answered
                 or are no longer relevant.
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default QA_Screen