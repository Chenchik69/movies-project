import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import SideBar from "../component/SideBar";
import MoviesList from "../component/MoviesList";
import MoviesSwitch from "../component/MoviesSwitch";
import Search from "../component/Search";
import Toast from "../component/Toast";
import { MoveaContext } from "../context/MoveaContext";

import { Container, Box, Paper, Grid } from "@mui/material";

import "../styles/Home-page.css";
import { setFavoriteFetch } from "../asyncActions/favoriteMoviesRequests";
import { getPopularFetch } from "../asyncActions/popularMoviesRequest";
import { getPopularAction } from "../store/popularReducer";

const Home = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("popular");
  const [toastActive, setToastActive] = useState(false);

  const { searchOpen, closeSearch } = useContext(MoveaContext);

  const dispatch = useDispatch();

  const accountId = useSelector((state) => state.user.user_details.id);
  const sessionId = useSelector((state) => state.user.session_id);
  const favoriteIds = useSelector((state) => state.favorite.ids);
  const moviesPopular = useSelector((state) => state.popular.movies)
  
  //! сначала все крашиться, а потом приходят фильмы в редакс
  useEffect(() => {
    const getPopular = () => {
      setLoading(true);
        dispatch(getPopularFetch(active,page,favoriteIds))
      setLoading(false);
    }
    getPopular()
  }, [active]);

  useEffect(() => {
    const getFavorite = () => {
      dispatch(setFavoriteFetch(accountId,sessionId))
    }
    getFavorite()
  },[])

  const setFavorite = async (id) => {
    const payload = {
      "media_type": "movie",
      "media_id": id,
      "favorite": true
    }
    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${process.env.REACT_APP_APIKEY}&session_id=${sessionId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    // вернул что б сердечко менялось
      const moviesUpdated = moviesPopular.map((item) => {
          if (item.id !== id) {
              return {...item}
          } else {
              setToastActive(true)
              return {...item, isFavorite: !item.isFavorite}
          }
      })
      dispatch(getPopularAction(moviesUpdated))
  };

  useEffect(() => {
    setTimeout(() => setToastActive(false), 4000);
  }, [toastActive]);

  return (
    <>
      <Search
        loading={loading}
        searchOpen={searchOpen}
        closeSearch={closeSearch}
      />
      {toastActive ? (
        <Toast setToastActive={setToastActive}>
          <p>Movie added to Favorite Movies</p>
        </Toast>
      ) : null}
      <Box>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid item>
            <h2 style={{ padding: "1rem" }}>Popular Trailers</h2>
            <SideBar movies={moviesPopular} />
          </Grid>
          <Grid item xs={8} sx={{ borderLeft: "1px solid #939285" }}>
            <MoviesSwitch active={active} setActive={setActive} />
            <MoviesList
              loading={loading}
              reducerName='popular'
              currentMoviesList='movies'
              setActive={setActive}
              setFavorite={setFavorite}
              setToastActive={setToastActive}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
