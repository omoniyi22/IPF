import {
  GET_SENT_INVITATION, SEND_INVITATION, GET_INCOMING_INVITE,
  POPIN, POPUP, POP_LOADER, PAGE_LOADER, PAGE_ERROR, INVITE_LOADING, INVITE_ERROR
} from './../types'
import { getInvites, sendInvites, AcceptReject } from './../../services/all_service'


export const Get_Sent_Invite = () => async (dispatch, state) => {
  // let event_id = state().event.selectedEvent && state().event.selectedEvent.event_id
  let event_id = "25891d17-308c-478b-ac2d-32c04c9216ad"
  try {
    dispatch({
      type: INVITE_LOADING,
      payload: true
    })
    if (event_id) {
      console.log(event_id)
      let get_invite = await getInvites(event_id)
      get_invite = await get_invite.data
      get_invite = await get_invite.data
      console.log({ get_invite })
      await dispatch({
        type: GET_SENT_INVITATION,
        payload: get_invite
      })
    } else
      throw new Error("event Id")
  } catch (error) {
    console.log(error)
    console.log(error.response)
    let errored = await error.response ? await error.response.data.error : "An error occured, Try Again"
    dispatch({
      type: INVITE_ERROR,
      payload: true
    })
  } finally {
    dispatch({
      type: INVITE_LOADING,
      payload: false
    })
  }
  // dispatch({
  //   type: PAGE_LOADER,
  //   payload: false
  // })
}

export const Send_Invite = (email) => async (dispatch, state) => {
  dispatch({ type: POP_LOADER })
  let event_id = state().event.selectedEvent && state().event.selectedEvent.event_id
  console.log({ event_id, email })
  try {
    if (event_id) {
      let sent_invite = await sendInvites({ event_id, email })
      sent_invite = await sent_invite.data
      sent_invite = await sent_invite.message
      console.log({ sent_invite })
      await dispatch({
        type: POPUP,
        payload: {
          status: "success",
          data: "Invitation sent successfully"
        }
      })
    } else
      throw new Error("event Id")
  } catch (error) {
    console.log(error.response)
    let errored = await error.response ? await error.response.data.error : "An error occured, Try Again"
    dispatch({
      type: POPUP,
      payload: {
        status: "error",
        data: await errored
      }
    })
  }
}

export const Clear_Error = () => async (dispatch) => {
  dispatch({
    type: POPIN,
    payload: {
      status: "success",
      data: "Event created successfully"
    }
  })
}