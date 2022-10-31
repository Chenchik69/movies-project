const initialState = {
  movies: [],
  ids: []
};

function favoriteMoviesReducer(state = initialState, {type, payload}) {
    switch (type) {
      case 'SET_FAVORITES':
        return {...state, movies:[...payload]}
      case 'ADD_FAVORITE':
        // ! Добавляет фильм даже если он уже есть в редаксе
        // ! Записывает фильм с полем isFavorite: false
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
      default:
        return state
    }
  }
  
  export default favoriteMoviesReducer