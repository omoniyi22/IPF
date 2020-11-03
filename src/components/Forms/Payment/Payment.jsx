import React from 'react'
const solid = require('./../../../assets/medias/svg/zame.png')
const zame = require('./../../../assets/medias/svg/zaem.png')
const Payment_Form = () => {
  return (
    <div className="payment_form border mt-4 rounded-lg z-depth-1">
      <div className="tide border-bottom">Credit/Debit Card</div>
      <div className=" body ">
        <div className=" card_num">
          <div className="title">Card Number</div>
          <div className="input ">
            <input type="text" className="form-control" />
          </div>
        </div>
        
        <div className=" card_num">
          <div className="title">Phone Number</div>
          <div className="input ">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="plate">

          <div className=" card_num">
            <div className="title">Expiring Date</div>
            <div className="input ">
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className=" card_num">
            <div className="title">Security Code</div>
            <div className="input ">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className=" card_num">
          <div class="custom-control custom-checkbox custom-control-inline">
            <input type="checkbox" class="custom-control-input che" id="defaultInline1" />
            <label class="custom-control-label  save" for="defaultInline1">Save this card</label>
          </div>
        </div>
        <button className="p-0 white m-0 w-100  btn z-depth-0 border border-warning rounded  rounded-sm"> Pay </button>
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
            <div className="fpay z-depth-1 ">
              <div className="slit  text-right  w-100">
                <div src={""} alt=""
                  style={{ backgroundImage: `url(${solid})` }}
                  width="12px" className="ml-auto rounded-sm faf" />
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
            <div className="spay  z-depth-1">
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
      </div>
    </div>
  )
}


export default Payment_Form