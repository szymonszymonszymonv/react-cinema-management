import { Link, Outlet } from 'react-router-dom'

function Films(props) {
    const { films } = props

    const displayFilms = () => {
        let moviesView = films.map((item, idx) => {
            return (
                <div key={idx}>
                    <Link class="link_films" to={`/film/${idx}`}>
                        {item.title}
                    </Link> <span>({item.duration}) </span>
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

export default Films;