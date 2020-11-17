import React, { useState } from 'react'
import { DateForm, TimeForm } from './../../assets/utiils/date'



const Question = (
  {
    data: { question, created_at, member_id, question_id, firstName, lastName, avatar },
    edit, user, kin
  }
) => {

  const [display, setDisplay] = useState("none")

  let key = `${kin}`
  window.onclick = function (event) {
    if (
      // !event.target.matches(`#dropas`)
      // && !event.target.matches(`#dropa`)
      !event.target.matches(`#drope`)
      // && !event.target.matches(`#toe`)
    ) {
      setDisplay("none")
    }
  }

  return (
    <div className="real_question border-bottom">
      <div className="my_que   pnt p-2 z-balm">
        <div className="head  flex">
          <div className=" flex-2 break_2 hir pr-2">
            {question}
          </div>
          <div className="set_up heart">
            <div className="fa fa-star border rounded-pill font-weight-light"></div>
            <div className="fa fa-lightbulb mx-1 border rounded-pill font-weight-light"></div>
            <div className="fa fa-check-double mr-1  border rounded-pill "></div>
          </div>
        </div>
        <div className="flex">
          <div className=" bottom heart flex-2">
            <div className="the_img border rounded-pill"
              style={{ backgroundImage: `url("${avatar}")` }}
            />
            <div className="content py-1" >
              <div className="name">{firstName} {lastName}</div>
              <div className="time break_1">
                {/* {DateForm(created_at)} {TimeForm(created_at.substr(11, 8))} */}
              </div>
            </div>
          </div>
          <div className="commentary heart">
            <div className="comments ld">12 comments</div>
            <div className="likes dl border ml-2">1 <span className="fa fa-comment pl-1 font-weight-light" /></div>
            <div className="likes border ml-2">1 <span className="fa fa-thumbs-up pl-1 font-weight-light" /></div>
            <div className="menus flex border" id={`drope`}
              onClick={() => setDisplay("block")}
            >
              <span className="rounded-pill  w-fit h-fit " id={`drope`} />
              <span className="rounded-pill  w-fit h-fit " id={`drope`} />
              <span className="rounded-pill  w-fit h-fit " id={`drope`} />
            </div>

          </div>
          <div id={`dropa`} className="absoluted white z-depth-1  border rounded-lg"
            style={{ display }}
            onClick={() => {
              setDisplay("none")
            }}
          >

            {
              user === member_id &&
              <div className="toe " id={`toe`}
                onClick={() => {
                  edit(question, question_id)
                }}
              >
                <div className="fa fa-pen" />Edit
            </div>}
            <div className="toe " id={`toe`}>
              <div className="fa fa-reply" />Reply
            </div>
            <div className="toe " id={`toe`}>
              <div className="fa fa-file-download" />Archive
            </div>
            {
              edit &&
              <div className="toe " id={`toe`}>
                <div className="fa fa-trash" />Delete
            </div>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Question