import {
  PAGE_ERROR, PAGE_LOADER, POPUP, POPIN,
} from "./../types";

import {
  GOT_ACTIVE_EVENTS, POP_LOADER, GOT_ALL_EVENTS, GOT_CLOSED_EVENTS,
  FETCHED_AN_EVENT, SELECT_EVENT,
  CLOSE_ERROR, CLOSE_LOADER, EVENT_CLOSED,
  DEL_DONE, DEL_FAIL, DEL_LOAD
} from "./../types"

import {
  getActiveEvents, getAllEvents, getClosedEvents,
  getEventByAdmin, getEventByMember, createEvent,
  EditEvent, DeleteEvent
} from "./../../services/all_service"


export const Get_All_Event = () => async (dispatch) => {
  dispatch({
    type: PAGE_LOADER,
    payload: true
  })
  Promise.all([getActiveEvents(), getClosedEvents()])
    .then(values => values
      .map((result, num) => {
        // if (num === 0) {
        //   dispatch({
        //     type: GOT_ALL_EVENTS,
        //     payload: result.data.data
        //   })
        // }
        if (num === 0) {
          dispatch({
            type: GOT_ACTIVE_EVENTS,
            payload: result.data.data
          })
        }
        if (num === 1) {
          dispatch({
            type: GOT_CLOSED_EVENTS,
            payload: result.data.data
          })
        }
      })
    ).then(() => {
      dispatch({
        type: PAGE_LOADER,
        payload: false
      })
    })
    .catch(error => {
      dispatch({
        type: PAGE_ERROR,
        payload: true
      })
      console.log("errored", error.response)
    })
}



export const Create_Event = (newEvent) => async (dispatch) => {
  try {
    dispatch({ type: POP_LOADER })
    let CreateEvent = await createEvent(newEvent)
    CreateEvent = await CreateEvent.data
    CreateEvent = await CreateEvent.message
    console.log(CreateEvent, "worked")
    await dispatch({
      type: POPUP,
      payload: {
        CreateEvent,
        status: "success",
        data: "Event Created Successfully"
      }
    })

  } catch (error) {
    console.log(error.response)
    console.log(createEvent, "error")

    dispatch({
      type: POPUP,
      payload: {
        status: "error",
        data: "An error occured, Try Again"
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

export const Select_Event = (event) => async (dispatch, state) => {
  dispatch({
    type: SELECT_EVENT,
    payload: event
  })
}

export const Fetch_Event = (id) => async (dispatch, state) => {
  try {
    let event = state().user.currentUser.nrole === "admin" || state().user.currentUser.nrole === "super-admin"
    let data = event === true ? await getEventByAdmin(id) : await getEventByMember(id)
    data = await data.data
    data = await data.data
    console.log(data, "data")
    dispatch({
      type: FETCHED_AN_EVENT,
      payload: data
    })
  } catch (error) {
    console.log(error)
  }
}


export const Edit_Event = (editedEvent, id) => async (dispatch, state) => {
  try {
    dispatch({ type: POP_LOADER })
    let CreateEvent = await EditEvent(editedEvent, id)
    CreateEvent = await CreateEvent.data
    CreateEvent = await CreateEvent.message
    console.log(CreateEvent, "worked")
    await dispatch({
      type: POPUP,
      payload: {
        CreateEvent,
        status: "success",
        data: "Event Edited Successfully"
      }
    })
  } catch (error) {
    console.log(error.response)
    console.log(createEvent, "error")
    dispatch({
      type: POPUP,
      payload: {
        status: "error",
        data: "An error occured, Try Again"
      }
    })
  }
}




export const Delete = (event_id, hist) => async (dispatch) => {
  dispatch({ type: DEL_LOAD })
  try {
    let dele = await DeleteEvent(event_id)
    dele = await dele.data
    dele = await dele.data
    dispatch({ type: DEL_DONE })
    setTimeout(() => {
      hist.push("/event_")
    }, 3300);

  } catch (error) {
    console.log(error.response)
    dispatch({ type: DEL_FAIL })
  }
}

export const Close_Event = (editedEvent, id) => async (dispatch, state) => {
  try {
    let prevState = state().event.selectedEvent
    dispatch({ type: CLOSE_LOADER })
    let CreateEvent = await EditEvent(editedEvent, id)
    CreateEvent = await CreateEvent.data
    CreateEvent = await CreateEvent.data
    console.log(CreateEvent, "worked")
    await dispatch({
      type: SELECT_EVENT,
      payload: {
        ...prevState,
        ...CreateEvent
      }
    })
    console.log({prevState, CreateEvent})
  } catch (error) {
    console.log(error.response)
    console.log(createEvent, "error")
    dispatch({
      type: CLOSE_ERROR,
      payload: {
        status: "error",
        data: "An error occured, Try Again"
      }
    })
  }
}