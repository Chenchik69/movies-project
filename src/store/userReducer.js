const initialState = {
    avatar: {
        gravatar: {
            hash: ''
        },
        tmdb: {
            avatar_path: null
        }
    },
    id: 0,
    include_adult: true,
    iso_639_1: "",
    iso_3166_1: "",
    name: "",
    username: "",
}

function userReducer(state = initialState, {type, payload}) {
    switch (type) {
        case 'SET_USER':
            return {...state, ...payload}
        case 'REMOVE_USER':
            return {...state, ...initialState}
        default:
            return state
    }
  }
  
  export default userReducer