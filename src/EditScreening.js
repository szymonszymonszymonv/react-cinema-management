import { useState } from 'react';
import Screening from './Screening';

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
        copy[idx].date = new Date(date)
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

export default EditScreening;