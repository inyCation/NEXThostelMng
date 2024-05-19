import React from 'react'
import "./ListingCard.scss"
import img from "@/assets/ListingCard/place-4.jpg"

import {CiLocationOn, CiPhone} from "react-icons/ci"
import Image from 'next/image'
import Link from 'next/link'




const ListingCard = () => {
  return (
    <div className='ListingCard' > 
      <div className="img">
        <Image src={img} alt='listimg' />
      </div>
      <div className="titleRev">
        <div className="title">
          Four Season Resort
        </div>
        <div className="rev">
          <span className="stars">
            *****
          </span>
          <div className="noOfRev">3 Reviews</div>
          
        </div>
      </div>

      <div className="addressDetails">
        <div className="address"> <CiLocationOn /> Khale Street , USA</div>
        <div className="website"> <CiPhone /> WWW.FourSeason.com</div>
      </div>
      <div className="bookBtn">
        <Link href={"/query/75645"} className="QueryNow">Query Now</Link>
      </div>

    </div>
  )
}

export default ListingCard