import React, { Component } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import Screening from './Screening';
import Film from './Film'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            movies: [
                {
                    title: "kurier francuski",
                    duration: "91m"
                },
                {
                    title: "james bond",
                    duration: "130m"
                },
                {
                    title: "diuna",
                    duration: "160m"
                },
                {
                    title: "licorice pizza",
                    duration: "130m"
                }
            ],
            screenings: []
        }
    }

    componentDidMount(){
        this.setState({
            screenings: [
                {
                    film: this.state.movies[0],
                    date: new Date(),
                    time: "18:00",
                    room: 5,
                    soldTickets: 4,
                    availableTickets: 30,
                    takenSeats: [1, 2, 3, 4]
                },
                {
                    film: this.state.movies[1],
                    date: new Date(),
                    time: "16:00",
                    room: 3,
                    soldTickets: 1,
                    availableTickets: 33,
                    takenSeats: [5]
                },
                {
                    film: this.state.movies[3],
                    date: new Date(),
                    time: "12:00",
                    room: 1,
                    soldTickets: 3,
                    availableTickets: 15,
                    takenSeats: [5, 10, 11]
                }
            ]
        })
    }

    setScreenings = (screenings) => {
        this.setState( () => {return {screenings: screenings}})
    }

    setFilms = (films) => {
        this.setState({movies: films}, () => {console.log(this.state.movies)})
    }

    displayScreenings = () => {
        let screeningsView = this.state.screenings.map((item, idx) => {
            return (
                <div key={idx}>
                    <Link to={`/film/${idx}`}>{item.film.title}</Link> <span>({item.film.duration}) </span>
                    <Link to={`seans/${idx}`}>
                        {item.time}
                    </Link>
                    
                </div>
            )
        })
        return screeningsView
    }

    displayFilms = () => {
        let moviesView = this.state.movies.map((item, idx) => {
            return (
                <div key={idx}>
                    <Link to={`/film/${idx}`}>
                        {item.title}
                    </Link> <span>({item.duration}) </span>
                    {/* <Screening screening={item} id={idx} /> */}
                </div>
            )
        })
        return moviesView
    }

    render() { 
        let screenings = this.state.screenings
        let movies = this.state.movies
        return ( 
            <div>
                <p>SEANSE:</p>
                {this.displayScreenings()}
                <p>FILMY:</p>
                {this.displayFilms()}
                <Routes>
                    <Route path='/seans/:id' element={<Screening screenings={screenings} setScreenings={this.setScreenings}/>}/>
                    <Route path='/film/:id' element={<Film films={movies} setFilms={this.setFilms} />}/>
                </Routes>
            </div>
            );
    }
}
 
export default Main;