import { PAY, PAY_REF, LOADING_PAYMENTS, PAYMENT_FAILED, GOT_PAID_DETAILS, PAID, FAILED, CLEARO, GOT_PAIDMENT_NEEDS, LIST_FAILED } from './../types'
import { Pay as Pae, getFees, listcard, PaidDetails } from './../../services/all_service'
import paystack from './../../config/PayStack'


export const PayNeeds = () => async (dispatch) => {
  Promise.all([getFees(), listcard()])
    .then(values => {
      console.log({ values })
      dispatch({ type: GOT_PAIDMENT_NEEDS, payload: [values[0].data.data, values[1].data.data] })
    })
    .catch(err => {
      console.log({ err: err.response })
      dispatch({ type: LIST_FAILED, payload: true })
    })
}

export const Okay = () => async dispatch => {
  dispatch({ type: CLEARO })
}


export const PaidList = () => async (dispatch, state) => {
  dispatch({ type: LOADING_PAYMENTS })
  try {
    let paid = await PaidDetails()
    paid = await paid.data
    paid = await paid.data
    dispatch({ type: GOT_PAID_DETAILS, payload: paid })
  } catch (error) {
    console.log(error.response)
    dispatch({ type: PAYMENT_FAILED })
  }
}



export const Pay = (dat, amount, redirect) => async (dispatch, state) => {
  redirect.push("/result")
  try {
    const email = state().user.currentUser.email;
    let data = await Pae(dat)
    data = await data.data
    data = await data.data
    data = await data.reference
    console.log({ data })
    if (dat.card_id === "NEW") {
      // console.log(Pae(data).data)
      const payload = {
        email: email,
        amount: amount,
        reference: data
      }
      console.log("daa", payload)
      const onSuccess = () => {
        dispatch({
          type: PAID,
        })
      }
      const onError = (error) => {
        // console.log({ error })
        dispatch({
          type: FAILED,
        })
      }
      paystack.pay(payload, onSuccess, onError)
    } else {
      dispatch({
        type: PAID,
      })
    }
  } catch (error) {
    dispatch({
      type: FAILED,
    })
    console.log({ error })
  }
}

