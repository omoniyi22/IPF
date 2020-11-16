import React from 'react'
const solid = require('./../../../assets/medias/svg/zame.png')
const zame = require('./../../../assets/medias/svg/zaem.png')
const Payment_Form = ({ list_failed, card_list, setCard, card, card_id, new_card, switch_new, Pay, fee_id }) => {
  return (
    <div className="payment_form border mt-4 rounded-lg z-depth-1">
      <div className="tide border-bottom flex"><div>Credit/Debit Card</div>
        {
          (card_list.length < 1 || card_id === "NEW") ? null :
            <>{
              new_card === true &&
              <div className=" card_num ml-auto" >
                <div class="custom-control custom-checkbox  custom-control-inline" onClick={switch_new}>
                  <input type="checkbox" class="custom-control-input che" id="defaultInline1"
                    checked={new_card}
                  />
                  <label class="custom-control-label  save" for="defaultInline1">Pay with New Card</label>
                </div>
              </div>}

              {new_card === false &&
                <div className=" card_num ml-auto" >
                  <div class="custom-control custom-checkbox  custom-control-inline" onClick={switch_new}>
                    <input type="checkbox" class="custom-control-input che" id="defaultInline1"
                      checked={new_card}
                    />
                    <label class="custom-control-label  save" for="defaultInline1">Pay with New Card</label>
                  </div>
                </div>
              }
            </>
        }
      </div>

      <div className=" body ">
        {new_card === false &&
          <>
            <div className=" card_num">
              <div className="title">Card Number</div>
              <div className="input ">
                <input disabled={list_failed} value={card && `xxxx - xxxx - xxxx - ${card.last4}`} type="text" className="form-control" />
              </div>
            </div>

            {/* <div className=" card_num">
              <div className="title">Bank Name</div>
              <div className="input ">
                <input disabled={list_failed} value={card && card.bank} type="text" className="form-control" />
              </div>
            </div> */}
            <div className="plate">

              <div className=" card_num">
                <div className="title">Expiring Date</div>
                <div className="input ">
                  <input disabled={list_failed} value={card && `${card.exp_month}/${card.exp_year}`} type="text" className="form-control" />
                </div>
              </div>
              <div className=" card_num">
                <div className="title">Bank Name</div>
                <div className="input ">
                  <input disabled={list_failed} value={card && card.bank} type="text" className="form-control" />
                </div>
              </div>
            </div>
          </>
        }
        {/* <div className=" card_num">
          <div class="custom-control custom-checkbox custom-control-inline">
            <input disabled={list_failed} type="checkbox" class="custom-control-input che" id="defaultInline1" />
            <label class="custom-control-label  save" for="defaultInline1">Save this card</label>
          </div>
        </div> */}
        {!list_failed ?
          <>
            {fee_id ?
              <button className="p-0 white m-0 w-100  btn z-depth-0 border border-warning rounded  rounded-sm " style={{ color: "black" }} onClick={Pay} > Pay </button> :
              <button className="p-0 white m-0 w-100  btn z-depth-0 border border-warning rounded  rounded-sm " style={{ color: "black" }}  > Select Fee Type </button>
            }
          </>
          :
          <button className="red text-white p-0  m-0 w-100  btn z-depth-0 border border-warning rounded  rounded-sm">Please Reload Page, An Error Occured</button>}
        {!list_failed &&
          <>

            <div className="bottum  heart">
              <div className="strait border  rounded-pill"></div>
              <div className="or ">OR</div>
              <div className="strait border rounded-pill"></div>
            </div>
            <div className="saved_cards ">

              <div className="title">
                Saved Cards
          </div>
              <div className="apay opa ">

                {card_list.map((res, key) => {
                  if (((Number(key) + 1) % 2) !== 0) {
                    return <div className="fpay z-depth-1 "
                      onClick={() => setCard(res)}
                    >
                      <div className="slit  text-right  w-100">
                        <div src={""} alt=""
                          style={{ backgroundImage: `url(${solid})` }}
                          width="12px" className="ml-auto rounded-sm faf" />
                      </div>
                      <div className="clean  h-100">
                        <div className="ttitl">
                          <span className='text-capitalise'>{res.brand}</span> Card
                      </div>
                        <div className="code">xxxx - xxxx - xxxx - {res.last4}</div>
                        <div className="date">
                          {res.exp_month}/{res.exp_year}
                        </div>
                      </div>
                    </div>
                  } else {
                    return <div className="spay  z-depth-1">
                      <div className="slit  text-right  w-100">
                        <div src={""} alt=""
                          style={{ backgroundImage: `url(${zame})` }}
                          className="  ml-auto rounded-sm faf"
                        />
                      </div>
                      <div className="clean  h-100">
                        <div className="ttitl">
                          Master Card
                </div>
                        <div className="code">xxxx - xxxx - xxxx - 2345</div>
                        <div className="date">
                          01/22
                </div>
                      </div>
                    </div>
                  }
                })}
              </div>


              <div className="apay aps ">
                <div className="fpay h-fit z-depth-1 flex ">
                  <div className=" tux">xxxx - xxxx - xxxx - 2345</div>
                  <div className="slit   text-right  ml-auto w-fit">
                    <img src={solid} width="12px" className=" rounded-sm faf" />
                  </div>
                </div>
                <div className="spay  h-fit z-depth-1 flex">
                  <div className="code tux">xxxx - xxxx - xxxx - 2345</div>
                  <div className="slit text-right  ml-auto w-fit">
                    <img src={solid} width="12px" className=" rounded-sm faf" />
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}


export default Payment_Form