import React, { Component } from 'react'

//payment methods
import AnnualPayment from './one'
import For_Member from './two'
//payment methods


class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chose: false
    }
    this.Choose = this.Choose.bind(this)
  }
  Choose() {
    this.setState({
      chose: !this.state.chose
    })
  }
  render() {
    return (
      <div className=" payment ">
        <div className="payment_select  flex">
          <div
            onClick={() => this.setState({ chose: false })}
            className={`annual_sub aal border heart ${!this.state.chose} pnt `}>
            {/* <div className="tipt border z-depth-1" >f;d;f'</div> */}
            <div className="rounded-pill  pill heart  border ">
              <div className="innet border w-100 h-100 rounded-pill" />
            </div>
            <div className="text">Annual Subscription</div>
          </div>
          <div
            onClick={() => this.setState({ chose: true })}
            className={`for_member aal  heart border ${this.state.chose} pnt`}>
            <div className="rounded-pill  pill   border ">
              <div className="innet border w-100 h-100 rounded-pill" />
            </div>
            <div className="text">Pay for an additional member</div>
          </div>
        </div>
        <div className="selected_box">
          {this.state.chose ? <For_Member /> : <AnnualPayment />}
        </div>
      </div>
    )
  }
}
export default Payment