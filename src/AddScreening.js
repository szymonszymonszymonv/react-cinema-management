import { useState } from 'react';

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
    const [time, timeInput] = useInput("text", "time", "Add time")
    const [room, roomInput] = useInput("select", "room")
    const [soldTickets, soldTicketsInput] = useInput("text", "soldTickets", "Add the number of  sold tickets")
    const [availableTickets, availableTicketsInput] = useInput("number", "availableTickets", "Add the number of available tickets")
    const [takenSeats, takenSeatsInput] = useInput("text", "takenSeats", "Add list of taken seats: e.g (1 ,2 ,3 ,4 ,5 )")


    const buttonClick = () => {
        let copy = [...screenings]
        let dateInts = date.split("-").map((x) => { return parseInt(x) })
        dateInts[1] -= 1
        let newScreening = {
            film: title,
            date: new Date(...dateInts),
            time: time,
            room: room,
            soldTickets: soldTickets,
            availableTickets: availableTickets,
            takenSeats: takenSeats.split(", "),

        }
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

export default AddScreening;