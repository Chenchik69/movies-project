import { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';

import '../styles/FilteredGenres.css'

const FilteredGenres = ({addGenre}) => {
    
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(false)

  const allGenres = async () => {
    setLoading(true)
    const res = await (await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`)).json()
    setGenres(res.genres)
    setLoading(false)
  }

  useEffect(() => {
    allGenres()
  }, [])

  const renderGenres = () => genres.map(genre => {
    return(
      <Grid item xs={1.5} key={genre.id}  >
        <label className="checkbox" >
          <input type="checkbox" className="checkbox__input" onClick={() => addGenre(genre.id)}/>
          <div className="checkbox__div">
            <span className="checkbox__span">{genre.name}</span>
          </div>
        </label>
      </Grid>
    )
  })
  return(
    <>
      <Grid container spacing={1}  >
          {!loading && !!genres.length && renderGenres()}
      </Grid>
    </>
  )  
}

export default FilteredGenres