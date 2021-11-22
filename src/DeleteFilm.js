import React, { useState } from 'react';


function DeleteFilm (props){
    const {film, listaFilmow, deleteFilm} = props

    const [listaFilmoww, setListaFilmow] = useState(listaFilmow)
    const buttonClickDelete = () => {  
        var filtered = listaFilmoww.filter((item) => item !== film)
        setListaFilmow(filtered)
        deleteFilm(listaFilmoww)
    }

    return (
        <div>               
          <button onClick={buttonClickDelete}>Usuń film</button>
          <p></p>
        </div>
          )
      
}
 
export default DeleteFilm;