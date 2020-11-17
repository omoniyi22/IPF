import React, { useState, Component } from 'react'
import Question from './../../Question/Question'
import ChatLoad from './../../Loaders/chat_loader'
import Loader from 'react-loader-spinner'

let dat = {
  "question_id": "5f286e93-3661-4b4b-9674-4459e0354f13",
  "event_id": "052d1e09-f422-41aa-91da-a5bd000643eb",
  "question": "God is good",
  "member_id": "8787e5bc-0770-4015-bbd2-22dae59e0f39",
  "created_at": "2020-11-12T08:07:11.000Z",
  "updated_at": "2020-11-12T08:17:05.000Z"
}

class QA_Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moved: true,
      move: "unmoved",
      question: "",
      question_id: "",
      edit: false
    }
    this.onChange = this.onChange.bind(this)
    this.sendQuestion = this.sendQuestion.bind(this)
    this.editQuestion = this.editQuestion.bind(this)
    this.changeMoveToFalse = this.changeMoveToFalse.bind(this)
    this.changeMoveToTrue = this.changeMoveToTrue.bind(this)
  }
  editQuestion(e, question_id) {
    console.log({ e, question_id })
    this.setState({
      question: e,
      edit: true,
      question_id: question_id
    })
  }
  changeMoveToTrue() {
    this.setState({
      move: true,
      moved: "unmoved"
    })
  }
  changeMoveToFalse() {
    this.setState({
      move: false,
      moved: "moved"
    })
  }
  onChange(e) {
    this.setState({
      question: e.target.value
    })
  }

  sendQuestion() {
    if (this.state.question) {
      if (this.state.edit === false) {
        this.setState({
          question: ""
        })
        this.props.sendQuestion(this.state.question)
      }
      else {
        let get_data = this.state.question_id
        this.setState({
          question: "",
          edit: false,
          question_id: ""
        })
        this.props.sendQuestion(this.state.question, get_data)

      }
    }
  }

  componentDidMount() {
    this.props.getAllQuestions()
  }

  render() {
    let { move, moved } = this.state
    let { changeMoveToTrue, changeMoveToFalse } = this
    let { loading, error, ques, que, user_id } = this.props
    console.log({ user_id })
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
                  <textarea style={{ resize: "none" }} onChange={this.onChange}
                    placeholder="Type your question" disabled={loading}
                    className="form-control m-0 rounded-0 wwe border-0" value={this.state.question}
                  />
                </div>
              </div>
              <div className="btty w-fit">
                <div className="btn rounded-sm text-capitalize"
                  style={{ opacity: this.state.question === "" ? "0.5" : "1" }}
                  onClick={() => {
                    if (loading === false && this.state.question !== "") {
                      this.sendQuestion()
                    }
                  }}
                >
                  {loading === false ? <>{this.state.edit ? "EDIT" : "SEND"}</> :
                    <Loader
                      type="ThreeDots"
                      color="white"
                      height={40}
                      width={40}
                      secondaryColor={"white"}
                    />
                  }
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
                  {ques.length} Questions
            </div>
              </div>
              <div className="quea">
                {loading === false ?
                  <div>
                    {
                      error === false ?
                        <>
                          {
                            ques.length < 1 ?
                              <div className=" polads heart h-100 w-100 mx-auto my-auto text-center">
                                No Questions Yet
                              </div> :
                              <>
                                {ques.map((data, index) => (<Question data={data} edit={this.editQuestion} kin={Number(index)} user={user_id} />))}
                              </>
                          }
                        </> :
                        <div className="polads heart h-100 w-100 text-center">
                          An Error Occured
                        </div>
                    }
                  </div> :
                  <div>
                    {<ChatLoad user={user_id} />}
                  </div>
                }
              </div>
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
}
export default QA_Screen