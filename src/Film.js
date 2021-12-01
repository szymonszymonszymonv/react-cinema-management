import React, { useState } from "react";
import DeleteFilm from "./DeleteFilm";
import FilmPopularity from "./FilmPopularity";
import { useParams, useNavigate } from "react-router";

function Film(props) {
    const params = useParams()
    let navigate = useNavigate()
    const idx = params.id
    const {films, setFilms, screenings } = props;
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
        copy[0].title = title;
        setListaFilmow(copy);
        setFilms(copy)
    };

    const buttonClickDuration = () => {
        let copy = [...listaFilmow];
        copy[0].duration = duration;
        setDuration(copy);
        setFilms(copy)
    };

    const buttonClickDescription = () => {
        let copy = [...listaFilmow];
        copy[0].description = description;
        setDescription(copy);
        setFilms(copy)

    };

    const buttonClickCast = () => {
        let copy = [...listaFilmow];
        copy[0].cast = cast;
        setCast(copy);
        setFilms(copy)

    };

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
                {"Czas trwania: "} {listaFilmow[idx].duration}{" "}
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
        ></DeleteFilm>{" "}

        <FilmPopularity film={films[idx]} screenings={screenings}>
            
        </FilmPopularity>
      </div>
    );
}

export default Film;