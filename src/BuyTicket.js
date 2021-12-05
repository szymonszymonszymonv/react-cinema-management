import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BuyTicket(props) {

    const { screenings, setScreenings } = props
    const [chosenScreening, setChosenScreening] = useState(screenings[0])
    const [chosenSeat, setChosenSeat] = useState()


    let seatObject = {}


    for (let i = 1; i <= chosenScreening.room.capacity; i++) {
        seatObject[i] = "free"
    }

    for (let seat of chosenScreening.takenSeats) {
        seatObject[seat] = "taken"
    }

    useEffect(() => {
        setChosenSeat(Object.values(seatObject).indexOf("free") + 1)
        console.log("IM IN USE EFFECT")
    }, [])  // działa jak componentDidMount
 

    const buttonClick = () => {
        let copy = [...screenings]
        let idx = screenings.indexOf(chosenScreening)
        seatObject[chosenSeat] = "taken"



        copy[idx].availableTickets--
        copy[idx].soldTickets++
        copy[idx].takenSeats.push(parseInt(chosenSeat))

        let next = Object.values(seatObject).indexOf("free") + 1
        setChosenSeat(next)

        setScreenings(copy)

    }

    return (
        <div>
            <select id={"id"} onChange={e => { setChosenScreening(screenings.find(o => o.film.title === e.target.value)) }}>
                {
                    screenings.map((item, key) => {
                        return (
                            <option value={item.film.title} key={key}>
                                {item.film.title}
                            </option>
                        )
                    })
                }
            </select>

            <select id={"id"} onChange={e => { setChosenSeat(e.target.value) }}>
                {
                    Object.keys(seatObject).map((item, key) => {
                        if (seatObject[item] === "free") {
                            return (
                                <option value={item} key={key}>
                                    {item}
                                </option>
                            )
                        }
                        return null
                    })
                }
            </select>

            <button onClick={buttonClick}>Kup bilet</button>

        </div>

    )
}
export default BuyTicket








