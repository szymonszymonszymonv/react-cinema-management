//import { useState } from 'react';
//import { useParams } from 'react-router-dom';
//import { useParams, useNavigate } from "react-router";
import React, { useState } from 'react';

function WyswietlSeans (props){
  const { screenings} = props
  const [date, setDate] = useState(" ");
  //const [screeningList, setScreeningList] = useState(screenings)
  const input = <input type="date"  onChange={e => {setDate(e.target.value)}} />


  let dateInts = []
  let wypisac = []
  let zmienna;

  dateInts = date.split("-").map((x) => {return parseInt(x)})
  dateInts[1] -= 1
  zmienna = new Date(...dateInts)
  console.log(dateInts)
  console.log(zmienna)
  
  
  for(let i=0; i<screenings.length; i++){
    if(date === screenings[i].date){
      wypisac.push(screenings[i])
    }
  }

  function WypiszTablice() {
    let tablica = wypisac.map((item) => {      
      return <span> {item.film} {item.date} {item.time} {item.room} {item.soldTickets} </span> 
    });
    return tablica;
  }

  // const idx = params.id
  // const screening = screeningList[idx]
 
    // const displayScreenings = () => {
    //   return (
    //       <div>
    //           <p>{`tytuł: ${screening.film.title}`}</p>    
    //           <p>{`data: ${screening.date.getFullYear()}.${screening.date.getMonth() + 1}.${screening.date.getDate()}`} </p>   
    //           <p>{`godzina: ${screening.time}`}</p>    
    //           <p>{`sala: ${Object.values(screening.room)[0]}`}</p> 
    //           <p>{`sprzedane bilety: ${screening.soldTickets}`}</p>    
    //           <p>{`dostępne bilety: ${screening.availableTickets}`} </p>   
    //           <p>{`zajęte miejsca: ${screening.takenSeats}`}</p>    
    //       </div>
    //   )
    // }


    return (
        <div>               
          
          {input}
          {WypiszTablice()}

        </div>
          )
      
}
 
export default WyswietlSeans;