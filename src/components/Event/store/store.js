import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const Store = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
  return store
}

export default Store()

