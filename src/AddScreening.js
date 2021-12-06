import { useState, useEffect } from 'react';
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

    const { films, rooms, screenings, setScreenings } = props
    const [title, titleInput, setTitle] = useInput("select", "title")
    const [date, dateInput] = useInput("date", "date")
    const [time, timeInput] = useInput("time", "time", "Add time")
    const [room, roomInput, setRoom] = useInput("select", "room")

    useEffect(() => {
        setTitle(films[0])
        setRoom(rooms[0])
    }, [])

    let today = new Date();

    let currentDate = today.getTime()
    currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    let currentHour = today.getHours() + ":" + today.getMinutes();
    
    

    const [errors, setErrors] = useState({})
    let fields = { title: title, date: date, time: time, room: room }

    function handleValidation() {
        let errors = {}
        let formIsValid = true
        let dateInts = date.split("-").map((x) => { return parseInt(x) })
        dateInts[1] -= 1

        let inputDate = new Date(...dateInts)
        inputDate = inputDate.getTime()

        
        for (const [key, value] of Object.entries(fields)) {
            if (!value) {
                formIsValid = false
                errors[key] = `${key} cannot be empty`
                setErrors(errors)
                return formIsValid
            }
            else if (value === date) {
                if (inputDate < currentDate) {
                    formIsValid = false
                    errors[key] = `current date is greater than entered time ${key} `
                    setErrors(errors)
                    return formIsValid
                }
            }
            else if (value === time) {
                let time1 = value.split(':')
                let totalSeconds1 = parseInt(time1[0] * 3600 + time1[1] * 60)
                
                let time2 = currentHour.split(':')
                let totalSeconds2 = parseInt(time2[0] * 3600 + time2[1] * 60)
                
                if (inputDate === currentDate.getTime() && totalSeconds1 < totalSeconds2) { // The ==, !=, ===, and !== operators require you to use date.getTime()
                    formIsValid = false
                    errors[key] = `current  time  is greater than entered date and ${key} `
                    setErrors(errors)
                    return formIsValid
                }
            }
        }
        setErrors(errors)
        return formIsValid
    }

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
            soldTickets: 0,
            availableTickets: room.capacity,
            takenSeats: [],
        }
        let screeningJson = {
            id: randId,
            film: title.id,
            date: new Date(...dateInts),
            time: time,
            room: room.nr,
            soldTickets: 0,
            availableTickets: room.capacity,
            takenSeats: []
        }

        if (handleValidation()) {
            axios.post("http://localhost:7777/screenings", { screening: screeningJson })
                .then(res => { console.log(res) })
            copy.push(newScreening)
            setScreenings(copy)
        }



    }


    return (
        <div className="dodaj_seans">
            {"film: "}{titleInput}
            <p style={{ color: "red" }}>{errors["title"]}</p>
            {"data: "}{dateInput}
            <p style={{ color: "red" }}>{errors["date"]}</p>
            {"godzina: "}{timeInput}
            <p style={{ color: "red" }}>{errors["time"]}</p>
            {"nr. sali: "} {roomInput}
            <p style={{ color: "red" }}>{errors["room"]}</p>


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