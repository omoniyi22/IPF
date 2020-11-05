import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userReducer from "./userReducer";
import dataReducer from "./dataReducer";
import companyReducer from "./companyReducer";
import uiReducer from "./uiReducer";
import eventReducer from './eventReducer'
import load_or_error from './errorReducer'
import invite from './inviteReducer'




const reducers = combineReducers({
  load_or_error,
  invite,
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
  company: companyReducer,
  event: eventReducer,
});

export default reducers