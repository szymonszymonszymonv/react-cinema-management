import React, { Component } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import axios from 'axios'
import Screening from './Screening';
import Film from './Film'
import AddFilm from './AddFilm';
import AddScreening from './AddScreening';
import BuyTicket from './BuyTicket';
import Films from './Films'
import Screenings from './Screenings';
import WyswietlSeans from './WyswietlSeans';
import PropTypes from 'prop-types'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            movies: [],
            rooms: [],
            screenings: [] 
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        let data = null
        axios.get("http://localhost:7777/")
        .then(res => {
              data = res.data;
              console.log(data)
              let {movies, screenings, rooms} = data
              for(let room of rooms){
                  room.nr = `${room.nr}`
              }
              for(let screening of screenings){
                  let roomId = screening.room
                  let filmId = screening.film
                  let date = new Date(...screening.date)
                  screening.date = date
                  screening.room = rooms.find( (item) => {
                      return item.nr === (roomId)
                  })
                  screening.film = movies.find( (item) => {
                      return item.id === filmId
                  })
              }
              this.setState({
                  movies: movies,
                  rooms: rooms,
                  screenings: screenings
              })
        })     
    }

    setScreenings = (screenings) => {
        this.setState( () => {return {screenings: screenings}})
    }

    setFilms = (films) => {
        this.setState({movies: films}, () => {console.log(this.state.movies)})
    }
    
    onDeleteFilm = (filmId) => {
        for(let screening of this.state.screenings){
            let id = screening.film.id
            if(id === filmId){
                axios.delete(`http://localhost:7777/screenings/${screening.id}`)
                .then(res => { console.log(res) })
            }
        }
        let filtered = this.state.screenings.filter( (x) => {
            return x.film.id !== filmId
        })
        this.setState( () => {return {screenings: filtered}})
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
        let movies = this.state.movies//
        let rooms = this.state.rooms
        return ( 
            <div>
                <div className= "menu">
                    <span class ="seanse" >🎦    SEANSE:</span>
                    <Link class="seans_add" to={'/seans/add'}>  Dodaj Seans </Link> <span />
                    <Link class ="lista_seans"to={'/seans/'}>  Lista Seansów </Link>
                    <span class = "filmy "> 🎦   FILMY:</span>
                    <Link class= "listaFilm" to={'/films'}>  Lista Filmów </Link> <span />
                    <Link class= "add_film" to={`/films/add`}>  Dodaj Film  </Link> 
                </div>
                <div className = "tlo"> 

                    <Routes>
                        <Route path='films/*' element={<Films films={movies}  />}>
                            <Route path='add' element={<AddFilm films={movies} setFilms={this.setFilms} />}/>
                        </Route>
                        <Route path='seans/*' element={<Screenings films={movies} screenings={screenings}  />}>
                            <Route path='add' element={<AddScreening films={movies} rooms={rooms} screenings={screenings} setScreenings={this.setScreenings} />}/>
                            <Route path='' element={<WyswietlSeans screenings={screenings} setSeanse={this.setScreenings}/>}/>
                        </Route>
                        <Route path='/film/:id' element={<Film onDeleteFilm={this.onDeleteFilm} films={movies} screenings={screenings} setFilms={this.setFilms} />}/>
                        <Route path='/seans/:id/' element={<Screening rooms={rooms} films={movies} screenings={screenings} setScreenings={this.setScreenings}/>}>
                            <Route path='buy' element={<BuyTicket screenings={screenings}  setScreenings={this.setScreenings}></BuyTicket>}/>
                        </Route>
                    </Routes>
                
                </div>
            </div>
            
            );
    }
}
 
export default Main;