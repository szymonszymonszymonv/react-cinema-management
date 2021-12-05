import { useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';

import EditScreening from './EditScreening';
import BuyTicket from './BuyTicket';
import PropTypes from 'prop-types'


function Screening(props) {
    const params = useParams()
    const { films, screenings, setScreenings, rooms } = props
    const [screeningList, setScreeningList] = useState(screenings)
    const idx = params.id
    const screening = screeningList[idx]


    const editScreening = (screening) => {
        setScreeningList(screening)
    }


    const displayScreening = () => {
        return (
            <div>
                <p>{`tytuł: ${screening.film.title}`}</p>    
                <p>{`data: ${screening.date.getFullYear()}.${screening.date.getMonth() + 1}.${screening.date.getDate()}`} </p>   
                <p>{`godzina: ${screening.time}`}</p>
                <p>{`sala: ${screening.room.nr}`}</p>
                <p>{`sprzedane bilety: ${screening.soldTickets}`}</p>
                <p>{`dostępne bilety: ${screening.availableTickets}`} </p>   
                <p>{`zajęte miejsca: ${screening.takenSeats}`}</p>    
            </div>
        )
    }

    return (
        
        <div>
            {displayScreening()}
            <EditScreening films={films} screenings={screenings} idx={idx} setScreenings={setScreenings}></EditScreening>

            <p>KUP BILET:</p>
            <Link to={`buy`}>  Buy Ticket </Link>
            <Outlet />
        </div>
    )
}


Screening.propTypes = {
    setScreenings: PropTypes.func.isRequired,
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
    }).isRequired)
}

export default Screening;