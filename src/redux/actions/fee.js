import { PAY, GOT_FEES, GOT_PAID_DETAILS } from './../types'
import { PaidDetails, Pay, getFee, getFees, editFee, CreateFee } from './../../services/all_service'

export const FeeList = () => async (dispatch, state) => {
  try {
    let fee = await getFee()
    fee = await fee.data
    fee = await fee.data
    dispatch({ type: GOT_FEES, payload: fee })
  } catch (error) {
    console.log(error.response)
  }
}



