import '../styles/MoviesSwitch.css'

const MoviesSwitch = ({active,setActive}) => {

    const handleChangeActive = (e) => {
        const {name} = e.target
        setActive(name)
    }

    return(
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h2>What's Popular</h2>
            <div className="wrapper">
                <button name='popular'
                    onClick={handleChangeActive}
                    className={`toggle ${active === "popular" ? "active" : 'notActive'}`}>
                    Popular
                </button>
                <button name='top_rated'
                    onClick={handleChangeActive}
                    className={`toggle ${active === "top_rated" ? "active" : 'notActive'}`}>
                    Top Rated
                </button>
            </div>
        </div>
    )
}

export default MoviesSwitch