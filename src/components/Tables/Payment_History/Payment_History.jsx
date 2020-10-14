import React from 'react'

const Payment_History_Table = ({ date, type, price, card }) => (
  <div className="payment_history_table flex border-bottom border-success" >
    <div className="date put   w-100">
      {"Sep. 23, 2020"}
      <div className="time">2 mins ago</div>
    </div>
    <div className="type put   w-100">{type}</div>
    <div className="price put   w-100">{price}</div>
    <div className="car put   w-100">{card}</div>
  </div>
)

export default Payment_History_Table