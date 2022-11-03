import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import popularReducer from './popularReducer'
import favoriteMoviesReducer from './favoriteMoviesReducer';
import userReducer from './userReducer'

const rootReducer = combineReducers({
  popular: popularReducer,
  favorite: favoriteMoviesReducer,
  user: userReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
