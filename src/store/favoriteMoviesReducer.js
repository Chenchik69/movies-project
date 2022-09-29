function favoriteMoviesReducer(state = [], {type, payload}) {
    switch (type) {
      case 'ADD_FAVORITE':
        return [...state, ...payload]
      case 'REMOVE_FAVORITE':
        return [...state, ...payload]
      default:
        return state
    }
  }
  
  export default favoriteMoviesReducer