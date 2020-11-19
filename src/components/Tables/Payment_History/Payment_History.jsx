import React from 'react'
import { returnToFromNow, returnTimeFromDate } from '../../../utils/moment'
const Payment_History_Table = ({ date, type, price, card }) => {
  return (
    <div className="payment_history_table flex border-bottom border-success" >
      <div className="date put   w-100">
        {returnToFromNow(date)}
        <div className="time">{returnTimeFromDate(date)}</div>
      </div>
      <div className="type put   w-100">{type}</div>
      <div className="price put   w-100">N{price}</div>
      <div className="car put   w-100">{card}</div>
    </div>
  )
}

export default Payment_History_Table