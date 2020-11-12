import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MemberTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: ""
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    console.log({ states: e.target.value })
    this.setState({
      [e.target.name]: e.target.value
    })
    this.props.changeStatus(e.target.value, this.props.dat.id)
  }
  render() {
    let { button, invitatio, dat } = this.props
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
      <>


        {invitatio === true ?
          <div className="member_table p-4  border-bottom opacy">
            <div className="col_1 lom   break_2">
              <span className="sm-hidden baew rounded-pill border" >RS</span> Rahman Shabahsk <span className="hide">.</span>
            </div>
            <div className="col_2 lom  word-break hide_over ">
              {dat.member_role}
            </div>
            <div className="col_3 lom  break_3 break_2">
              {dat.date_sent.substr(0, 10)}
            </div>
            <div className="col_4 lom  break_2 ">
              {button !== undefined ? <RemoveButton title={button} /> :
                <>
                  <select name="" className="font-weight-bold small" id="" name="status" onChange={this.onChange}>
                    {dat.status === "ACCEPTED" &&
                      <>
                        <option>ACCEPT</option>
                        <option>REJECT</option>
                      </>
                    }
                    {dat.status === "REJECTED" &&
                      <>
                        <option>REJECT</option>
                        <option>ACCEPT</option>
                      </>
                    }
              
                    }
                  </select>
                </>
              }
            </div>
          </div>
          :
          <div className="member_table p-4  border-bottom opacy">
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
        }</>
    )
  }
}


export default MemberTable
