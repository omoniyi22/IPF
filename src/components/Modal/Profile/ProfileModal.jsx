import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';


const neat = (data) => {
  let first = data.replace("_", " ")

  let sec = Array.from(first)
  let third = []
  let i
  for (i in sec) {
    if (Number(i) > 0 && sec[Number(i)] === sec[Number(i)].toUpperCase()) {

      third.push(" ")
    }
    third.push(sec[i])
  }
  return third.join("").toString()
}

// let data = {
//   address: null,
//   approved: 1,
//   avatar: "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png",
//   city: null,
//   companyDetails: null,
//   company_address: null,
//   company_designation: null,
//   company_id: "AA01700",
//   company_name: "Hitech Construction Company Ltd",
//   country: null,
//   createdAT: "2020-10-23T12:31:25.000Z",
//   default_password: 1,
//   dob: null,
//   email1_primary: 0,
//   email2_primary: 0,
//   emailAddress: "ak.sinha@hitech-company.com",
//   emailAddress2: null,
//   firstName: " Amrendra ",
//   gender: null,
//   industryClassification: null,
//   industryType: null,
//   isAdmin: 0,
//   lastName: "Sinha",
//   memberId: 67,
//   memberNumber: "AA01701",
//   member_id: "97988218-60dd-4011-b2be-ef0a1159c725",
//   membershipType: "AA",
//   nameOfCompany: null,
//   passport: null,
//   password: "$2a$10$tNtFm2Ce9GJVxE3N1fTj3evYVNbJxSVxMR6k1y3BqJXRx8nY6eUmG",
//   phone1_whatsapp: 0,
//   phone2_whatsapp: 0,
//   phoneNumber: "+2347030980601",
//   phoneNumber2: null,
//   position: null,
//   position_duration: null,
//   profileCompleted: 0,
//   qualifications: null,
//   registeredBy: "AA01700",
//   role: "super-user",
//   state: null,
//   street1: null,
//   street2: null,
//   suspended: 0,
//   tableData: { id: 70 },
//   updatedAt: "2020-10-23T12:31:25.000Z",
//   website: null
// }

export const useStyle = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));


export class ProfileModal extends Component {
  render() {
    let { time,
      venue,
      detail,
      title,
      imag, status, data } = this.props

    return (



      <div className=" p-3 deds">
        <div className="sstt text-center pt-1 pb-2 font-weight-light mb-4">

          <div className="picpack border pt-4">
            <div className="picto mx-auto  rounded-pill red" >
              <img src={data.logo || data.avatar || "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png"} width="100%" className="rounded-pill" height="100%" alt="" />
            </div>
          </div>
          <div className="the_name sand_small font-weight-bold">{
            data.company_name
          }</div>
          <div className="w-100 mx-auto border adfe rounded-lg">
            {Object.entries(data).filter(dat => (dat[0] !== "tableData") && (dat[0] !== "company_name") && (dat[0] !== "logo") && (dat[1]) && (dat[0] !== "avatar")).map(dat =>
              <div className="packa flex mx-auto  border-bottom w-100 ">
                <div className="titless pr-4 py-2  border-right text-right">{neat(dat[0])}</div>
                <div className="value pl-4  py-2 text-left break_1">{dat[1] || "————————————"}</div>
              </div>
            )
            }
          </div>

          <div className="contaa">

          </div>
        </div>
      </div>
    )
  }
}
