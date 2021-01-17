import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import rootRuducer from './reducers'



const configureStore = () => {
  const store = createStore(
    rootRuducer,
    compose(
      applyMiddleware(thunk)
    )
  )
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore();