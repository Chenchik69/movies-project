import { setFavoriteAction, setFavoriteIdsAction } from "../store/favoriteMoviesReducer";

export const setFavoriteFetch = (accountId,sessionId) => async dispatch => {

  const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${process.env.REACT_APP_APIKEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`)
  const res = await response.json()
  const resFav = res?.results.map((item) => {
    return {
      ...item,
      isFavorite: true,
    };
  })
  dispatch(setFavoriteAction (resFav));
  dispatch(setFavoriteIdsAction (resFav.map((item) => item.id)));
}