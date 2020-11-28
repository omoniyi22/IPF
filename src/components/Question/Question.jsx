import React, { useState } from 'react'
import { DateForm, TimeForm } from './../../assets/utiils/date'
import Comment from './Comment'
import { Like } from '../../services/all_service'
import { connect } from 'react-redux'



const Question = (
  {
    data: { question, created_at, member_id, question_id, firstName, lastName, avatar },
    edit, user, kin, Arch, posArchive
  }
) => {
  let isAlreadyArchived = Arch.some(dat => dat.question_id === question_id)

  const [display, setDisplay] = useState("none")
  const [shelf, setShelf] = useState(false)
  const [reply, setReply] = useState(false)
  const [no, setNo] = useState(0)
  const [no_like, setNo_like] = useState(0)


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
    <div>
      <div className="real_question border-bottom z-depth-1">
        <div className="my_que   pnt p-2 z-balm "
          onClick={() => setShelf(!shelf)}
        >
          <div className="head  flex ">
            <div className={`pcsa flex-2 ${shelf === false && "hie  break_2"} pr-2 `}>
              {question}
            </div>
            <div className="set_up heart">
              {/* <div className="fa fa-star border rounded-pill font-weight-light"></div>
              <div className="fa fa-lightbulb mx-1 border rounded-pill font-weight-light"></div> */}
              {
                shelf === true &&
                <div className={`fa fa-chevron-circle-down text-success  white  rounded-pill `}
                  onClick={() => {
                    setShelf(false)
                    setReply(false)
                  }}
                ></div>}
              {
                shelf === false &&
                <div className={`fa fa-chevron-circle-up white  rounded-pill `}
                  onClick={() => setShelf(true)}
                ></div>
              }
            </div>
          </div>
          <div className="flex">
            <div className=" bottom heart flex-2">
              <div className="the_img border border-white rounded-pill z-depth-1"
                style={{ backgroundImage: `url(${avatar || require('./unnamed.png')})` }}
              />
              <div className="content py-1" >
                <div className="name">{firstName} {lastName}</div>
                <div className="time break_1">
                  {/* {DateForm(created_at)} {TimeForm(created_at.substr(11, 8))} */}
                </div>
              </div>
            </div>
            <div className="commentary heart">
              <div className="comments ld">{Number(no)} comments</div>
              <div className="likes dl border ml-2">{Number(no)} <span className={`fa ${Number(no) > 1 ? "fa-comments" : "fa-comment"}  pl-1 font-weight-light`} /></div>


              <div className="likes border ml-2"
                onClick={async () => {
                  try {
                    let like = await Like()
                    like = await like

                  } catch (error) {
                    // console(error.response)
                  }
                }}
              >1 <span className="fa fa-thumbs-up pl-1 font-weight-light" /></div>



              <div className="menus  " id={`drope`}
              >
                <div className="menus flex  w-100 mr-auto"
                  onClick={() => setDisplay("block")}
                >
                  <span className="rounded-pill  w-fit h-fit " id={`drope`} />
                  <span className="rounded-pill  w-fit h-fit " id={`drope`} />
                  <span className="rounded-pill  w-fit h-fit " id={`drope`} />
                </div>
                <div className="ksoa">
                  <div id={`dropa`} className="border absoluted white z-balm border rounded-lg"
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
                    <div className="toe " id={`toe`}
                      onClick={() => {
                        setShelf(true)
                        setReply(true)
                        console.log({ shelf, reply })
                      }}>
                      <div className="fa fa-reply" />Reply
                    </div>
                    {
                      isAlreadyArchived === false &&
                      <div className="toe " id={`toe`}
                        onClick={() => posArchive(question_id)}
                      >
                        <div className="fa fa-file-download" />Archive
                      </div>

                    }
                    {/* {
                      edit &&
                      <div className="toe " id={`toe`}>
                        <div className="fa fa-trash" />Delete
            </div>} */}

                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <div className={`paod ${shelf === false ? "coment" : "ntt"} border`}>
        <Comment reply={reply} question={question_id} no={(n) => setNo(n)} />
      </div>
    </div >
  )
}

const mapStateToProps = state => ({
  Arch: state.arch.ques
})

export default connect(mapStateToProps)(Question)