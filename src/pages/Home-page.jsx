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
  const [baseUrl, setBaseUrl] = useState("");
  const [posterSizes, setPosterSizes] = useState([
    "w92",
    "w154",
    "w185",
    "w342",
    "w500",
    "w780",
    "original",
  ]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("popular");
  const [toastActive, setToastActive] = useState(false);

  const { searchOpen, closeSearch } = useContext(MoveaContext);

  const dispatch = useDispatch();

  const accountId = useSelector((state) => state.user.user_details.id);
  const sessionId = useSelector((state) => state.user.session_id);
  const favoriteIds = useSelector((state) => state.favorite.ids)

  const keys = Object.keys(localStorage).filter((item) =>
    item.includes("_movieID")
  );
  
  useEffect(() => {
    const getPopular = async () => {
      setLoading(true);

      const config = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_APIKEY}`);
      const configRes = await config.json()
      setBaseUrl(configRes?.images?.secure_base_url);
      localStorage.setItem("secure_base_url", configRes?.images?.secure_base_url);
      setPosterSizes(configRes?.images?.poster_sizes);

      const res = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${active}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=${page}`
        )
      ).json();
      setMovies(
        res?.results.map((item) => {
          const isFavorite = keys.length
            ? keys.includes(`${item.id}_movieID`)
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
      dispatch({ type: "SET_FAVORITES", payload: res?.results });
      dispatch({ type: "SET_FAVORITES_IDS", payload: res?.results.map((item) => item.id) });
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

    // const moviesUpdated = movies.map((item) => {
    //     if (favoriteIds.includes(item.id)) {
    //         return {...item}
    //     } else {
    //         setToastActive(true)
    //         dispatch({ type: "ADD_FAVORITE", payload: item })
    //         dispatch({ type: "ADD_FAVORITE_ID", payload: item.id })
    //         return {...item, isFavorite: true}
    //     }
    // })
    // setMovies(moviesUpdated)

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
    // if(movies.length){
    //   return
    // }
      dispatch({ type: "GET_MOVIES", payload: movies });
  }, [movies]);

  useEffect(() => {
    setTimeout(() => setToastActive(false), 4000);
  }, [toastActive]);

  const moviesSelector = useSelector((movies) => movies.movies);
  // console.log(moviesSelector)

  return (
    <>
      {/* <Container> */}
      <Search
        loading={loading}
        baseUrl={baseUrl}
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
              baseUrl={baseUrl}
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
