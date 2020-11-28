import {
  GET_SENT_INVITATION, SEND_INVITATION, INVITE_LOADING, INVITE_ERROR,
  GOT_INVITATIONS, SELECT_INVITAION, I_LOAD, I_ERROR
} from './../types'

const initialState = {
  invite_error: false,
  invite_loading: false,
  accepted: [],
  rejected: [],
  pending: [],

  invitations: [],
  accepted_invitation: [],
  rejected_invitation: [],
  pending_invitation: [],
  loading: "",
  error: "",
  selectedInvitation: {}
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

    case GOT_INVITATIONS:
      return {
        ...state,
        accepted_invitation: action.payload.filter((data) => data.status === "ACCEPTED"),
        rejected_invitation: action.payload.filter((data) => data.status === "REJECTED"),
        pending_invitation: action.payload.filter((data) => data.status === "PENDING"),
        error: false
      }
    case I_LOAD:
      return {
        ...state,
        loading: action.payload
      }
    case I_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return {
        ...state
      }
  }
}