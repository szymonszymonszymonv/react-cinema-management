import { useState } from 'react';
import Screening from './Screening';
import PropTypes from 'prop-types'

function EditScreening(props) {
    
    const useInput = (type, id, placeholder="") => {
        const [value, setValue] = useState("")
        const input = <input type={type} id={id} placeholder={placeholder} onChange={e => {setValue(e.target.value)}}  />
        return [value, input]
    }

    const { idx , screenings, setScreenings} = props
    const [title, titleInput] = useInput("text", "title", "Tytuł")
    const [date, dateInput] = useInput("date", "date")
    const [time, timeInput] = useInput("text", "time", "godzina")
    const [room, roomInput] = useInput("number", "room", "sala")
    const [soldTickets, soldTicketsInput] = useInput("number", "soldTickets", "ilość sprzedanych biletów")
    const [avaTickets, avaTicketsInput] = useInput("number", "avaTickets", "ilość dostępnych biletów")
    const [takenSeats, takenSeatsInput] = useInput("text", "takenSeats", "zajęte miejsca")
    const [screeningList, setScreeningList] = useState(screenings)

    const buttonClick = () => {
        let copy = [...screeningList]

        copy[idx].film.title = title
        let dateInts = date.split("-").map((x) => {return parseInt(x)})
        dateInts[1] -= 1
        copy[idx].date = new Date(...dateInts)
        copy[idx].time = time
        copy[idx].room = room
        copy[idx].soldTickets = soldTickets
        copy[idx].avaTickets = avaTickets
        copy[idx].takenSeats = takenSeats.split(", ")
        
        setScreeningList(copy)
        setScreenings(copy)
    }

    return (
        <div>
            {titleInput}
            {dateInput}
            {timeInput}
            {roomInput}
            {soldTicketsInput}
            {avaTicketsInput}
            {takenSeatsInput}

            <button onClick={buttonClick}>Edytuj</button>
            
        </div>
    )
}

EditScreening.propTypes = {
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
    }).isRequired),
    idx: PropTypes.number
}

export default EditScreening;