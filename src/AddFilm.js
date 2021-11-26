import React, { useState } from 'react';

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

        let filmik = {
            title: title,
            duration: duration,
            description: description,
            cast: cast
        }
        copy.push(filmik);
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
export default AddFilm;