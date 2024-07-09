import React, { useRef, useEffect } from 'react'
import "./ListingCard.scss"
import img from "@/assets/ListingCard/place-4.jpg"

import { CiLocationOn, CiPhone, } from "react-icons/ci"

import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'



interface ListingCardProps {
  title: string;
  imageUrl: string[];
  featured?: boolean;
  hostelId: string;
  deleteState?: boolean;
  owner: string;
}

const ListingCard: React.FC<ListingCardProps> = ({ title, imageUrl, featured = false, hostelId, deleteState = false, owner="" }) => {

  const image = imageUrl[0];
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this hostel?");
    if (confirmDelete) {
      try {
        const response = await axios.post('/api/superadmin/deletehostel', { email:owner,hostelId });
        if (response.status === 200) {
          toast.success('Hostel deleted successfully');
        } else {
          toast.error('Failed to delete hostel');
        }
      } catch (error) {
        toast.error('Error deleting hostel');
      }
    }
  };

  if (deleteState) {
    return (
      <div className='ListingCard' >
        <div className="img">
          <Image src={image} alt='img' width={300} height={200}></Image>
        </div>

        <div className="titleRev">
          <div className="title">
            {title}
          </div>
        </div>
        <div className="addressDetails">
          <div className="address"> <CiLocationOn /> Khale Street , USA</div>
          <div className="website"> <CiPhone /> WWW.FourSeason.com</div>
        </div>

        <div className="bookBtn">
          <div style={{"cursor":"pointer"}} onClick={handleDelete} className="QueryNow">Delete Hostel</div>
        </div>
      </div>
    )
  }


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