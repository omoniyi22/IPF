import { GOT_PAIDMENT_NEEDS, GOT_PAID_DETAILS, PAYMENT_FAILED, LOADING_PAYMENTS, PAY, LIST_FAILED, CLEARO, PAID, FAILED } from './../types'

const initialState = {
  list_loading: true,
  fee_list: [],
  card_list: [],
  list_failed: false,

  payments_loading: false,
  payments: [],
  payments_faiied: false,

  error: false,
  loading: true,
  response: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_PAIDMENT_NEEDS:
      return {
        ...state,
        list_loading: false,
        fee_list: action.payload[0],
        card_list: action.payload[1],
        list_failed: false
      }
    case LIST_FAILED:
      return {
        ...state,
        list_loading: false,
        list_failed: action.payload
      }
    case LOADING_PAYMENTS:
      return {
        ...state,
        payments_faiied: false,
        payments_loading: true
      }
    case PAYMENT_FAILED:
      return {
        ...state,
        payments_faiied: true,
        payments_loading: false
      }
    case GOT_PAID_DETAILS:
      return {
        ...state,
        payments: action.payload,
        payments_loading: false,
        payments_faiied: false
      }
    case FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        response: "Payment failed"
      }
    case PAID:
      return {
        ...state,
        error: false,
        loading: false,
        response: "Payment Successful"
      }
    case CLEARO:
      return {
        ...state,
        error: false,
        loading: true,
        response: ""
      }
    default:
      return { ...state }
  }
}