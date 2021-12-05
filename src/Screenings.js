import { Link, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

function Screenings(props) {
    const { films, screenings } = props


    const displayScreenings = () => {
        let screeningsView = screenings.map((item, idx) => {
            return (
                <div key={idx}>
                    <Link class="screenings" to={`/film/${films.indexOf(item.film)}`}>{item.film.title}</Link> <span>({item.film.duration}) </span>
                    <Link class="screenings_time" to={`${idx}`}>
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
            {/* <Outlet /> */}
        </div>
    )
}

Screenings.propTypes = {
    films: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    })).isRequired,
    screenings: PropTypes.arrayOf(PropTypes.shape({
        film: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            duration: PropTypes.string,
            description: PropTypes.string,
            cast: PropTypes.string
        }).isRequired,
        id: PropTypes.string,
        date: PropTypes.date,
        time: PropTypes.string,
        room: PropTypes.shape({
            nr: PropTypes.string,
            capacity: PropTypes.number,
            howManyTaken: PropTypes.number
        }).isRequired,
        soldTickets: PropTypes.number,
        availableTickets: PropTypes.number,
        takenSeats: PropTypes.arrayOf(PropTypes.number)
    })).isRequired,
    setScreenings: PropTypes.func.isRequired
}

export default Screenings;