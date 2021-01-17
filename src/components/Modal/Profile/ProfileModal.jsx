import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';


export const neat = (data) => {
  if (data === "createdAT") {
    return "Registered On"
  } else {

    let first = data.replace("_", " ")

    let sec = Array.from(first)
    let third = []
    let i
    for (i in sec) {
      if (Number(i) > 0 && Number(i) < (sec.length - 1) && sec[Number(i)] === sec[Number(i)].toUpperCase()) {

        third.push(" ")
      }
      third.push(sec[i])
    }
    return third.join("").toString()
  }
}



const neater = (data, data1) => {
  if (
    data === '' ||
    data === undefined ||
    data === null ||
    data1 === "phone_number" ||
    data1 === "phone1_whatsapp" ||
    data1 === "phone2_whatsapp" ||
    data1 === "phoneNumber2" ||
    data1 === "email1_primary" ||
    data1 === "email2_primary" &&
    data !== 0
  ) {
    return "__________________"
  }
  if (data === false || data === 0) {
    return "False"
  } else if (data === 1 || data === true) {
    return "True"
  } else {
    return data
  }
}


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

    console.log(data)
    return (


      <div className=" p-3 deds"  >
        <div className="sstt text-center pt-1 pb-2 font-weight-light mb-4" >
          <div className="picpack border pt-4">
            <div className="picto mx-auto  rounded-pill red" >
              <img src={data.logo || data.avatar || "https://res.cloudinary.com/ninja-dev/image/upload/v1597409650/user_cibuzv.png"} width="100%" className="rounded-pill" height="100%" alt="" />
            </div>
          </div>
          <div className="the_name sand_small font-weight-bold">
            {data.firstName} {data.lastName}
            <div className="font-weight-light small mt-1 ">
              {data.company_name}
            </div>
          </div>
          <div className="w-100 mx-auto border adfe rounded-lg">
            {Object.entries(data).filter(dat => (dat[0] !== "tableData") &&
              (dat[0] !== "company_name") &&
              (dat[0] !== "updatedAt") &&
              (dat[0] !== "firstName") && (dat[0] !== "lastName") &&
              (dat[0] !== "logo") && (dat[0] !== "memberId") &&
              (dat[0] !== "member_id") && (dat[0] !== "isAdmin") &&
              (
                dat[0] !== "password") && (dat[0] !== "default_password"
              ) && (dat[0] !== "companyId") && (dat[0] !== "company_id") &&
              (dat[0] !== "avatar")).map(dat =>
                <div className="packa flex mx-auto  border-bottom w-100 ">
                  <div className="titless pr-4 py-2  border-right text-right">{`${neat(dat[0])}`}</div>
                  <div className="titless pl-4 py-2  border-right text-left">{`${neater(dat[1], dat[0])}`}</div>
                  {/* <div className=" pl-4  py-2 text-left break_1"> jlbl {`${dat[1]} k;n; ${neat(dat[0])}` || "_____________________"}</div> */}
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
