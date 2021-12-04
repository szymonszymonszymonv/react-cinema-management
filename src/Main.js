import React, { Component } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import axios from 'axios'
import Screening from './Screening';
import Film from './Film'
import AddFilm from './AddFilm';
import AddScreening from './AddScreening';
import WyswietlSeans from './WyswietlSeans';
import PropTypes from 'prop-types'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            movies: [
                {
                    title: "kurier francuski",
                    duration: "91m",
                    description: "fsfggg",
                    cast: "Kuba"
                },
                {
                    title: "james bond",
                    duration: "130m",
                    description: "kfjkdfjagnjdg",
                    cast: "Kuba"
                },
                {
                    title: "diuna",
                    duration: "160m",
                    description: "llkll",
                    cast: "Daria"
                },
                {
                    title: "licorice pizza",
                    duration: "130m",
                    description: "mmmmmm",
                    cast: "Czarek"
                }
            ],
            rooms: [
                {
                    nr: 1,
                    capacity: 20,
                    howManyTaken: 0,
                },
                {
                    nr: 2,
                    capacity: 20,
                    howManyTaken: 0,
                },
                {
                    nr: 3,
                    capacity: 20,
                    howManyTaken: 0,
                },
                {
                    nr: 4,
                    capacity: 20,
                    howManyTaken: 0,
                },
                {
                    nr: 5,
                    capacity: 20,
                    howManyTaken: 0,
                },
            ],
            screenings: [] 
        }
    }

    componentDidMount(){
        this.fetchData()
        this.setState({
            screenings: [
                {
                    film: this.state.movies[0],
                    date: new Date(2021, 11, 1),
                    time: "18:00",
                    room: this.state.rooms[0],
                    soldTickets: 4,
                    availableTickets: 30,
                    takenSeats: [1, 2, 3, 4]
                },
                {
                    film: this.state.movies[0],
                    date: new Date(2021, 11, 2),
                    time: "20:00",
                    room: this.state.rooms[0],
                    soldTickets: 4,
                    availableTickets: 30,
                    takenSeats: [1, 2, 3, 4]
                },
                {
                    film: this.state.movies[0],
                    date: new Date(2021, 11, 2),
                    time: "23:00",
                    room: this.state.rooms[0],
                    soldTickets: 4,
                    availableTickets: 30,
                    takenSeats: [1, 2, 3, 4]
                },
                {
                    film: this.state.movies[1],
                    date: new Date(2021, 11, 1),
                    time: "16:00",
                    room: this.state.rooms[1],
                    soldTickets: 1,
                    availableTickets: 33,
                    takenSeats: [5]
                },
                {
                    film: this.state.movies[3],
                    date: new Date(2021, 11, 2),
                    time: "12:00",
                    room: this.state.rooms[2],
                    soldTickets: 3,
                    availableTickets: 15,
                    takenSeats: [5, 10, 11]
                }
            ]
        })
    }

    fetchData = () => {
        let data = null
        axios.get("http://localhost:7777/")
        .then(res => {
              data = res.data;
        })  
        let {movies, screenings, rooms} = data
        for(let screening of screenings){
            let roomId = screening.room
            let filmId = screening.film
            screening.room = rooms.findIndex( (item) => {
                return item.nr === roomId
            })
            screening.film = movies.findIndex( (item) => {
                return item.id === filmId
            })
        }
        
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
                    <Link to={`/film/${this.state.movies.indexOf(item.film)}`}>{item.film.title}</Link> <span>({item.film.duration}) </span>
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
        let rooms = this.state.rooms
        return ( 
            <div>
                <p>SEANSE:</p>
                <Link to={'/seans/add'}>  Add Screening </Link>
                {this.displayScreenings()}
                <p>FILMY:</p>
                <Link to={`/film/add`}>  Add Film :) </Link>
                {this.displayFilms()}
                <Routes>
                    <Route path='/seans/:id' element={<Screening screenings={screenings} setScreenings={this.setScreenings}/>}/>
                    <Route path='/film/:id' element={<Film films={movies} screenings={screenings} setFilms={this.setFilms} />}/>
                    <Route path='/film/add' element={<AddFilm films={movies} setFilms={this.setFilms} />}/>
                    <Route path='/seans/add' element={<AddScreening films={movies} rooms={rooms} screenings={screenings} setScreenings={this.setScreenings} />}/>
                    {/* <Route path='/seans/:seanse' element={<WyswietlSeans sseanse={screenings} setSeanse={this.setScreenings}/>}/> */}
                </Routes>
                <WyswietlSeans  screenings = {screenings} ></WyswietlSeans>
            </div>
            );
    }
}
 
export default Main;