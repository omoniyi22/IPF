import React from 'react'
import { Link } from 'react-router-dom'

const MemberTable = ({ button }) => {
  let RemoveButton = ({ title }) => (
    <div className="main_button flex   poller w-fit">
      <Link to="/invite" className="">
        <div className="edit_b s m-0 a border  heart text-center btn  flex   rounded-pill">
          <div className="text pr-1 texti">{title}</div>
        </div>
      </Link>
    </div>
  )
  return (
    <div className="member_table p-4  border-bottom">
      <div className="col_1 lom   break_2">
        <span className="sm-hidden baew rounded-pill border" >RS</span> Rahman Shabahsk <span className="hide">.</span>
      </div>
      <div className="col_2 lom  word-break hide_over ">
        rahmansa@gmail.com
      </div>
      <div className="col_3 lom  break_3 break_2">
        17th September, 2020
      </div>
      <div className="col_4 lom  break_2 ">
        {button !== undefined ? <RemoveButton title={button} /> : "member"}
      </div>
    </div>
    // background: linear-gradient(to top, rgba(0, 0, 0, 0.726), rgba(0, 0, 0, 0));

  )
}

export default MemberTable
