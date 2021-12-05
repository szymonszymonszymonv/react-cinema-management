import React, { useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

function AddFilm(props){

    const {films, setFilms } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(" ");
    const [duration, setDuration] = useState(" ");
    const [cast, setCast] = useState(" ");
    //const [listaFilmowAdd, setListaFilmow] = useState(films);
    const input = <input type={"text"}  placeholder={"Wpisz tytuł"} onChange={e => {setTitle(e.target.value)}}  />
    const input2 = <input type={"text"} placeholder={"Wprowadź opis"} onChange={e => {setDescription(e.target.value)}}  />
    const input3 = <input type={"text"} placeholder={"Wprowadź czas trwania"} onChange={e => {setDuration(e.target.value)}}  />
    const input4 = <input type={"text"}  placeholder={"Wprowadź obsadę"} onChange={e => {setCast(e.target.value)}}  />



    const buttonClick = () => {
        let copy = [...films];
        let randId = crypto.randomUUID()

        let filmik = {
            id: randId,
            title: title,
            duration: duration,
            description: description,
            cast: cast
        }
        copy.push(filmik);
        axios.post("http://localhost:7777/movies", {movies: copy})
        .then(res => { console.log(res) })
        //setListaFilmow(copy);
        setFilms(copy)
    };


    return (
        <div>  
            {input} {input2} {input3} {input4}            
          <button onClick={buttonClick}>Dodaj film</button>
        </div>
          )

}


AddFilm.propTypes = {
    films: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    })).isRequired,
    setFilms: PropTypes.func.isRequired
}

export default AddFilm;