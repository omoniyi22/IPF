import React, { useEffect } from 'react'
import Payment_Hisory_Table from './../../components/Tables/Payment_History/Payment_History'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { PaidList } from '../../redux/actions/payment'
import { CSVLink } from "react-csv";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Melo, header } from './pdf_pack'




const sumPayments = (arr) => {
  let total = 0;

  arr.forEach(item => {

    if (item.amount) {
      total += item.amount
    }
  });

  return total
}

const PaymentHistory = () => {




  const dispatch = useDispatch()
  const history = useSelector(state => state.payment.paymentHistory, shallowEqual);
  useEffect(() => {
    dispatch(PaidList())
  }, [PaidList])
  return (
    <div className="PH ">
      <div className="EventScreen payment_histories">
        <div className=" home_3 mt-0 pay_history_header">
          <div className="titled mb-4 ml-2 sm-hide">
            Payments History
            </div>
          <div className="home_3b wq flex-2 flex mt-1 mb-2">
            <div className=" home_header  bread ">
              <div className="titled mb-4 ml-2 sm-show">
                Payments
              </div>
            </div>
            <div class="download active   px-2 py-1 small dropdown">
              {/* <div id="dropdownMenu1" className=" mx-auto pr-3" />
              <div id="dropa" className="z-depth-1 mt-1"> */}

              <div className="dropas " id="dropas">
                <div id="drope" className="">Download As</div>
                <div id="dropa" className="z-depth-1 mt-1">
                  <div className="toe" id={"toe"}>
                    <PDFDownloadLink document={<Melo data={history} />}
                      fileName="ipf_events.pdf">PDF</PDFDownloadLink>
                  </div>
                  <div className="toe" id={"toe"}>
                    <CSVLink data={history} headers={header} >CSV</CSVLink>
                  </div>
                </div>

              </div>
              {/* <div className="flex">
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
            </div> */}
            </div>
          </div>
        </div>
        <div className="tav">

          {
            history.map(item => {

              return (
                <React.Fragment key={item.id}>
                  <Payment_Hisory_Table
                    date={item.created_at}
                    price={item.amount}
                    type={item.name}
                  // card={"Master Card"}
                  />
                </React.Fragment>
              )
            })
          }

        </div>
      </div>
      <div className="pay_history_aggregate p-4">
        <div className="title">
          Summary of Payments
      </div>
        <div className="plate de flex">
          <div className="numbers pr-4">Total Payments</div>
          <div className="total">{history.length}</div>
        </div>
        <div className="plate flex dsd">
          <div className="numbers pr-4">Total Amounts</div>
          <div className="total">N{sumPayments(history)}</div>
        </div>
      </div>
    </div >
  )
}

export default PaymentHistory