import React, { useState, useEffect } from 'react'
import { DateForm, TimeForm } from './../../assets/utiils/date'
import Comment from './Comment'
import { postLike, getLike } from '../../services/all_service'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'




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
  const [_like, set_like] = useState(false)
  const [__like, set__like] = useState(false)
  const [load_like, set_load_like] = useState(false)


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

  const Liked = async () => {
    try {
      set_load_like(true)
      let dal = await getLike(question_id)
      dal = await dal.data
      dal = await dal.data
      set_like((dal.some(dat => dat.member_id === user)))
      setNo_like(dal.length)
      set_load_like(false)
    } catch (error) {
      console.log({ "some thing": error.response })
      set_load_like(false)
    }
  }


  useEffect(() => {
    Liked()
  }, [__like])


  const Like = async () => {
    try {
      set_load_like(true)
      await postLike(question_id)
      set__like(!__like)
    } catch (error) {
      console.log({ "some thing": error.response })
      set_load_like(false)
    }
  }


  return (
    <div>
      <div className="real_question border-bottom z-depth-1">
        <div className="my_que   pnt p-2 z-balm "
        >
          <div className="head  flex"
            onClick={() => setShelf(!shelf)}
          >
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

              {load_like === false ?
                <div className={`likes border ml-2  ${_like === true ? "pai" : " "}`}
                  style={{ transitionDuration: "0.24s" }}
                  onClick={Like}
                >
                  {Number(no_like)}<span className={`fa fa-thumbs-up pl-1 font-weight-light`} /></div> :
                <div className={`likes border ml-2  ${_like === true ? "pai" : " "}`}
                  style={{ transitionDuration: "0.24s" }}
                >
                  <Loader
                    type="ThreeDots"
                    color={_like === true ? "white" : "#31B476"}
                    height={14}
                    width={14}
                    secondaryColor={"white"}
                  />
                </div>

              }

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