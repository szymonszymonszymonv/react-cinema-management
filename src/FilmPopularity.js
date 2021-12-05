import PropTypes from 'prop-types'

function FilmPopularity(props) {
    const { screenings, film } = props

    let screenings_by_days = {}

    for(let screening of screenings){
        if(screening.film.title !== film.title){
            continue
        }
        let day = screening.date.getDate()
        let month = screening.date.getMonth() + 1
        let year = screening.date.getFullYear()
        console.log(year)
        if(!screenings_by_days[day]){
            screenings_by_days[day] = {
                sold: screening.soldTickets,
                month: month,
                year: year,
            }
            // screenings_by_days[day] = screening.soldTickets
            // screenings_by_days[day].month = month
            // screenings_by_days[day].year = year
        }
        else{
            screenings_by_days[day] += screening.soldTickets
        }
        
    }
    
    return (
        <div>
            {
                Object.keys(screenings_by_days).map( (day, idx) => {
                    return <p key={idx}>popularność dzień {day}.{screenings_by_days[day].month}.{screenings_by_days[day].year}: {screenings_by_days[day].sold}</p>
                })
            }
        </div>
    )
}

FilmPopularity.propTypes = {
    film: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    }).isRequired,
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
    })).isRequired,
    setFilms: PropTypes.func.isRequired
}

export default FilmPopularity;