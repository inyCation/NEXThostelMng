'use client'
import React from 'react';
import Link from 'next/link';
import "@/styles/main.scss"
import "@/styles/mediaQuery.scss"


interface Hostel {
  id: number;
  name: string;
  description: string;
  location: string;
  rating: number;
}

import "./style.scss";

import img1 from "@/assets/hostelQuery/restaurant-4.jpg"
import img2 from "@/assets/hostelQuery/restaurant-5.jpg"
import img3 from "@/assets/hostelQuery/restaurant-6.jpg"
import img4 from "@/assets/hostelQuery/restaurant-7.jpg"
import img5 from "@/assets/hostelQuery/restaurant-8.jpg"
import img6 from "@/assets/hostelQuery/restaurent-listing-1.jpg"





const Page = ({ params }: { params: any }) => {
  
  
  const [hostel, setHostel] = React.useState<Hostel | null>(null);
  const id = params.hostelId;

  React.useEffect(() => {
    

    const fetchHostelDetails = async () => {
      try {
        const response = await fetch(`/api/hostel/${id}`);
        const data = await response.json();
        setHostel(data);
      } catch (error) {
        console.error('Error fetching hostel details:', error);
      }
    };

    if (id) {
      fetchHostelDetails();
    }
  }, [id]);

  if (!hostel) {
    return <div>Loading...</div>;
  }


  return (
    <div className='hostelDetailsPage'>
      <div>
        <h1>{hostel.name}</h1>
        <p>{hostel.description}</p>
        <p>Location: {hostel.location}</p>
        <p>Rating: {hostel.rating}</p>
        <Link href="/queryNow" passHref>
          <button>Query Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Page;

