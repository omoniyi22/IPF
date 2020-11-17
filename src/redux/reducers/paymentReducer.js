import {
  GOT_PAIDMENT_NEEDS,
  PAY,
  LIST_FAILED,
  CLEARO,
  PAID,
  FAILED,
  GET_PAYMENT_HISTORY_REQUEST,
  GET_PAYMENT_HISTORY_REQUEST_FAILED,
  GET_PAYMENT_HISTORY_REQUEST_SUCCESS,
} from "./../types";

const initialState = {
  list_loading: true,
  fee_list: [],
  card_list: [],
  list_failed: false,
  paymentHistory: [],
  error: false,
  loading: true,
  response: false,
  fetchingPaymentDetails: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_PAIDMENT_NEEDS:
      return {
        ...state,
        list_loading: false,
        fee_list: action.payload[0],
        card_list: action.payload[1],
        list_failed: false,
      };
    case LIST_FAILED:
      return {
        ...state,
        list_loading: false,
        list_failed: action.payload,
      };
    case FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        response: "Payment failed",
      };
    case PAID:
      return {
        ...state,
        error: false,
        loading: false,
        response: "Payment Successful",
      };

    case GET_PAYMENT_HISTORY_REQUEST_SUCCESS: {
      return {
        ...state,
        fetchingPaymentDetails: false,
        paymentHistory: action.payload,
      };
    }

    case GET_PAYMENT_HISTORY_REQUEST: {
      return {
        ...state,
        fetchingPaymentDetails: true,
      };
    }

    case GET_PAYMENT_HISTORY_REQUEST_FAILED: {
      return {
        ...state,
        fetchingPaymentDetails: false,
      };
    }

    case CLEARO:
      return {
        ...state,
        error: false,
        loading: true,
        response: "",
      };
    default:
      return { ...state };
  }
};
