import React, { useState , useInput} from 'react';
import PropTypes from 'prop-types'

function WyswietlSeans(props) {
    const { screenings } = props
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const input = <input type="date" onChange={e => { setDate(e.target.value) }} />
    const inputTime = <input type="time" onChange={e => { setTime(e.target.value) }} />
    
    let dateInts = [] // [2020, 11, 1]
    let timeInts = [] // [12, 30]
    let wypisac = []
    let zmienna;

    // date = "2020-12-1"
    dateInts = date.split("-").map((x) => { return parseInt(x) })
    dateInts[1] -= 1
    zmienna = new Date([...dateInts])

    timeInts = time.split(":").map((x) => { return parseInt(x) })

    for (let i = 0; i < screenings.length; i++) {
        let timeInt = screenings[i].time.split(":").map((x) => { return parseInt(x) })

        if (zmienna.getDate() === screenings[i].date.getDate() 
            && zmienna.getMonth() + 1 === screenings[i].date.getMonth() 
            && zmienna.getFullYear() === screenings[i].date.getFullYear()
            && timeInt[0] >= timeInts[0]) {
            if(timeInt[0] === timeInts[0] && timeInt[1] < timeInts[1]){
                continue
            }
            wypisac.push(screenings[i])
        }
    }

    function WypiszTablice() {
        let tablica = wypisac.map((item, idx) => {
            return <p key={idx}> tytuł: {item.film.title} / data: {item.date.getDate()}.{item.date.getMonth()+1}.{item.date.getFullYear()} {item.time} /
                pokój: {item.room.nr} / sprzedane bilety: {item.soldTickets} </p>
        });
        return tablica;
    }

    return (
        <div class="seans_data">
            <p> Wyświetl seans w danym dniu: </p>
            {input}
            {inputTime}
            {WypiszTablice()}

        </div>
    )

}


WyswietlSeans.propTypes = {
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
        }).isRequired,
        soldTickets: PropTypes.number,
        availableTickets: PropTypes.number,
        takenSeats: PropTypes.arrayOf(PropTypes.number)
    })).isRequired,
}

export default WyswietlSeans;