import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PaymentForm from './../../../components/Forms/Payment/Payment'
class Annual_Sub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      amount: "",
      fee_for: "",
      fee_code: "",
      fee_duration: "",
      opacy: "",
      card_id: "NEW",
      fee_id: "",
      new_card: true,
      card: {}

    }

    this.onChange = this.onChange.bind(this)
    this.setCard = this.setCard.bind(this)
    this.switch_new = this.switch_new.bind(this)
    this.pay = this.pay.bind(this)
  }
  onChange(e) {
    if (e.target.value !== "An Error Occured" && e.target.value !== "Choose Fee" && e.target.value !== "Loading ....") {
      let fee_id = this.props.fee_list.filter(res => res.name === e.target.value)[0].id
      let name = this.props.fee_list.filter(res => res.name === e.target.value)[0].name
      let amount = this.props.fee_list.filter(res => res.name === e.target.value)[0].amount
      let fee_for = this.props.fee_list.filter(res => res.name === e.target.value)[0].fee_for
      let fee_code = this.props.fee_list.filter(res => res.name === e.target.value)[0].fee_code
      let fee_duration = this.props.fee_list.filter(res => res.name === e.target.value)[0].fee_duration
      this.setState({ opacy: "" })
      setTimeout(() => {
        this.setState({
          name,
          amount,
          fee_for,
          fee_code,
          fee_duration,
          fee_id,
          opacy: "opacy",
        })
      }, 500);
    } else {
      this.setState({ opacy: "" })
      setTimeout(() => {
        this.setState({
          name: "",
          amount: "",
          fee_for: "",
          fee_code: "",
          fee_duration: "",
          opacy: "opacy",
          fee_id: ""
        })
      }, 500);
    }
  }

  switch_new() {
    console.log("switch")
    this.setState({
      new_card: !this.state.new_card
    })
  }

  pay() {
    if (this.state.new_card === false) {
      console.log("New")
      this.props.Pay(
        {
          "payment_for": this.state.fee_for,
          "fee_id": this.state.fee_id,
          "card_id": this.state.card_id
        }, this.state.amount, this.props.history
      )
    } else {
      console.log("New")
      this.props.Pay(
        {
          "payment_for": this.state.fee_for,
          "fee_id": this.state.fee_id,
          "card_id": "NEW"
        }, this.state.amount, this.props.history
      )
    }
  }

  setCard(card) {
    console.log({ card })
    if (typeof (card) === "object") {
      this.setState({
        card_id: card.id,
        new_card: false,
        card
      })
    }
  }


  componentDidMount() {
    this.props.PayNeeds()
  }
  render() {
    let { list_loading, card_list, fee_list, list_failed, opacy } = this.props
    let {
      fee_id,
      new_card,
      card,
      name,
      amount,
      fee_for,
      fee_code,
      fee_duration,
      card_id
    } = this.state
    return (
      <div className="Annual_Sub " >
        <div className=" z-depth-1 cad flex border rounded-lg border-success">
          <div className="left flex-2 ">
            <div className={`headr ${opacy}`}>
              {!name ? "Annual Subscription" :
                <>
                  {`${fee_for}: ${name}`} < br /> {`CODE: ${fee_code} AMOUNT ₦${amount}`}
                </>}
            </div>
            <div className="data ">
              Payment Data
            </div>
            <div className="flex">
              <select class="mdb-select md-form form-control " onChange={this.onChange}>
                {
                  list_loading === true ?
                    <option >Loading ....</option> :
                    <>
                      {
                        list_failed === true ?
                          <option >An Error Occured</option> :
                          <>
                            <option >Choose Fee</option>
                            {fee_list.map(fi => <option >{fi.name}</option>)}
                          </>
                      }
                    </>
                }
              </select>
              <div className="place  w-fit">
                <div className="eew  h-100 ">

                </div>
              </div>
            </div>
            <div className="plan ">
              Select membership plan
          </div>
            <div className="date ">
              Date: 19th September, 2021
          </div>
          </div>
          <div className="right  "></div>
        </div>
        <PaymentForm list_failed={list_failed} card={card} fee_id={fee_id} card_list={card_list} setCard={this.setCard} card_id={card_id} new_card={new_card} switch_new={this.switch_new} Pay={this.pay} />
      </div>
    )
  }
}
export default withRouter(Annual_Sub)