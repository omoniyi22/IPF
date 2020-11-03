import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MemberTable from './../../components/Tables/Member/Member'
import MemberDetails from './../../components/Details/Member/Member'
import Header from './../../components/Headers/Header'
import Form from '../../components/Forms/Event/Form'
class Members extends Component {
  constructor(props) {
    super(props)
  }
  render() {
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
                      <select className="border-0 text-center mx-auto">
                        <option className="text-center w-100 mx-auto">
                          Download As
                      </option>
                        <option className="text-center w-100 mx-auto">
                          PDF
                      </option>
                        <option className="text-center w-100 mx-auto">
                          DOCX
                      </option>
                      </select>
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