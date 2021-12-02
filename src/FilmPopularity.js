import PropTypes from 'prop-types'

function FilmPopularity(props) {
    const { screenings, film } = props

    let screenings_by_days = {}

    for(let screening of screenings){
        if(screening.film.title !== film.title){
            continue
        }
        let day = screening.date.getDate()
        if(!screenings_by_days[day]){
            screenings_by_days[day] = screening.soldTickets
        }
        else{
            screenings_by_days[day] += screening.soldTickets
        }
        
    }
    
    return (
        <div>
            {
                Object.keys(screenings_by_days).map( (day) => {
                    return <p>popularność dzień {day}: {screenings_by_days[day]}</p>
                })
            }
        </div>
    )
}

FilmPopularity.propTypes = {
    film: PropTypes.shape({
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    }).isRequired,
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
    setFilms: PropTypes.func.isRequired
}

export default FilmPopularity;