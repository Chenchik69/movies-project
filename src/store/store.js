import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import moviesReducer from './moviesReducer'
import favoriteMoviesReducer from './favoriteMoviesReducer';
import userReducer from './userReducer'

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorite: favoriteMoviesReducer,
  user: userReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
