import { GOT_FEES, PAY } from './../types'

const initialState = {
  fees: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_FEES:
      return {
        ...state,
        fees: action.payload
      }

    default:
      return { ...state }
  }
}