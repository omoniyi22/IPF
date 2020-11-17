import React, { Component } from 'react'

export class ErrorSnack extends Component {
  render() {
    let { error, close } = this.props
    return (
      <div className="error_snacks flex rounded-lg z-depth-1">
        <div className="text">
          {error}
        </div>
        <div className="ocn pnt"
          onClick={close}
        > <span className="fa fa-times text-white"></span> </div>
      </div>
    )
  }
}