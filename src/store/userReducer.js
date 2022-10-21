const initialState = {
    user_details: {
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
    },
    session_id:"",
}

function userReducer(state = initialState, {type, payload}) {
    switch (type) {
        case 'SET_USER':
            return {...state, user_details:{...payload}}
        case 'REMOVE_USER':
            return {...state, ...initialState}
        case 'SET_SESSION_ID':
            return {...state, session_id:payload}
        default:
            return state
    }
  }
  
  export default userReducer