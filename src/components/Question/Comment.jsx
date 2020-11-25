import React, { Component } from 'react'
import { get_all_comment, post_comment } from './../../services/all_service'
import Loader from 'react-loader-spinner'
import { returnToFromNow } from './../../utils/moment'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      loader: false,
      comment: "",
      error: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  async onSubmit() {
    this.setState({ loader: true, error: false, comment: "" })
    try {
      let comment = post_comment({
        question_id: this.props.question,
        comment: this.state.comment
      })
      comment = await get_all_comment(this.props.question)
      comment = await comment.data
      comment = await comment.data
      console.log({ comment })
      this.setState({ loader: false, comments: comment })
      this.props.no(comment.length)

    } catch (error) {
      this.setState({
        loader: false,
        error: "An Error Occured"
      })
    }
  }
  async componentDidMount() {
    this.setState({ loader: true, error: false })
    try {
      let comment = await get_all_comment(this.props.question)
      comment = await comment.data
      comment = await comment.data
      this.setState({ loader: false, comments: comment })
      this.props.no(comment.length)
    } catch (error) {
      this.setState({
        loader: false,
        error: "An Error Occured"
      })
    }
  }

  render() {
    let { reply } = this.props
    return (
      <div class="mb-3">
        <div className="cooc">COMMENTS</div>

        {
          this.state.loader ?
            <div className="heaty heart text-primary">
              Loading Comments ...
            </div> :
            <>
              {
                this.state.error ?
                  <div className="heaty heart font-weight-bold text-danger">
                    Failed to fetch comments
                  </div> :
                  <>
                    {this.state.comments.length < 1 ?
                      <div className="heaty heart text-success">
                        No Comment Yet
                      </div>
                      :
                      <>
                        {this.state.comments.map(comment =>
                          <div className="commentin py-2">
                            <div className="commen flex">
                              <div className="pic rounded  z-depth-1"
                                style={{ backgroundImage: `url("${comment.avatar || require("./unnamed.png")}")` }}
                              ></div>
                              <div className="poc rounded flex-2">
                                <div className="name flex w-100 ">
                                  <div className="mr-auto ">{comment.firstName} {comment.lastName}</div>
                                  <div className="pac ml-auto flex-2 text-right ">{returnToFromNow(comment.created_at)}</div>
                                </div>
                                <div className="comment">
                                  {comment.comment}
                                </div>
                              </div>
                            </div>

                          </div>
                        )}
                      </>
                    }
                  </>

              }

            </>

        }
        <div className=" flex bala mb-2 px-2">
          <textarea
            autoFocus={true}
            value={this.state.comment}
            name={"comment"}
            onChangeCapture={this.onChange}
            placeholder={"Write your comment"}
            className="form-control border chooo  font-weight-light"
            style={{ resize: "none" }}
            disabled={this.state.loader}
          />

          {this.state.loader === false ?
            <div className="post border ml-2 btn btn-sm p-0 m-0"
              onClick={this.state.loader ? () => null : this.onSubmit}
            >
              COMMENT
          </div> :
            <div className="post border ml-2 btn btn-sm p-0 m-0"
              onClick={this.state.loader ? () => null : this.onSubmit}
            >
              <Loader
                type="ThreeDots"
                color="white"
                height={40}
                width={40}
                secondaryColor={"white"}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Comment