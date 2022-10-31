const initialState = {
  movies: [],
};

function moviesReducer(state = [], {type, payload}) {
  switch (type) {
    case 'GET_MOVIES':
      return {...state, movies:[...payload]}
    default:
      return state
  }
}

export default moviesReducer