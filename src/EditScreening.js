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
        console.log(currentDate)
        console.log(inputDate)
        
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

        if(handleValidation()){
            putScreening(screeningJson)
            setScreeningList(copy)
            setScreenings(copy)
        }
    }



    return (
        <div>
            {"film: "}{titleInput}
            <p style={{ color: "red" }}>{errors["title"]}</p>
            {"data: "}{dateInput}
            <p style={{ color: "red" }}>{errors["date"]}</p>
            {"godzina: "}{timeInput}
            <p style={{ color: "red" }}>{errors["time"]}</p>
            {"nr. sali: "} {roomInput}
            <p style={{ color: "red" }}>{errors["room"]}</p>
            
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