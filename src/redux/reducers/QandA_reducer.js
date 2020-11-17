import {
  SENDING_QUESTION, QUESTION_SENT,
  GET_QUESTIONS, GET_A_QUESTION, QUE_ERROR
} from './../types'

const initialState = {
  loading: false,
  error: false,
  ques: [],
  que: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SENDING_QUESTION:
      return {
        ...state,
        error: false,
        loading: true
      }
    case QUESTION_SENT:
      return {
        ...state,
        error: false,
        loading: false
      }
    case GET_A_QUESTION:
      return {
        ...state
      }
    case GET_QUESTIONS:
      return {
        ...state,
        ques: action.payload,
        error: false,
        loading: false
      }
    case QUE_ERROR:
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