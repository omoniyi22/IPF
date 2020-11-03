import { PAGE_ERROR, POPUP, POPIN, POP_LOADER, PAGE_LOADER, LOADER_OFF } from './../types'
const initailState = {
  page_error: false,
  fetch_error: false,
  page_loader: false,
  pop: false,
  pop_data: {},
  pop_loader: false,
  pop_D: ""
}

export default (state = initailState, action) => {
  switch (action.type) {
    case POPUP:
      return {
        ...state,
        pop_loader: false,
        pop: true,
        pop_data: action.payload
      }
    case POPIN:
      return {
        ...state,
        pop_loader: false,
        pop: false,
        pop_data: {}
      }
    case POP_LOADER:
      return {
        ...state,
        pop_loader: true,
        pop: false,
        pop_data: { status: "loading" }
      }
    case PAGE_ERROR:
      return {
        ...state,
        page_loader: false,
        page_error: action.payload
      }
    case PAGE_LOADER:
      return {
        ...state,
        page_loader: action.payload
      }
    case LOADER_OFF:
      return {
        ...state,
        pop_D: action.payload
      }
    default:
      return {
        ...state
      }
  }
}