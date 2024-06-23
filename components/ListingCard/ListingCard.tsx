import React, { useRef, useEffect } from 'react'
import "./ListingCard.scss"
import img from "@/assets/ListingCard/place-4.jpg"

import { CiLocationOn, CiPhone, } from "react-icons/ci"

import Link from 'next/link'
import Image from 'next/image'



interface ListingCardProps {
  title: string;
  imageUrl: string[];
  featured?: boolean;
  hostelId:string

}

const ListingCard: React.FC<ListingCardProps> = ({ title, imageUrl, featured = false, hostelId }) => {

  const image = imageUrl[0];



  if (featured) {
    return (
      <div className='ListingCard featured'>
        <div className="img">
          <Image src={image} alt='img' width={200} height={100}></Image>
        </div>

        <div className="titleRev">
          <div className="title">
            {title}
          </div>
        </div>
        <div className="bookBtn">
          <Link href={`/query/${hostelId}`} className="QueryNow">Book Now </Link>
        </div>
        {
          featured && <span className="featured-label">Featured</span>
        }
      </div>
    )
  }

  return (
    <div className='ListingCard' >
      <div className="img">
        <Image src={image} alt='img' width={300} height={200}></Image>
      </div>

      <div className="titleRev">
        <div className="title">
          {title}
        </div>
        <div className="rev">
          <span className="stars">
            *****
          </span>
          <span className="noOfRev">3 Reviews</span>

        </div>
      </div>

      <div className="addressDetails">
        <div className="address"> <CiLocationOn /> Khale Street , USA</div>
        <div className="website"> <CiPhone /> WWW.FourSeason.com</div>
      </div>

      <div className="bookBtn">
        <Link href={`/query/${hostelId}`} className="QueryNow">Book Now </Link>
      </div>
    </div>
  )
}

export default ListingCard