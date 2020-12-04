import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from "./userReducer";
import dataReducer from "./dataReducer";
import companyReducer from "./companyReducer";
import uiReducer from "./uiReducer";
import eventReducer from './eventReducer'
import load_or_error from './errorReducer'
import invite from './inviteReducer'
import Q_A from './QandA_reducer'
import payment from './paymentReducer'
import register from './registerReducer'
import arch from './Arch_Reducer'

// import register from './registerReducer'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["load_or_error", "invite", "user",
    "UI", "company", "event", "Q_A", "payment",
    "register", "arc", "UI"]
}





const reducers = combineReducers({
  load_or_error,
  invite,
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
  company: companyReducer,
  event: eventReducer,
  Q_A,
  payment,
  register,
  arch
});

export default persistReducer(persistConfig, reducers)