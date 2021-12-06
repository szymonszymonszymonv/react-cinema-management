import React, { useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

function AddFilm(props) {

    const { films, setFilms } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [cast, setCast] = useState("");
    //const [listaFilmowAdd, setListaFilmow] = useState(films);
    const input = <input type={"text"} placeholder={"Wpisz tytuł"} onChange={e => { setTitle(e.target.value) }} />
    const input2 = <input type={"text"} placeholder={"Wprowadź opis"} onChange={e => { setDescription(e.target.value) }} />
    const input3 = <input type={"text"} placeholder={"Wprowadź czas trwania"} onChange={e => { setDuration(e.target.value) }} />
    const input4 = <input type={"text"} placeholder={"Wprowadź obsadę"} onChange={e => { setCast(e.target.value) }} />


    const [errors, setErrors] = useState({})
    let fields = { title: title, description: description, duration: duration, cast: cast }

    function handleValidation() {
        let errors = {}
        let formIsValid = true

        for (const [key, value] of Object.entries(fields)) {
            if (!value) {
                formIsValid = false
                errors[key] = `${key} cannot be empty`
                setErrors(errors)
                return formIsValid

            }
            else if (value === title) {
                if (typeof (value) != "string") {
                    formIsValid = false
                    errors["title"] = `${key} is not a string`
                    setErrors(errors)
                    return formIsValid

                }

                if (value.charAt(0) == value.charAt(0).toLowerCase()){
                    formIsValid = false
                    errors["title"] = `${key} must start with a capital letter`
                    setErrors(errors)
                    return formIsValid

                }

            } else if(value === duration){
                let checkFloat = parseFloat(value)
                if(isNaN(value)){    // stringi i np. 12saasd 
                    formIsValid = false
                    errors["duration"] = `${key} is not a integer`
                    setErrors(errors)
                    return formIsValid

                }
                if (!Number.isInteger(checkFloat)) { //floaty np. 40.8
                    formIsValid = false
                    errors["duration"] = `${key} is not a integer`
                    setErrors(errors)
                    return formIsValid

                }
                else if(duration < 30 || duration > 300 ){
                    formIsValid = false
                    errors["duration"] = `${key} must be between <30, 300>`
                    setErrors(errors)
                    return formIsValid
                }
            }
        }
        setErrors(errors)
        return formIsValid
    }



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
        if (handleValidation()) {
            copy.push(filmik);
            axios.post("http://localhost:7777/movies", { movies: copy })
                .then(res => { console.log(res) })
            //setListaFilmow(copy);
            setFilms(copy)
        }
    }


    return (
        <div>

            {"film: "}{input}
            <p style={{ color: "red" }}>{errors["title"]}</p>
            {"opis: "}{input2}
            <p style={{ color: "red" }}>{errors["description"]}</p>
            {"czas trwania: "}{input3}
            <p style={{ color: "red" }}>{errors["duration"]}</p>
            {"obsada: "}{input4}
            <p style={{ color: "red" }}>{errors["cast"]}</p>

            <button onClick={buttonClick}>Dodaj film</button>
        </div>
    )
}

AddFilm.propTypes = {
    films: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    })).isRequired,
    setFilms: PropTypes.func.isRequired
}

export default AddFilm;