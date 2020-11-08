import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MemberTable from './../../components/Tables/Member/Member'
import MemberDetails from './../../components/Details/Member/Member'
import Header from './../../components/Headers/Header'
import Form from '../../components/Forms/Event/Form'
class Members extends Component {
  constructor(props) {
    super(props)
    this.openDropdown = this.openDropdown.bind(this)
  }

  openDropdown() {

  }
  render() {
    window.onclick = function (event) {
      if (!event.target.matches('#dropas')
        && !event.target.matches('#dropa')
        && !event.target.matches('#drope')
        // && !event.target.matches('#toe')
      ) {
        if (document.querySelector("#dropa"))
          document.querySelector("#dropa").style.display = "none"
        console.log("Hooola")
      } else {
        if (document.querySelector("#dropa"))
          if (document.querySelector("#dropa").style.display === "none")
            document.querySelector("#dropa").style.display = "block"
          else
            document.querySelector("#dropa").style.display = "none"
      }
    }
    let { firstName, lastName, memberType, memberNumber } = this.props.user
    return (
      <div className="member_page home_port ">
        <div className="Event_Page">
          <div className="main_page">
            <div className="main_button flex">
              <Link to="/invite" className="ml-auto">
                <div className="edit_b a  ml-2 heart text-center btn border flex   rounded-pill">
                  <div className="fa fa-user-plus pl-1" />
                  <div className="text pr-1 ">Add Member</div>
                </div>
              </Link>
            </div>

            <MemberDetails memberNumber={memberNumber} lastName={lastName} firstName={firstName} memberType={memberType} />
            <div className="EventScreen opacy">
              <div className=" home_3 mx- pt-5 pb-3">
                <div className="titled mb-4 ml-2 sm-hide">
                  Members Registered
                </div>
                <div className="home_3b wq flex-2 flex mt-1 mb-2">
                  <div className=" home_header  bread ">
                    <div className="titled mb-4 ml-2 sm-show">
                      Members Registered
                  </div>
                  </div>
                  <div class="download active   px-2 py-1 small dropdown">
                    <div id="dropdownMenu1" className="download_icon mx-auto pr-3" data-toggle="dropdown" />
                    <div className="flex">
                      <div className="dropas " id="dropas">
                        <div id="drope" className="border">Download As</div>
                        <div id="dropa" className="z-depth-1 mt-1">
                          <div className="toe" id={"toe"}>
                            PDF
                          </div>
                          <div className="toe" id={"toe"}>
                            CSV
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home_4 ">
                <Header first="Name" second="Email" third="Date" fourth="Action" />
                <MemberTable button={"Remove"} />
                <MemberTable button={"Remove"} />
                <MemberTable button={"Remove"} />
                <MemberTable button={"Remove"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Members