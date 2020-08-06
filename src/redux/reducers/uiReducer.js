import { SHOW_LOADER } from "../types";

  const INITIAL_STATE = {
    isLoading: false
  }
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SHOW_LOADER:
        return {...state, isLoading: action.payload}
      default:
        return { ...state };
    }
  };