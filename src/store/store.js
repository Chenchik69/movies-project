import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import favoriteMoviesReducer from './favoriteMoviesReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorite: favoriteMoviesReducer
})

const store = createStore(rootReducer, composeWithDevTools())

export default store
