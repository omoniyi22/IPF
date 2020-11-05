import { GET_SENT_INVITATION, SEND_INVITATION, GET_INCOMING_INVITE, INVITE_LOADING, INVITE_ERROR } from './../types'

const initialState = {
  invite_error: false,
  invite_loading: false,
  accepted: [],
  rejected: [],
  pending: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INVITE_LOADING:
      return {
        ...state,
        invite_loading: action.payload,
      }
    case INVITE_ERROR:
      return {
        ...state,
        invite_error: action.payload,
      }
    case GET_SENT_INVITATION:
      return {
        ...state,
        invite_error: false,
        invite_loading: false,
        accepted: action.payload.filter((data) => data.status === "ACCEPTED"),
        rejected: action.payload.filter((data) => data.status === "REJECTED"),
        pending: action.payload.filter((data) => data.status === "PENDING")
      }
    case SEND_INVITATION:
      return {
        ...state,
        accepted: action.payload.filter((data) => data.status === "ACCEPTED"),
        rejected: action.payload.filter((data) => data.status === "REJECTED"),
        pending: action.payload.filter((data) => data.status === "PENDING")
      }

    case GET_INCOMING_INVITE:
      return {

      }

    default:
      return {
        ...state
      }
  }
}