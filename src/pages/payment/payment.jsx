import React, { useState } from 'react'

//payment methods
import AnnualPayment from './one'
import For_Member from './two'


function Payment() {
  const [chose, setChose] = useState(false)
  function Choose() {
    setChose(!chose)
  }
  return (
    <div className=" payment ">
      <div className="payment_select  flex">
        <div
          onClick={() => {
            setTimeout(() => {
              setChose(false)
            }, 100);
          }}
          className={`rounded annual_sub aal border heart ${!chose} pnt `}>
          {/* <div className="tipt border z-depth-1" >f;d;f'</div> */}
          <div className="rounded-pill  pill heart  border ">
            <div className="innet border w-100 h-100 rounded-pill" />
          </div>
          <div className="text">Annual Subscription</div>
        </div>
        <div
          onClick={() => {
            setTimeout(() => {
              setChose(true)
            }, 100);
          }}
          className={` rounded for_member aal  heart border ${chose} pnt`}>
          <div className="rounded-pill  pill   border ">
            <div className="innet border w-100 h-100 rounded-pill" />
          </div>
          <div className="text">Pay for an additional member</div>
        </div>
      </div>
      <div className="selected_box">
        {chose  === true && <div className="opacy"> <AnnualPayment only={true} /></div>} {chose  === false &&<div className="opacy"> <AnnualPayment /> </div>}
      </div>
    </div >
  )
}

export default Payment