import React, { Component } from 'react'
export default class Page_Error extends Component {
  render() {
    return (
      <div className="page_error heart border w-100 h-100 white">
        <div className="page_loader  heart">
          <div className="the_Logo my-auto fa fa-frown-closed font-weight-light" />
          <div className="the_Error my-auto fa fa-frown-closed font-weight-light" >
            404
          </div>
          <div className="what">
            Data Not Fetched
        </div>
          {/* <div className="talk">
            Data for this page was not successfully fetched
            Data for this page was not successfully fetched
            Data for this page was not successfully fetched
        </div> */}
        </div>
      </div>
    )
  }
}