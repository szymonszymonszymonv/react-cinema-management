import { useState } from 'react';

function AddScreening(props) {
    const useInput = (type, id, placeholder = "") => {
        const [value, setValue] = useState("")
        if (type !== "select") {
            const input = < input type={type} id={id} placeholder={placeholder} onChange={e => { setValue(e.target.value) }} />
            return [value, input]
        }
        else {
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
        
    }


    
    const { films, setFilms, screenings, setScreenings } = props
    const [ title, titleInput ] = useInput("select", "film") 
    const [ date, dateInput ] = useInput("date", "date")
    const [ time, timeInput ] = useInput("text", "time", "Add time")
    const [ room, roomInput ] = useInput("text", "room", "Add room")
    const [ soldTickets, soldTicketsInput ] = useInput("text", "soldTickets", "Add the number of  sold tickets")
    const [ availableTickets, availableTicketsInput ] = useInput("text", "availableTickets", "Add the number of available tickets")
    const [ takenSeats, takenSeatsInput ] = useInput("text", "takenSeats", "Add list of taken seats: e.g (1 ,2 ,3 ,4 ,5 )")
    const [screeningList, setScreeningList] = useState(screenings)
   



    // const title = < input onChange={e => { }} />
    // const date = < input onChange={e => { }} />
    // const time = < input onChange={e => { }} />
    // const room = < input onChange={e => { }} />
    // const soldTickets = < input onChange={e => { }} />
    // const availableTickets = < input onChange={e => { }} />
    // const takenSeats = < input onChange={e => { }} />


    const buttonClick = () => {
        let copy = [...screenings]
        let dateInts = date.split("-").map((x) => {return parseInt(x)})
        dateInts[1] -= 1
        let newScreening = {
            film: title, //this.state.movies[0]
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
            { titleInput }
            { dateInput }
            { timeInput }
            { roomInput }
            { soldTicketsInput }
            { availableTicketsInput }
            { takenSeatsInput }
            <button onClick={buttonClick}>Dodaj seans</button>
        </div>
       
    )
}

export default AddScreening;