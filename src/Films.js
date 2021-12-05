import { Link, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

function Films(props) {
    const { films } = props

    const displayFilms = () => {
        let moviesView = films.map((item, idx) => {
            return (
                <div key={idx}>
                    <Link class="link_films" to={`/film/${idx}`}>
                        {item.title}
                    </Link> <span>({item.duration}min) </span>
                    {/* <Screening screening={item} id={idx} /> */}
                </div>
            )
        })
        return moviesView
    }

    return ( 
        <div className = "films">
            {displayFilms()}
            <Outlet />
        </div>
    )
}

Films.propTypes = {
    films: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    })).isRequired
}


export default Films;