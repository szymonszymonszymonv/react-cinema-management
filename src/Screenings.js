import { Link, Outlet } from 'react-router-dom'

function Screenings(props) {
    const { films, screenings } = props


    const displayScreenings = () => {
        let screeningsView = screenings.map((item, idx) => {
            return (
                <div key={idx}>
                    <Link to={`/film/${films.indexOf(item.film)}`}>{item.film.title}</Link> <span>({item.film.duration}) </span>
                    <Link to={`${idx}`}>
                        {item.time}
                    </Link>
                    
                </div>
            )
        })
        return screeningsView
    }

    return ( 
        <div>
            {displayScreenings()}
            <Outlet />
        </div>
    )
}

export default Screenings;