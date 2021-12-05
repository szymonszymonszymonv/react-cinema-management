import React, { useState } from "react";
import DeleteFilm from "./DeleteFilm";
import FilmPopularity from "./FilmPopularity";
import { useParams, useNavigate } from "react-router";
import PropTypes from 'prop-types'
import axios from 'axios'

function Film(props) {
    const params = useParams()
    let navigate = useNavigate()
    const idx = params.id
    const {films, setFilms, screenings, onDeleteFilm } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(" ");
    const [duration, setDuration] = useState(" ");
    const [listaFilmow, setListaFilmow] = useState(films);
    const [cast, setCast] = useState(" ");

    const onChange = (event) => {
        let value = event.target.value;
        setTitle(value);
    };

    const onChangeDuration = (event) => {
        let value = event.target.value;
        setDuration(value);
    };

    const onChangenDescription = (event) => {
        let value = event.target.value;
        setDescription(value);
    };

    const onChangenCast = (event) => {
        let value = event.target.value;
        setCast(value);
    };

    const buttonClick = () => {
        let copy = [...listaFilmow];
        copy[idx].title = title;
        putFilms(copy)
        setListaFilmow(copy);
        setFilms(copy)
    };

    const buttonClickDuration = () => {
        let copy = [...listaFilmow];
        copy[idx].duration = duration;
        putFilms(copy)
        setListaFilmow(copy);
        setFilms(copy)
    };

    const buttonClickDescription = () => {
        let copy = [...listaFilmow];
        copy[idx].description = description;
        putFilms(copy)
        setListaFilmow(copy);
        setFilms(copy)

    };

    const buttonClickCast = () => {
        let copy = [...listaFilmow];
        copy[idx].cast = cast;
        putFilms(copy)
        setListaFilmow(copy);
        setFilms(copy)
    };

    const putFilms = (films) => {
        axios.put("http://localhost:7777/movies", {movies: films})
        .then(res => { console.log(res) })
    }

    const deleteFilm = (films) => {
        if(idx <= films.length && films.length !== 0){
            navigate("/film/0")
        }
        else{
            navigate("/")
        }
        console.log(`parametr films w Film: ${films.length}`)
        setListaFilmow(films);
        setFilms(films)
    };


    // const deleteButtonClick = () => {
    //     deleteFilmm("")
    // }

    return (
      <div>
        {" "}
            <div >
              <p>
                {" "}
                {"Tytuł: "} {listaFilmow[idx].title}{" "}
              </p>{" "}
              <p>
                {" "}
                {"Opis: "} {listaFilmow[idx].description}{" "}
              </p>{" "}
              <p>
                {" "}
                {"Czas trwania: "} {listaFilmow[idx].duration}{"min "}
              </p>{" "}
              <p>
                {" "}
                {"Obsada: "} {listaFilmow[idx].cast}{" "}
              </p>{" "}
            </div>
        <input type="text" placeholder="Edytuj tytuł" onChange={onChange} />{" "}
        <button onClick={buttonClick}> Edytuj tytuł </button> <p> </p>{" "}
        <input
          type="text"
          placeholder="Edytuj opis"
          onChange={onChangenDescription}
        />{" "}
        <button onClick={buttonClickDescription}> Edytuj opis </button> <p> </p>{" "}
        <input
          type="text"
          placeholder="Edytuj czas trwania filmu"
          onChange={onChangeDuration}
        />{" "}
        <button onClick={buttonClickDuration}> Edytuj czas </button> <p> </p>{" "}
        <input
          type="text"
          placeholder="Edytuj obsadę filmu"
          onChange={onChangenCast}
        />{" "}
        <button onClick={buttonClickCast}> Edytuj obsadę </button> <p> </p>{" "}
        <DeleteFilm
          deleteFilm={deleteFilm}
          listaFilmow={listaFilmow}
          idx={idx}
          onDeleteFilm={onDeleteFilm}
        ></DeleteFilm>{" "}

        <FilmPopularity film={films[idx]} screenings={screenings}>
            
        </FilmPopularity>
      </div>
    );
}

Film.propTypes = {
    films: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    })).isRequired,
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

export default Film;