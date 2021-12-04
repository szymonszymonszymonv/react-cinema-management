import { useState } from 'react';
import Screening from './Screening';
import PropTypes from 'prop-types'
import axios from 'axios'

function EditScreening(props) {
    
    const useInput = (type, id, placeholder="") => {
        const [value, setValue] = useState("")
        const input = <input type={type} id={id} placeholder={placeholder} onChange={e => {setValue(e.target.value)}}  />
        return [value, input]
    }

    const { idx, screenings, setScreenings, films, rooms } = props
    const [date, dateInput] = useInput("date", "date")
    const [time, timeInput] = useInput("time", "time", "godzina")
    const [room, roomInput] = useInput("number", "room", "sala")
    const [soldTickets, soldTicketsInput] = useInput("number", "soldTickets", "ilość sprzedanych biletów")
    const [avaTickets, avaTicketsInput] = useInput("number", "avaTickets", "ilość dostępnych biletów")
    const [takenSeats, takenSeatsInput] = useInput("text", "takenSeats", "zajęte miejsca")
    const [film, setFilm] = useState(films[0])
    const [screeningList, setScreeningList] = useState(screenings)

    const putScreening = (screening) => {
        axios.put("http://localhost:7777/screenings", {screening: screening})
        .then(res => { console.log(res) })
    }

    const buttonClick = () => {
        let copy = [...screeningList]

        copy[idx].film = film
        let dateInts = date.split("-").map((x) => {return parseInt(x)})
        dateInts[1] -= 1
        copy[idx].date = new Date(...dateInts)
        copy[idx].time = time
        copy[idx].room = room
        copy[idx].soldTickets = soldTickets
        copy[idx].availableTickets = avaTickets
        copy[idx].takenSeats = takenSeats.split(", ")

        let screeningJson = {
            id: copy[idx].id,
            film: film.id,
            date: dateInts,
            time: time,
            room: room, // FIXME: room.nr, select room
            soldTickets: soldTickets,
            availableTickets: avaTickets,
            takenSeats: takenSeats
        }

        putScreening(screeningJson)
        setScreeningList(copy)
        setScreenings(copy)
    }



    return (
        <div>
            <select id={"id"} onChange={e => { setFilm(films.find(film => film.title === e.target.value)) }}>
                {
                    films.map((item, key) => {
                        return (
                            <option value={item.title} key={key}>
                                {item.title}
                            </option>
                        )
                    })
                }
            </select>

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