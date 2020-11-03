import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'

class vetModal extends Component {
  render() {
    let { closeError, error, classx, loading } = this.props
    return (
      <>
        <div className="vetModal opas" onClick={() => {
          closeError()
          classx === "success" && this.props.history.goBack()
        }}>

        </div>
        <div className={`vetModal sos rounded-pill white heart z-depth-1 ${classx} `}>
          {loading ?
            <Loader
              type="Oval"
              color="#53A3D1"
              height={35}
              width={35}
              secondaryColor={"white"}
            /> :
            <div className="rounding border heart ">
              {classx === "success" ?
                <div className="fa fa-check"></div> :
                <div className="fa fa-exclamation"></div>}
            </div>}
          <div className="text">
            {loading ? <span className="tox pl-2">Please wait ...</span> : error}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(vetModal)