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

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("popular");
  const [toastActive, setToastActive] = useState(false);

  const { searchOpen, closeSearch } = useContext(MoveaContext);

  const dispatch = useDispatch();

  const accountId = useSelector((state) => state.user.user_details.id);
  const sessionId = useSelector((state) => state.user.session_id);
  const favoriteIds = useSelector((state) => state.favorite.ids)
  
  useEffect(() => {
    const getPopular = async () => {
      setLoading(true);
      
      const res = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${active}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=${page}`
        )
      ).json();
      setMovies(
        res?.results.map((item) => {
          const isFavorite = favoriteIds.length
            ? favoriteIds.includes(item.id)
            : false;
          return {
            ...item,
            isFavorite,
          };
        })
      );
      setLoading(false);
    };
    getPopular().catch(console.error);
  }, [active]);

  useEffect(() => {
    const getFavorite = async () => {
      const res = await (await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${process.env.REACT_APP_APIKEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`)).json()
      const resFav = res?.results.map((item) => {
        return {
          ...item,
          isFavorite: true,
        };
      })
      dispatch({ type: "SET_FAVORITES", payload: resFav });
      dispatch({ type: "SET_FAVORITES_IDS", payload: resFav.map((item) => item.id) });
    }
    getFavorite().catch(console.error);
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
      const moviesUpdated = movies.map((item) => {
          if (item.id !== id) {
              return {...item}
          } else {
              setToastActive(true)
              return {...item, isFavorite: !item.isFavorite}
          }
      })
      setMovies(moviesUpdated)
  };

  useEffect(() => {
      dispatch({ type: "GET_MOVIES", payload: movies });
  }, [movies]);

  useEffect(() => {
    setTimeout(() => setToastActive(false), 4000);
  }, [toastActive]);

  return (
    <>
      {/* <Container> */}
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
            {/* <Paper elevation={6}> */}
            <h2 style={{ padding: "1rem" }}>Popular Trailers</h2>
            <SideBar movies={movies} />
            {/* </Paper> */}
          </Grid>
          <Grid item xs={8} sx={{ borderLeft: "1px solid #939285" }}>
            {/* <Paper elevation={6}> */}
            <MoviesSwitch active={active} setActive={setActive} />
            <MoviesList
              loading={loading}
              movies={movies}
              active={active}
              setActive={setActive}
              setFavorite={setFavorite}
              setToastActive={setToastActive}
            />
            {/* </Paper> */}
          </Grid>
        </Grid>
      </Box>
      {/* </Container>    */}
    </>
  );
};

export default Home;
