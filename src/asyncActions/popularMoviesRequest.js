import { getPopularAction } from "../store/popularReducer";

export const getPopularFetch = (active,page,favoriteIds) => async dispatch => {

  const response = await fetch(`https://api.themoviedb.org/3/movie/${active}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=${page}`)
  const res = await response.json()
  const resPop = res?.results.map((item) => {
    const isFavorite = favoriteIds.length ? favoriteIds.includes(item.id) : false;
    return {
      ...item,
      isFavorite,
    };
  })
  dispatch(getPopularAction (resPop));
}