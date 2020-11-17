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
  GOT_PAIDMENT_NEEDS,
  GOT_PAID_DETAILS,
  LIST_FAILED,
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
    // const email = state().user.currentUser.email;
    let result = await Pae(dat);

    // console.log(result.data.data);
    // // data = await data.data;
    // // data = await data.data;
    // // data = await data.reference;
    // // console.log({ data });
    // // console.log(Pae(data).data)
    const payload = {
      email: result.data.data.email,
      amount: result.data.data.amount,
      reference: result.data.data.reference,
    };

    console.log(payload);
    const onSuccess = () => {
      dispatch({
        type: PAID,
      });
    };

    const onError = (error) => {
      // console.log({ error })
      dispatch({
        type: FAILED,
      });
    };

    paystack.pay(payload, onSuccess, onError);
  } catch (error) {
    console.log({ error });
  }
};
