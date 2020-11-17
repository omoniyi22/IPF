import paystack from "./../../config/PayStack";
import {
  getFees,
  listcard,
  PaidDetails,
  Pay as Pae,
} from "./../../services/all_service";
import {
  CLEARO,
  FAILED,
  PAYMENT_FAILED,
  GOT_PAIDMENT_NEEDS,
  GOT_PAID_DETAILS,
  LIST_FAILED,
  LOADING_PAYMENTS,
  PAID,
  GET_PAYMENT_HISTORY_REQUEST,
  GET_PAYMENT_HISTORY_REQUEST_SUCCESS,
  GET_PAYMENT_HISTORY_REQUEST_FAILED,
} from "./../types";

import { action } from "typesafe-actions";

export const PayNeeds = () => async (dispatch) => {
  Promise.all([getFees(), listcard()])
    .then((values) => {
      console.log({ values });
      dispatch({
        type: GOT_PAIDMENT_NEEDS,
        payload: [values[0].data.data, values[1].data.data],
      });
    })
    .catch((err) => {
      console.log({ err: err.response });
      dispatch({ type: LIST_FAILED, payload: true });
    });
};

export const Okay = () => async (dispatch) => {
  dispatch({ type: CLEARO });
};

export const PaidList = () => async (dispatch, state) => {
  dispatch({ type: LOADING_PAYMENTS })
  try {
    console.log("REACHED HERE");
    let result = await PaidDetails();
    console.log(result.data.data, "adsfad");
    if (result.data && result.data.data) {
      dispatch(action(GET_PAYMENT_HISTORY_REQUEST_SUCCESS, result.data.data));
    }
  } catch (error) {
    console.log(error.response);
    dispatch(action(GET_PAYMENT_HISTORY_REQUEST_FAILED));
  }
};


export const Pay = (dat, amount, redirect) => async (dispatch, state) => {
  redirect.push("/result");
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