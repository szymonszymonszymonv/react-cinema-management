import React, { useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'


function DeleteFilm (props){
    const { idx, listaFilmow, deleteFilm, onDeleteFilm } = props
    const film = listaFilmow[idx]
    const [listaFilmoww, setListaFilmow] = useState(listaFilmow)

    const axiosDeleteFilm = (id) => {
        axios.delete(`http://localhost:7777/movies/${id}`)
        .then(res => { console.log(res) })
    }
    
    const buttonClickDelete = () => {
        let id = film.id  
        var filtered = listaFilmoww.filter((item) => item !== film)
        setListaFilmow( () => filtered)
        onDeleteFilm(id)
        axiosDeleteFilm(id)
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
        id: PropTypes.string,
        title: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string
    })).isRequired,
    idx: PropTypes.string.isRequired,
    deleteFilm: PropTypes.func.isRequired
}
 
export default DeleteFilm;