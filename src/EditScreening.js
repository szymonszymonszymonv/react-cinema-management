import { useState, useEffect } from 'react';
import Screening from './Screening';
import PropTypes from 'prop-types'
import axios from 'axios'

function EditScreening(props) {

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

                return [value, input, setValue]
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

                return [value, input, setValue]
            }
        }
    }

    const { idx, screenings, setScreenings, films, rooms } = props
    const [title, titleInput, setTitle] = useInput("select", "title")
    const [date, dateInput] = useInput("date", "date")
    const [time, timeInput] = useInput("time", "time", "godzina") //godzina 16 time=16
    const [room, roomInput, setRoom] = useInput("select", "room", "sala")
    const [film, setFilm] = useState(films[0])
    const [screeningList, setScreeningList] = useState(screenings)

    useEffect(() => {
        setTitle(films[0])
        setRoom(rooms[0])
    }, [])


    const putScreening = (screening) => {
        axios.put("http://localhost:7777/screenings", { screening: screening })
            .then(res => { console.log(res) })
    }

    const buttonClick = () => {
        let copy = [...screeningList]

        copy[idx].film = film
        let dateInts = date.split("-").map((x) => { return parseInt(x) })
        dateInts[1] -= 1
        copy[idx].title = title
        copy[idx].date = new Date(...dateInts)
        copy[idx].time = time
        copy[idx].room = room

        let screeningJson = {
            id: copy[idx].id,
            film: title.id,
            date: dateInts,
            time: time,
            room: room.nr, 
            soldTickets: copy[idx].soldTickets,
            availableTickets: copy[idx].availableTickets,
            takenSeats: copy[idx].takenSeats
        }

        putScreening(screeningJson)
        setScreeningList(copy)
        setScreenings(copy)
    }



    return (
        <div>
            {titleInput}
            {dateInput}
            {timeInput}
            {roomInput}
            

            <button onClick={buttonClick}>Edytuj</button>
        </div>
    )
}

EditScreening.propTypes = {
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
    }).isRequired),
    idx: PropTypes.string.isRequired
}

export default EditScreening;