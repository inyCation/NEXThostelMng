import React from 'react'
import "./style.scss"

const Amenities = ({amenity,index}:{amenity:any,index:any}) => {
  return (
    <div className='amenities__component' key={index}>
         <div className='amenity__text'>{amenity}</div>
    </div>
  )
}

export default Amenities