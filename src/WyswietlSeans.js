import React, { useState } from 'react';
import PropTypes from 'prop-types'

function WyswietlSeans(props) {
    const { screenings } = props
    const [date, setDate] = useState(" ");

    const input = <input type="date" onChange={e => { setDate(e.target.value) }} />


    let dateInts = []
    let wypisac = []
    let zmienna;

    dateInts = date.split("-").map((x) => { return parseInt(x) })
    dateInts[1] -= 1
    zmienna = new Date(...dateInts)

    for (let i = 0; i < screenings.length; i++) {
        if (zmienna.getDate() === screenings[i].date.getDate()) {
            wypisac.push(screenings[i])
        }
    }

    function WypiszTablice() {
        let tablica = wypisac.map((item, idx) => {
            return <p key={idx}> tytuł: {item.film.title} / data: {item.date.toString()} /
                pokój: {item.room.nr} / sprzedane bilety: {item.soldTickets} </p>
        });
        return tablica;
    }

    return (
        <div>

            {input}
            {WypiszTablice()}

        </div>
    )

}


WyswietlSeans.propTypes = {
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
    })).isRequired,
}

export default WyswietlSeans;