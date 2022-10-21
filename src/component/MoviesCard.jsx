import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "./Modal";

import { IconButton } from "@mui/material";
import { FavoriteBorder, Favorite, Star, StarBorder} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/MoviesCard.css";
import Image from "../images/no_image.jpg";

const MoviesCard = ({ movie, baseUrl, setToastActive, setFavorite }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const accountId = useSelector((state) => state.user.user_details.id);
  const sessionId = useSelector((state) => state.user.session_id);

  const [modalActive, setModalActive] = useState(false);
  const [allowToRemoveMovie, setAllowToRemoveMovie] = useState(false);

  const goToMoviePage = () => {
    if (location.pathname === `/u/layout/movie/${movie.id}`) {
      return;
    } else {
      navigate(`/u/layout/movie/${movie.id}`, {
        replace: true,
        state: `${location.pathname}`,
      });
    }
  };

  const removeFromFav = async (id) => {
    console.log('id',movie.id)
    console.log('removeFromFav',removeFromFav)
    const payload = {
      "media_type": "movie",
      "media_id": movie.id,
      "favorite": false,
    }
    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${process.env.REACT_APP_APIKEY}&session_id=${sessionId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });
  }

  const addFavorite = () => {
    // срабатывает добавление в избранное
    setFavorite(movie.id);
    // если фильм с фаворит тру то убирает его с редакса
    if (movie.isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: movie});
      dispatch({ type: "REMOVE_FAVORITE_ID", payload: movie});
      localStorage.removeItem(`${movie.id}_movieID`);
      setModalActive(false);
      setToastActive(false);
      removeFromFav()
    }
  };

  const showModal = () => {
    // если фильм в избранном то покзывать модалку, если нет то добавляет фильм физбранное
    if (movie.isFavorite) {
      setModalActive(true);
      setToastActive(false);
    } else {
      setFavorite(movie.id);
      dispatch({ type: "ADD_FAVORITE", payload: movie })
      dispatch({ type: "ADD_FAVORITE_ID", payload: movie.id })
      localStorage.setItem(`${movie.id}_movieID`,JSON.stringify({ ...movie, isFavorite: true }));
      setToastActive(true);
      setModalActive(false);
    }
  };

  const setActive = (status) => {
    setModalActive(status);
  };
  const setAllow = (status) => {
    setAllowToRemoveMovie(status);
    setModalActive(false);
  };

  return (
    <>
      {modalActive ? (
        <Modal
          setModalActive={setActive}
          setAllow={setAllow}
          removeMovie={addFavorite}
        >
          <p>Are you sure you want to remove this movie from your Favorites?</p>
        </Modal>
      ) : null}
      <div className="card-wrapper">
        <div className="card-popular">
          <IconButton
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              color: "#b71c1c",
            }}
            onClick={() => showModal()}
          >
            {movie.isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          {/* <IconButton style={{position: 'absolute', left: '0', top: '0', color: '#ffdd00'}} onClick={() => addFavorite(movie.id)}>
                        {movie.isFavorite ? <Star/> : <StarBorder/>}
                    </IconButton> */}
          <img
            src={
              movie?.poster_path === null
                ? Image
                : `${baseUrl}w500${movie?.poster_path}`
            }
            alt="poster"
            className="card-img"
            onClick={goToMoviePage}
          />
        </div>
      </div>
    </>
  );
};

export default MoviesCard;
// Сделать что бы при отсутсвии фильма не отображалось сердечко
