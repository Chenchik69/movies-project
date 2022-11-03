const initialState = {
  movies: [],
  filteredMovies:[],
  ids: []
};

function favoriteMoviesReducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'SET_FAVORITES':
      return {...state, movies:[...payload]}
    case 'ADD_FAVORITE':
      const addMovie = state.movies.push(payload)
      return {...state, movies:[...state.movies]}
    case 'REMOVE_FAVORITE':
      const newArrMovies  = state.movies.filter((item) => item.id !== payload.id)
      return {...state, movies: newArrMovies}
    case 'SET_FAVORITES_IDS':
      return {...state, ids:[...payload]}
    case 'ADD_FAVORITE_ID':
      const addId = state.ids.push(payload)
      return {...state, ids:[...state.ids]}
    case 'REMOVE_FAVORITE_ID':
      const newArrIds  = state.ids.filter((id) => id !== payload.id)
      return {...state, ids: newArrIds}
    case 'FILTERED_FAVORITE':
      return {...state, filteredMovies:[...payload]}
    default:
      return state
  }
}

export const setFavoriteAction = (payload) => ({type: 'SET_FAVORITES', payload})
export const addFavoriteAction = (payload) => ({type: 'ADD_FAVORITE', payload})
export const removeFavoriteAction = (payload) => ({type: 'REMOVE_FAVORITE', payload})
export const setFavoriteIdsAction = (payload) => ({type: 'SET_FAVORITES_IDS', payload})
export const addFavoriteIdAction = (payload) => ({type: 'ADD_FAVORITE_ID', payload})
export const removeFavoriteIdAction = (payload) => ({type: 'REMOVE_FAVORITE_ID', payload})
export const addFilteredMovies = (payload) => ({type: 'FILTERED_FAVORITE', payload})


export default favoriteMoviesReducer