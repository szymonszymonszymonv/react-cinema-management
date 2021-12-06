import React, { useState, useEffect } from "react";
import DeleteFilm from "./DeleteFilm";
import FilmPopularity from "./FilmPopularity";
import { useParams, useNavigate } from "react-router";
import PropTypes from 'prop-types'
import axios from 'axios'

function Film(props) {
  const params = useParams()
  let navigate = useNavigate()
  const idx = params.id
  const { films, setFilms, screenings, onDeleteFilm } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [listaFilmow, setListaFilmow] = useState(films);
  const [cast, setCast] = useState("");
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setTitle(listaFilmow[idx].title)
    setDescription(listaFilmow[idx].description)
    setCast(listaFilmow[idx].cast)
    setDuration(listaFilmow[idx].duration)
  }, [])

  function handleValidation() {
    let errors = {}
    let formIsValid = true

    if (!title) {
      formIsValid = false
      errors["title"] = `title cannot be empty`
      setErrors(errors)
      return formIsValid
    }
    else {
      if (typeof (title) !== "string") {
        formIsValid = false
        errors["title"] = `title is not a string`
        setErrors(errors)
        return formIsValid
      }

      if (title.charAt(0) === title.charAt(0).toLowerCase()) {
        formIsValid = false
        errors["title"] = `title must start with a capital letter`
        setErrors(errors)
        return formIsValid
      }
    }

    if (!description) {
      formIsValid = false
      errors["description"] = `description cannot be empty`
      setErrors(errors)
      return formIsValid
    }


    if (!duration) {
      formIsValid = false
      errors["duration"] = `duration cannot be empty`
      setErrors(errors)
      return formIsValid
    }
    else {
      let checkFloat = parseFloat(duration)
      if (isNaN(duration)) {    //12saasd 
        formIsValid = false
        errors["duration"] = `duration is not a integer`
        setErrors(errors)
        return formIsValid

      }
      if (!Number.isInteger(checkFloat)) { //40.8
        formIsValid = false
        errors["duration"] = `duration is not a integer`
        setErrors(errors)
        return formIsValid

      }
      else if (duration < 30 || duration > 300) {
        formIsValid = false
        errors["duration"] = `duration must be between <30, 300>`
        setErrors(errors)
        return formIsValid
      }
    }


    if (!cast) {
      formIsValid = false
      errors["cast"] = `cast cannot be empty`
      setErrors(errors)
      return formIsValid
    }

    setErrors(errors)
    return formIsValid
  }


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
    console.log(handleValidation())
    if (handleValidation()) {
      copy[idx].title = title;
      copy[idx].duration = duration;
      copy[idx].description = description;
      copy[idx].cast = cast;
      putFilms(copy)
      setListaFilmow(copy);
      setFilms(copy)
    }

  };

  const putFilms = (films) => {
    axios.put("http://localhost:7777/movies", { movies: films })
      .then(res => { console.log(res) })
  }

  const deleteFilm = (films) => {
    if (idx <= films.length && films.length !== 0) {
      navigate("/film/0")
    }
    else {
      navigate("/")
    }
    console.log(`parametr films w Film: ${films.length}`)
    setListaFilmow(films);
    setFilms(films)
  };



  return (
    <div>
      <div >
        <p>
          {"Tytuł: "} {listaFilmow[idx].title}
        </p>
        <p>
          {"Opis: "} {listaFilmow[idx].description}
        </p>
        <p>
          {"Czas trwania: "} {listaFilmow[idx].duration}{"min "}
        </p>
        <p>
          {"Obsada: "} {listaFilmow[idx].cast}
        </p>
      </div>

      Tytuł: <input type="text" value={title} onChange={onChange} />
      <p style={{ color: "red" }}>{errors["title"]}</p>
      Opis: <input type="text" value={description} onChange={onChangenDescription} />
      <p style={{ color: "red" }}>{errors["description"]}</p>
      Długość: <input type="text" value={duration} onChange={onChangeDuration} />
      <p style={{ color: "red" }}>{errors["duration"]}</p>
      Obsada: <input type="text" value={cast} onChange={onChangenCast} />
      <p style={{ color: "red" }}>{errors["cast"]}</p>

      <button onClick={buttonClick}> Edytuj</button> <p> </p>

      <DeleteFilm
        deleteFilm={deleteFilm}
        listaFilmow={listaFilmow}
        idx={idx}
        onDeleteFilm={onDeleteFilm}
      ></DeleteFilm>

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