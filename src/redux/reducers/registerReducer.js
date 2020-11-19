import { REG_DONE, END_REG, BEGIN_REG } from './../types'

let initialState = {
  done: false,
  loading: false,
  failed: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_REG:
      return {
        ...state,
        loading: true,
        failed: false,
        done: false
      }
    case REG_DONE:
      return {
        ...state,
        loading: false,
        failed: false,
        done: true
      }
    case END_REG:
      return {
        loading: false,
        failed: true,
        done: false
      }
    default:
      return {
        ...state
      }
  }
}