import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditScreening from './EditScreening';
import PropTypes from 'prop-types'


function Screening(props) {
    const params = useParams()
    const { screenings, setScreenings } = props
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
                <p>{`sala: ${Object.values(screening.room)[0]}`}</p>
                <p>{`sprzedane bilety: ${screening.soldTickets}`}</p>
                <p>{`dostępne bilety: ${screening.availableTickets}`} </p>   
                <p>{`zajęte miejsca: ${screening.takenSeats}`}</p>    
            </div>
        )
    }

    return (
        
        <div>
            {displayScreening()}
            <EditScreening screenings={screenings} idx={idx} setScreenings={setScreenings}></EditScreening>
        </div>
    )
}


Screening.propTypes = {
    setScreenings: PropTypes.func.isRequired,
    screenings: PropTypes.arrayOf(PropTypes.shape({
        film: PropTypes.shape({
            title: PropTypes.string,
            duration: PropTypes.string,
            description: PropTypes.string,
            cast: PropTypes.string
        }).isRequired,
        date: PropTypes.date,
        time: PropTypes.string,
        room: PropTypes.shape({
            nr: PropTypes.number,
            capacity: PropTypes.number,
            howManyTaken: PropTypes.number
        }).isRequired,
        soldTickets: PropTypes.number,
        availableTickets: PropTypes.number,
        takenSeats: PropTypes.arrayOf(PropTypes.number)
    }).isRequired)
}

export default Screening;