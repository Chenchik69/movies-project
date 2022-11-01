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

export const getMovieAction =(payload) => ({type: 'GET_MOVIES', payload})

export default moviesReducer