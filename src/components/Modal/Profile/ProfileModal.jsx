import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';


export const neat = (data) => {
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
              (dat[0] !== "firstName") && (dat[0] !== "lastName") &&
              (dat[0] !== "logo") && (dat[0] !== "memberId") &&
              (dat[0] !== "member_id") && 
              (
                dat[0] !== "password") && (dat[0] !== "default_password"
              ) && (dat[0] !== "companyId") && (dat[0] !== "company_id") &&
              (dat[0] !== "avatar")).map(dat =>
                <div className="packa flex mx-auto  border-bottom w-100 ">
                  <div className="titless pr-4 py-2  border-right text-right">{`${neat(dat[0])}`}</div>
                  <div className="titless pl-4 py-2  border-right text-left">{`${dat[1] || "_____________________"}`}</div>
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
