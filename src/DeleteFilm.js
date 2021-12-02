import React, { useState } from 'react';
import PropTypes from 'prop-types'


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

DeleteFilm.propTypes = {
    listaFilmow: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    })).isRequired,
    idx: PropTypes.number.isRequired,
    deleteFilm: PropTypes.func.isRequired
}
 
export default DeleteFilm;