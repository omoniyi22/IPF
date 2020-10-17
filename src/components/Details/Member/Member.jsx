import React from 'react'

const Details = ({ }) => {
  return (
    <div className="member_details px-2">
      <div className="org">
        <div className="title">
          Organisation Name
        </div>
        <div className="content">
          Andrew Johnson
        </div>
      </div>
      <div className="mem_plan">
        <div className="title">
          Membership Plan
        </div>
        <div className="content">
          Coperate A
        </div>
      </div>
      <div className="exipire">
        <div className="title">
          Membership Expiration Date
        </div>
        <div className="content">
          20th September, 2001
        </div>
      </div>
    </div>
  )
}

export default Details