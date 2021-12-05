import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'

function BuyTicket(props) {
    
    const { screenings, setScreenings } = props
    let params = useParams()
    let id = params.id
    let chosenScreeningParam = screenings[id]
    const [chosenSeat, setChosenSeat] = useState()

    let seatObject = {}

    for (let i = 1; i <= chosenScreeningParam.room.capacity; i++) {
        seatObject[i] = "free"
    }

    for (let seat of chosenScreeningParam.takenSeats) {
        seatObject[seat] = "taken"
    }

    useEffect(() => {
        setChosenSeat(Object.values(seatObject).indexOf("free") + 1)
        console.log("IM IN USE EFFECT")
    }, [])  // działa jak componentDidMount
 
    const buttonClick = () => {
        let copy = [...screenings]
        let idx = screenings.indexOf(chosenScreeningParam)
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


BuyTicket.propTypes = {
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
    }).isRequired)
}

export default BuyTicket




