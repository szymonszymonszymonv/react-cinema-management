import { useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

function AddScreening(props) {
    const useInput = (type, id, placeholder = "") => {
        const [value, setValue] = useState("")
        if (type !== "select") {
            const input = < input type={type} id={id} placeholder={placeholder} onChange={e => { setValue(e.target.value) }} />
            return [value, input]
        }
        else {
            if (id === "title") {
                const input = <select type={type} id={id} placeholder={placeholder} onChange={e => { setValue(films.find(o => o.title === e.target.value)) }}>
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

                return [value, input]
            }
            else {
                const input = <select type={type} id={id} placeholder={placeholder} onChange={e => { setValue(rooms.find(o => o.nr == e.target.value)) }}>
                    {
                        rooms.map((item, key) => {
                            return (
                                <option value={item.nr} key={key}>
                                    {item.nr}
                                </option>

                            )

                        })
                    }
                </select>

                return [value, input]
            }
        }
    }

    const { films, rooms, screenings, setScreenings } = props
    const [title, titleInput] = useInput("select", "title")
    const [date, dateInput] = useInput("date", "date")
    const [time, timeInput] = useInput("time", "time", "Add time")
    const [room, roomInput] = useInput("select", "room")
    const [soldTickets, soldTicketsInput] = useInput("text", "soldTickets", "Add the number of  sold tickets")
    const [availableTickets, availableTicketsInput] = useInput("number", "availableTickets", "Add the number of available tickets")
    const [takenSeats, takenSeatsInput] = useInput("text", "takenSeats", "Add list of taken seats: e.g (1 ,2 ,3 ,4 ,5 )")


    const buttonClick = () => {
        let copy = [...screenings]
        let dateInts = date.split("-").map((x) => { return parseInt(x) })
        dateInts[1] -= 1
        let randId = crypto.randomUUID()
        let newScreening = {
            id: randId,
            film: title,
            date: new Date(...dateInts),
            time: time,
            room: room,
            soldTickets: soldTickets,
            availableTickets: availableTickets,
            takenSeats: takenSeats.split(", "),
        }
        let screeningJson = {
            id: randId,
            film: title.id,
            date: new Date(...dateInts),
            time: time,
            room: room.nr,
            soldTickets: soldTickets,
            availableTickets: availableTickets,
            takenSeats: takenSeats
        }

        axios.post("http://localhost:7777/screenings", {screening: screeningJson})
        .then(res => { console.log(res) })
        copy.push(newScreening)
        setScreenings(copy)
    }


    return (
        <div>
            {titleInput}
            {dateInput}
            {timeInput}
            {roomInput}
            {soldTicketsInput}
            {availableTicketsInput}
            {takenSeatsInput}
            <button onClick={buttonClick}>Dodaj seans</button>
        </div>

    )
}


AddScreening.propTypes = {
    films: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    })).isRequired,
    screenings: PropTypes.arrayOf(PropTypes.shape({
        film: PropTypes.shape({
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
    rooms: PropTypes.arrayOf(PropTypes.shape({
        nr: PropTypes.string,
        capacity: PropTypes.number,
        howManyTaken: PropTypes.number
    })).isRequired,
    setScreenings: PropTypes.func.isRequired
}

export default AddScreening;