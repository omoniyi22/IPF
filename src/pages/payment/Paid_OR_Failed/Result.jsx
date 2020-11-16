import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import { createBrowserHistory } from 'history'
import "./_POF.scss"

class Result extends Component {
  componentDidMount() {
    if (this.props.error === false && this.props.loading === false && this.props.response === "") {
      createBrowserHistory().back()
    }
  }
  render() {
    let { okay,  error, loading, response } = this.props

    return (
      <div className="POF w-100">
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
                  <div className="end_btn">
                    <button
                      onClick={() => {
                        okay()
                        createBrowserHistory().back()
                      }}
                      className="btn btn-sm rounded-pill" >
                      Okay
                  </button>
                  </div>
                </div> :
                <>
                  {response === true ?
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
                      <div className="end_btn">
                        <button
                          onClick={() => {
                            okay()
                            createBrowserHistory().back()
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
                        <div className="end_btn">
                          <button
                            onClick={() => {
                              okay()
                              createBrowserHistory().back()
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
export { Result }
{/* <div ><Loader
  type="TailSpin"
  color="#53A3D1"
  height={30}
  width={30}
  secondaryColor={"white"}

/></div> */}