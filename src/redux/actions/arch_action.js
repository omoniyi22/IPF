import {
  SENDING_ARCHIEVE, ARCHIEVE_SENT,
  GET_ARCHIEVES, GET_A_ARCHIEVE, ARC_ERROR
} from './../types'

import { Like, postArchieve, getArchieve } from '././../../services/all_service'



export const getArchieves = (question_id) => async (dispatch, state) => {
  try {
    dispatch({
      type: SENDING_ARCHIEVE
    })
    let selectedEvent = state().event.selectedEvent.event_id
    // let selectedEvent = "052d1e09-f422-41aa-91da-a5bd000643eb"
    let questions = await getQues(selectedEvent)
    questions = await questions.data
    questions = await questions.data
    console.log(questions)
    dispatch({
      type: GET_ARCHIEVES,
      payload: questions
    })
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: ARC_ERROR
    })
  }
}
