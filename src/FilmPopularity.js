

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

export default FilmPopularity;