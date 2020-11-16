import { GOT_PAIDMENT_NEEDS, PAY, LIST_FAILED } from './../types'

const initialState = {
  list_loading: true,
  fee_list: [],
  card_list: [],
  list_failed: false,
  
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
    default:
      return { ...state }
  }
}