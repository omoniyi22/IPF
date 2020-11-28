import {
  GET_SENT_INVITATION, POPIN, POPUP, POP_LOADER, INVITE_LOADING, INVITE_ERROR,
  GOT_INVITATIONS, SELECT_INVITAION, I_LOAD, I_ERROR, REG_DONE, BEGIN_REG, END_REG

} from './../types'
import { getInvites, sendInvites, AcceptReject, invitations } from './../../services/all_service'


export const Get_Sent_Invite = () => async (dispatch, state) => {
  let event_id = state().event.selectedEvent && state().event.selectedEvent.event_id
  // let event_id = "25891d17-308c-478b-ac2d-32c04c9216ad"
  try {
    dispatch({
      type: INVITE_LOADING,
      payload: true
    })
    if (event_id) {

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
      payload: false
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

export const Send_Invite = (email, goBack) => async (dispatch, state) => {
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

      setTimeout(() => {
        dispatch({
          type: POPIN,
          payload: {
            status: "success",
            data: "Event created successfully"
          }
        })
        goBack()
      }, 3300);
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
    setTimeout(() => {
      dispatch({
        type: POPIN,
        payload: {
          status: "success",
          data: "Event created successfully"
        }
      })
    }, 3300);
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

export const Invitations = () => async (dispatch) => {
  try {
    dispatch({ type: I_LOAD, payload: true })
    let invitation = await invitations()
    invitation = await invitation.data
    invitation = await invitation.data
    console.log({ invitation })
    dispatch({
      type: GOT_INVITATIONS,
      payload: invitation
    })
  } catch (error) {
    dispatch({
      type: I_ERROR,
      payload: true
    })
  } finally {
    dispatch({ type: I_LOAD, payload: false })
  }
}

export const changeStatus = (type, id) => async (dispatch) => {
  dispatch({ type: POP_LOADER })
  try {
    let sent_invite = await AcceptReject(type, id)
    sent_invite = await sent_invite.data
    sent_invite = await sent_invite.message
    console.log({ sent_invite })
    await dispatch({
      type: POPUP,
      payload: {
        status: "success",
        data: type !== "PENDING" ?
          `You have successfully  ${type.toLowerCase()} the invite` :
          `This invite is successfully ${type.toLowerCase()}`
      }
    })
    let invitation = await invitations()
    invitation = await invitation.data
    invitation = await invitation.data
    console.log({ invitation })
    dispatch({
      type: GOT_INVITATIONS,
      payload: invitation
    })

    setTimeout(() => {
      dispatch({
        type: POPIN,
        payload: {
          status: "success",
          data: "Event created successfully"
        }
      })
    }, 3300);


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
  setTimeout(() => {
    dispatch({
      type: POPIN,
      payload: {
        status: "success",
        data: "Event created successfully"
      }
    })
  }, 3300);
}



export const Register = (event_id) => async (dispatch, state) => {
  dispatch({ type: BEGIN_REG })
  let email = state().user.currentUser.email
  console.log({ event_id, email })
  try {
    if (event_id) {
      let sent_invite = await sendInvites({ event_id, email })
      sent_invite = await sent_invite.data
      sent_invite = await sent_invite.message
      console.log({ sent_invite })
      await dispatch({
        type: REG_DONE
      })
    } else
      throw new Error("event Id")
  } catch (error) {
    console.log(error.response)
    let errored = await error.response ? await error.response.data.error : "An error occured, Try Again"
    dispatch({
      type: END_REG
    })
  }
}