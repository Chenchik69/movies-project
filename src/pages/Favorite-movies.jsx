import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MoviesList from "../component/MoviesList";
import FilteredGenres from "../component/FilteredGenres";

import { Button } from "@mui/material";

import "../styles/FavoriteMovies.css";
import { addFilteredMovies } from "../store/favoriteMoviesReducer";

const FavoriteMovies = () => {
  const [toastActive, setToastActive] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch()
  const favoriteMovies = useSelector((state) => state.favorite.movies);
  const filteredMovies = useSelector((state) => state.favorite.filteredMovies);

  useEffect(() => {
    if (!genres.length) {
      dispatch(addFilteredMovies([]));
    }
  }, [genres]);

  const addGenre = (id) => {
    if (genres.length && genres.includes(id)) {
      setGenres((prevState) => prevState.filter((item) => id !== item));
    } else {
      setGenres((prevState) => [...prevState, id]);
    }
  };

  const filterMovie = () => {
    if (!genres.length) {
      return;
    }
    const filterMovies = favoriteMovies.filter((item) => {
      if (!item?.genre_ids) {
        return false;
      }
      const isIncludes = item.genre_ids.filter((id) => genres.includes(id));
      if (isIncludes.length) {
        return item;
      }
    });
    dispatch(addFilteredMovies(filterMovies));
  };

  const removeFormFavorite = (id) => {
    const moviesUpdated = favoriteMovies.filter((item) => item.id !== id);
  };

  return (
    <>
      <div className="genres-wrapper">
        <FilteredGenres addGenre={addGenre} />
      </div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={filterMovie}
        className="textfild-button"
        fullWidth
      >
        Filter
      </Button>
      <MoviesList
        // movies=
        reducerName='favorite'
        currentMoviesList={filteredMovies.length ? 'filteredMovies' : 'movies'}
        loading={false}
        setFavorite={removeFormFavorite}
        setToastActive={setToastActive}
      />
    </>
  );
};

export default FavoriteMovies;

// доделать фильтр для лучшей работы(что бы если нет подходящего фильма то показывало ворнинг какой-то)
