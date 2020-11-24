import {
  SENDING_ARCHIEVE, ARCHIEVE_SENT,
  GET_ARCHIEVES, ARC_ERROR
} from './../types'

const initialState = {
  loading: false,
  error: false,
  ques: [],
  que: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SENDING_ARCHIEVE:
      return {
        ...state,
        error: false,
        loading: true
      }
    // case ARCHIEVE_SENT:
    //   return {
    //     ...state,
    //     error: false,
    //     loading: false
    //   }
    case GET_ARCHIEVES:
      return {
        ...state,
        ques: action.payload,
        error: false,
        loading: false
      }
    case ARC_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      }
    default:
      return {
        ...state
      }
  }
}