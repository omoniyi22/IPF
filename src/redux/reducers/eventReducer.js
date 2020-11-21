import {
  GOT_ALL_EVENTS, GOT_CLOSED_EVENTS, GOT_ACTIVE_EVENTS,
  SELECT_EVENT, FETCHED_AN_EVENT
} from './../types'

const initialState = {
  active: [],
  closed: [],
  allEvent: [],
  selectedEvent: {
    "event_id": "fc3e5bd8-cc99-48e4-bcd9-8e932a99f346",
    "event_name": "Tech conference",
    "event_details": "Dummy data",
    "event_date": "2020-10-22T00:00:00.000Z",
    "event_time": "00:01:00",
    "set_reminder": 0,
    "reminder": null,
    "status": "active",
    "banner_image": "http://res.cloudinary.com/dnevwxinm/raw/upload/v1604334389/xyfg3zviza2pq8elsylo.js",
    "reminder_body": null
  }
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