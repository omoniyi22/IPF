import {
  GOT_ALL_EVENTS, GOT_CLOSED_EVENTS, GOT_ACTIVE_EVENTS,
  SELECT_EVENT, FETCHED_AN_EVENT
} from './../types'

const initialState = {
  active: [],
  closed: [],
  allEvent: [],
  selectedEvent: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ACTIVE_EVENTS:
      return {
        ...state,
        active: action.payload
      }
    case GOT_CLOSED_EVENTS:
      return {
        ...state,
        closed: action.payload
      }
    case FETCHED_AN_EVENT:
      return {
        ...state,
        selectedEvent: { ...action.payload }
      }
    case GOT_ALL_EVENTS:
      return {
        ...state,
        allEvent: action.payload
      }
    case SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.payload
      }
    default:
      return {
        ...state
      }
  }
}