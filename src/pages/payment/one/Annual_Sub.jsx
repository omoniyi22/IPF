import React, { Component } from 'react'
import PaymentForm from './../../../components/Forms/Payment/Payment'
class Annual_Sub extends Component {
  render() {
    return (
      <div className="Annual_Sub ">
        <div className="cad flex border rounded-lg border-success">
          <div className="left flex-2 ">
            <div className="headr ">
              Annual Subscription
            </div>
            <div className="data ">
              Payment Data
            </div>
            <select class="mdb-select md-form form-control ">
              <option value="">Choose your country</option>
              <option value="1">USA</option>
              <option value="2">Germany</option>
              <option value="3">France</option>
              <option value="4">Poland</option>
              <option value="5">Japan</option>
            </select>
            <div className="plan ">
              Select membership plan
          </div>
            <div className="date ">
              Date: 19th September, 2021
          </div>
          </div>
          <div className="right  "></div>
        </div>
        <PaymentForm />
      </div>
    )
  }
}
export default Annual_Sub