import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const NODE_ENV = "development";
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

const rootReducer = persistReducer(persistConfig, reducers);
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store);
export default store;
