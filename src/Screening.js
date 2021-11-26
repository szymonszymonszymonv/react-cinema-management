import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditScreening from './EditScreening';


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
                <p>{`sala: ${screening.room}`}</p>    
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

export default Screening;