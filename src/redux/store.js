import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import companyReducer from "./reducers/companyReducer";
import uiReducer from "./reducers/uiReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const NODE_ENV = "production";
const logger = createLogger();
let middlewares = [];

if (NODE_ENV === "development") {
  middlewares = [...middlewares, thunk, logger];
} else {
  middlewares = [...middlewares, thunk];
}

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
  company: companyReducer,
});

const rootReducer = persistReducer(persistConfig, reducers);
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store);
export default store;
