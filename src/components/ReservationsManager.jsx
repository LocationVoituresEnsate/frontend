import React from 'react'
import Card from './Card'
import './ProductCard.css'

const ReservationsManager = () => {
    return (
      <div className='carCards'>
        <div className="top-bar">
          <button className='add-voiture'>Ajouter une voiture</button>
        </div>
        <div className="cards"> 
          <Card />
        </div>
      </div>
    )
  }
  
  export default ReservationsManager
