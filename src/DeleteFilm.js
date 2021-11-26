import React, { useState } from 'react';


function DeleteFilm (props){
    const {idx, listaFilmow, deleteFilm} = props
    const film = listaFilmow[idx]
    const [listaFilmoww, setListaFilmow] = useState(listaFilmow)
    const buttonClickDelete = () => {  
        var filtered = listaFilmoww.filter((item) => item !== film)
        setListaFilmow( () => filtered)
        console.log(`lista filmow w DeleteFilm: ${filtered.length}`)
        deleteFilm(filtered)
    }

    return (
        <div>               
          <button onClick={buttonClickDelete}>Usuń film</button>
          <p></p>
        </div>
          )
      
}
 
export default DeleteFilm;