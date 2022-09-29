function moviesReducer(state = [], {type, payload}) {
  switch (type) {
    case 'GET_MOVIES':
      return [...state, ...payload]
    default:
      return state
  }
}

export default moviesReducer