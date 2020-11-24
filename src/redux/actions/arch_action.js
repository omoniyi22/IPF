import {
  SENDING_ARCHIEVE,
  GET_ARCHIEVES, ARC_ERROR
} from './../types'

import { Like, postArchieve, getArchives } from '././../../services/all_service'



export const getArchieves = () => async (dispatch, state) => {
  try {
    dispatch({
      type: SENDING_ARCHIEVE
    })
    let event_id = await state().event.selectedEvent.event_id
    // let event_id = "4a9ae83c-a913-4413-a690-cc9169b95d82"
    let questions = await getArchives(event_id)
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



export const posArchive = (question_id) => async (dispatch, state) => {
  try {
    dispatch({
      type: SENDING_ARCHIEVE
    })
    let event_id = await state().event.selectedEvent.event_id
    // let event_id = "4a9ae83c-a913-4413-a690-cc9169b95d82"
    let questions = await postArchieve({ question_id })
    // questions = await questions.data
    // questions = await questions.data
    questions = await getArchives(event_id)
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