import React, { useState, Component } from 'react'
import Question from './../../Question/Question'
import ChatLoad from './../../Loaders/chat_loader'
import Loader from 'react-loader-spinner'
import { withRouter } from 'react-router-dom'
import Arch from './Archive'

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
      moved: "unmoved",
      move: true,
      question: "",
      question_id: "",
      edit: false,
      recent: false
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
    let ada = Date()
    console.log({ ada })
    this.props.getAllQuestions()
  }

  render() {
    let { move, moved, recent } = this.state
    let { changeMoveToTrue, changeMoveToFalse } = this
    let { loading, error, ques, que, user_id, arch, posArchive } = this.props
    console.log({ user_id })
    let date = new Date()
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
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
                <div className="text-capitalize sand_small"
                  onClick={this.props.history.goBack}
                >Go Back</div>
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
                  <div className="text-center btn text-capitalize rounded-sm"
                    onClick={() => this.setState({ recent: false })}
                  >
                    Popular
                  </div>
                  <div className="text-center btn text-capitalize rounded-sm"
                    onClick={() => this.setState({ recent: true })}
                  >
                    Recent
                  </div>
                </div>
                <div className="question_right  heart">
                  {ques.length} Questions
            </div>
              </div>
              <div className="quea">
                {/* <Question edit={this.editQuestion} arch={arch} posArchive={posArchive} data={{
                  "question": "God is good skdnsdn;sd z-depth-1 z-depth-1 z-depth-1 z-depth-1z-depth-1 z-depth-1 z-depth-1 z-depth-1 z-dept z-depth-1 z-depth-1h-1 1 z-depth-1h-1 ",
                  "question_id": "5f286e93-3661-4b4b-9674-4459e0354f13",
                  "event_id": "052d1e09-f422-41aa-91da-a5bd000643eb",
                  "member_id": "8787e5bc-0770-4015-bbd2-22dae59e0f39",
                  "avatar": "http://res.cloudinary.com/dnevwxinm/image/upload/v1604844373/aw0t5jjiq462dioxaujp.jpg",
                  "firstName": "Seun",
                  "lastName": "Seun",
                  "created_at": "2020-11-12T08:07:11.000Z",
                  "updated_at": "2020-11-12T08:17:05.000Z"
                }} user={user_id} /> */}

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

                                {recent === true &&
                                  ques.filter(dat => `${dat.created_at.slice(0, 10)}` === `${date}`)
                                    .map((data, index) => (
                                      <div className="opacy">
                                        <Question posArchive={posArchive} arch={arch} data={data} edit={this.editQuestion} kin={Number(index)} user={user_id} />
                                      </div>
                                    ))
                                }

                                {recent === false && ques.map((data, index) => (
                                  <div className="opacy">
                                    <Question posArchive={posArchive} arch={arch} data={data} edit={this.editQuestion} kin={Number(index)} user={user_id} />
                                  </div>
                                ))}

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
            <Arch />
          </div>
        </div>
      </>
    )
  }
}
export default withRouter(QA_Screen)