  import React, { useState } from 'react';
  import DeleteFilm from './DeleteFilm';

      function Film (props){
        const {filmy,film} = props 
          //const [film, setFilm] = useState(props)
          const [title, setTitle] = useState('');
          const [description, setDescription] = useState(" ");
          const [duration, setDuration] = useState(" ");
          const [listaFilmow, setListaFilmow] = useState(filmy);
          const [cast, setCast] = useState(" ");
          
      

      const onChange = (event) => {
          let value = event.target.value
          setTitle(value)
      }

      const onChangeDuration = (event) => {
          let value = event.target.value
          setDuration(value)
      }

      const onChangenDescription = (event) => {
          let value = event.target.value
          setDescription(value)
      }

      const onChangenCast = (event) => {
        let value = event.target.value
        setCast(value)
      }

      const buttonClick = () => {  
          let copy = [...listaFilmow]
          copy[0].title = title;
          setListaFilmow(copy)
      }

      const buttonClickDuration = () => {  
        let copy = [...listaFilmow]
        copy[0].duration = duration;
        setDuration(copy)
      }

      const buttonClickDescription = () => {  
      let copy = [...listaFilmow]
      copy[0].description = description;
      setDescription(copy)
      }

      const buttonClickCast = () => {  
        let copy = [...listaFilmow]
        copy[0].cast = cast;
        setCast(copy)
       }


      const deleteFilm = (films) => {
        setListaFilmow(films)
      }



      let list = filmy

      // const deleteButtonClick = () => {
      //     deleteFilmm("")
      // }

      return (
        <div>
          {
          list.map((value, index) => {
            return (
              <div key = {index}>
                <p>{"Tytuł: "}{value.title}</p>
                <p>{"Opis: "}{value.description}</p>
                <p>{"Czas trwania: "}{value.duration}</p>
                <p>{"Obsada: "}{value.cast}</p>
              </div>
            )
          }
          
          )
        }    

          <input type="text" placeholder="Edytuj tytuł" onChange={onChange} />
          <button onClick={buttonClick}>Edytuj tytuł</button>
          <p></p>
          <input type="text" placeholder="Edytuj opis" onChange={onChangenDescription} />
          <button onClick={buttonClickDescription}>Edytuj opis</button>
          <p></p>
           <input type="text" placeholder="Edytuj czas trwania filmu" onChange={onChangeDuration} />
          <button onClick={buttonClickDuration}>Edytuj czas</button>
          <p></p>
          <input type="text" placeholder="Edytuj obsadę filmu" onChange={onChangenCast} />
          <button onClick={buttonClickCast}>Edytuj obsadę</button>
          <p></p>
          <DeleteFilm deleteFilm={deleteFilm} listaFilmow={listaFilmow} film={film}></DeleteFilm>
        </div>
          )
    }


    export default Film;
