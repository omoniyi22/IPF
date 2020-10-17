import React, { Component } from 'react'
import Payment_Hisory_Table from './../../components/Tables/Payment_History/Payment_History'
class Payment_History extends Component {
  render() {
    return (
      <div className="PH ">
        <div className="EventScreen payment_histories">
          <div className=" home_3 mt-0 pay_history_header">
            <div className="titled mb-4 ml-2 sm-hide">
              Payments
                </div>
            <div className="home_3b wq flex-2 flex mt-1 mb-2">
              <div className=" home_header  bread ">
                <div className="titled mb-4 ml-2 sm-show">
                  Payments
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
          <div className="tav">
            <Payment_Hisory_Table
              date={Date()}
              price={"$100"}
              type={"Annunal Subscription"}
              card={"Master Card"}
            />
            <Payment_Hisory_Table
              date={Date()}
              price={"$100"}
              type={"Annunal Subscription"}
              card={"Master Card"}
            />
            <Payment_Hisory_Table
              date={Date()}
              price={"$100"}
              type={"Annunal Subscription"}
              card={"Master Card"}
            />
            <Payment_Hisory_Table
              date={Date()}
              price={"$100"}
              type={"Annunal Subscription"}
              card={"Master Card"}
            />
            <Payment_Hisory_Table
              date={Date()}
              price={"$100"}
              type={"Annunal Subscription"}
              card={"Master Card"}
            />
          </div>
        </div>
        <div className="pay_history_aggregate p-4">
          <div className="title">
            Summary of Payments
          </div>
          <div className="plate de flex">
            <div className="numbers pr-4">Total Payments</div>
            <div className="total">7</div>
          </div>
          <div className="plate flex dsd">
            <div className="numbers pr-4">Total Amounts</div>
            <div className="total">$212189</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Payment_History