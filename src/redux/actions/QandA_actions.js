import {
  SEND_QUESTION, SENDING_QUESTION, QUESTION_SENT,
  GET_QUESTIONS, GET_A_QUESTION, EDIT_QUESTION, QUE_ERROR
} from './../types'
import { postQue, editQue, getQue, getQues } from './../../services/all_service'



export const getAllQuestions = () => async (dispatch, state) => {
  try {
    dispatch({
      type: SENDING_QUESTION
    })
    let selectedEvent = state().event.selectedEvent.event_id
    // let selectedEvent = "052d1e09-f422-41aa-91da-a5bd000643eb"
    let questions = await getQues(selectedEvent)
    questions = await questions.data
    questions = await questions.data
    console.log(questions)
    dispatch({
      type: GET_QUESTIONS,
      payload: questions
    })
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: QUE_ERROR
    })
  }
}




export const sendQuestion = (question, question_id) => async (dispatch, state) => {
  console.log({ question, question_id })
  try {
    dispatch({
      type: SENDING_QUESTION
    })
    let selectedEvent = state().event.selectedEvent.event_id
    // let selectedEvent = "052d1e09-f422-41aa-91da-a5bd000643eb"
    let questions
    if (question_id) questions = await editQue(question_id, question)
    else questions = await postQue(selectedEvent, question)
    questions = await questions.data
    questions = await questions.data
    questions = await questions.event_id
    questions = await getQues(selectedEvent)
    questions = await questions.data
    questions = await questions.data
    console.log(questions)


    dispatch({
      type: GET_QUESTIONS,
      payload: questions
    })


    console.log(questions)
  } catch (error) {
    dispatch({
      type: QUE_ERROR
    })
  }
}




export const editQuestion = () => () => {

}