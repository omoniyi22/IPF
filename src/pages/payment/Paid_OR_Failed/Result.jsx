import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import { withRouter } from 'react-router-dom'
import "./_POF.scss"

class Result extends Component {
  componentDidMount() {
    if (this.props.error === false && this.props.loading === false && this.props.response === "") {
      this.props.history.goBack()
    }
  }
  render() {
    let { okay, error, loading, response } = this.props

    return (
      <div className="POF w-100 new_bg">
        {/* {`${this.props.response}`} */}
        <div className="overun  w-100 h-100 ">
          {loading === true ?
            <div className="empty_one rounded-pill  mx-auto p-4 mt-5">
              <div className="loadd my-auto  w-100 h-100">
                <Loader className="my-auto "
                  type="Puff"
                  color="#53A3D1"
                  height={68}
                  width={68}
                  secondaryColor={"white"}
                />
              </div>
            </div> :
            <>
              {error === true ?
                <div className="text-center empty_matter mx-auto w-100 ">
                  <div className="empty_one rounded-pill  mx-auto p-4 mt-5">
                    <div className="errored" />
                  </div>
                  <div className="font-weight-bold  empty_text mt-4">
                    <span className="onr">{response}</span> <br />
                  </div>
                  <div className="mx-auto end_btn text-center">
                    <button
                      onClick={() => {
                        okay()
                        this.props.history.goBack()
                      }}
                      className="btn btn-sm rounded-pill" >
                      Okay
                  </button>
                  </div>
                </div> :
                <>
                  {response ?
                    <div className="text-center empty_matter   mx-auto ">
                      <div className="empty_one rounded-pill  mx-auto p-4 mt-5">
                        <div className="empty_oned emptied_one">
                          <div className="fa fa-check my-auto" />
                        </div>
                      </div>
                      <div className="font-weight-bold empty_text mt-4">
                        <span className="onr mt-4">Payment has been made..
              </span> <br />
                      </div>
                      <div className="mx-auto end_btn text-center">
                        <button
                          onClick={() => {
                            okay()
                            this.props.history.goBack()
                          }}
                          className="btn btn-sm rounded-pill" >
                          Okay
                  </button>
                      </div>
                    </div> :
                    <>{
                      response === "SENT" &&
                      <div className="text-center empty_matter   mx-auto ">
                        <div className="empty_one rounded-pill  mx-auto p-4 mt-5">
                          <div className="empty_oned emptied_one">
                            <div className="fa fa-envelope my-auto" />
                          </div>
                        </div>
                        <div className="font-weight-bold empty_text mt-4">
                          <span className="onr mt-4">Invoice has been sent
                            <br />
                            to your email</span> <br />
                        </div>
                        <div className="mx-auto end_btn text-center">
                          <button
                            onClick={() => {
                              okay()
                              this.props.history.goBack()
                            }}
                            className="btn btn-sm rounded-pill" >
                            Okay
                            </button>
                        </div>
                      </div>
                    }</>
                  }
                </>
              }
            </>}
        </div>
      </div>
    )
  }
}
export default withRouter(Result)
