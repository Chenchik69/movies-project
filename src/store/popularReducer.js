const initialState = {
  movies: [],
};

function popularReducer(state = [], {type, payload}) {
  switch (type) {
    case 'GET_MOVIES':
      return {...state, movies:[...payload]}
    default:
      return state
  }
}

export const getPopularAction =(payload) => ({type: 'GET_MOVIES', payload})

export default popularReducer