import React, { Component } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import axios from 'axios'
import Screening from './Screening';
import Film from './Film'
import AddFilm from './AddFilm';
import AddScreening from './AddScreening';
import BuyTicket from './BuyTicket';
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
              let {movies, screenings, rooms} = data
              for(let screening of screenings){
                  let roomId = screening.room
                  let filmId = screening.film
                  let date = new Date(...screening.date)
                  screening.date = date
                  screening.room = rooms.find( (item) => {
                      return item.nr === parseInt(roomId)
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
                <p>SEANSE:</p>
                <Link to={'/seans/add'}>  Add Screening </Link>
                {this.displayScreenings()}
                <p>FILMY:</p>
                <Link to={`/film/add`}>  Add Film :) </Link>
                {this.displayFilms()}
                <Routes>
                    {/* <Route path='/films' element={<Films onDeleteFilm={this.onDeleteFilm} films={movies} setFilms={this.setFilms} />}/> */}
                    <Route path='/film/:id' element={<Film onDeleteFilm={this.onDeleteFilm} films={movies} screenings={screenings} setFilms={this.setFilms} />}/>
                    <Route path='/film/add' element={<AddFilm films={movies} setFilms={this.setFilms} />}/>
                    <Route path='/seans/add' element={<AddScreening films={movies} rooms={rooms} screenings={screenings} setScreenings={this.setScreenings} />}/>
                    <Route path='/seans/:id/' element={<Screening rooms={rooms} films={movies} screenings={screenings} setScreenings={this.setScreenings}/>}>

                    </Route>
                    <Route path='seans/:id/buy' element={<BuyTicket screenings={screenings}  setScreenings={this.setScreenings}></BuyTicket>}/>

                    {/* <Route path='/seans/:seanse' element={<WyswietlSeans sseanse={screenings} setSeanse={this.setScreenings}/>}/> */}
                </Routes>
                {/* <WyswietlSeans  screenings = {screenings} ></WyswietlSeans> */}
            </div>
            );
    }
}
 
export default Main;