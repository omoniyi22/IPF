import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import logger, { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";




import rootRuducer from './reducers'

const NODE_ENV = "development";
const configureStore = () => {
  const store = createStore(
    rootRuducer,
    compose(
      applyMiddleware(thunk)
      // , typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore();


// let middlewares = [logger];

// if (NODE_ENV === "development") {
//   middlewares = [...middlewares, thunk];
// } else {
//   middlewares = [...middlewares, thunk];
// }

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user", "event"]
// };

// const rootReducer = persistReducer(persistConfig, reducers);
// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(...middlewares));
// const store = createStore(rootReducer, enhancer);
// export const persistor = persistStore(store);
// export default store;
