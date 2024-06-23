'use client'
import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "@/styles/main.scss"
import "@/styles/mediaQuery.scss"
import "./style.scss";

interface Hostel {
  id: number;
  title: string;
  description: string;
  location: string;
  capacity: number;
  pincode: string;
  amenities: string[];
  imageURLs: string[];
  owner: string;
  price: number;
  createdAt: string;
}

const Page = ({ params }: { params: any }) => {
  
  const [hostel, setHostel] = React.useState<Hostel | null>(null);
  const id = params.hostelId;

  React.useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const response = await fetch(`/api/hostel/${id}`);
        const data = await response.json();
        setHostel(data.hostel[0]);
        console.log(data.hostel[0]); // Logging fetched data for debugging
      } catch (error) {
        console.error('Error fetching hostel details:', error);
      }
    };
    fetchHostelDetails();
  }, [id]);

  if (!hostel) {
    return <div>Loading...</div>;
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='hostelDetailsPage'>
      <div>

        <Slider {...sliderSettings}>
          {hostel.imageURLs.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Image ${index}`} style={{ width: '80vw', maxHeight: '400px', objectFit: 'contain' }} />
            </div>
          ))}
        </Slider>

        <h1>{hostel.title}</h1>
        <p>{hostel.description}</p>
        <p>Location: {hostel.location}</p>
        <p>Price: {hostel.price}</p>
        <p>Capacity: {hostel.capacity}</p>
        <p>Pincode: {hostel.pincode}</p>

        <div>
          <h3>Amenities:</h3>
          <ul>
            {hostel.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>

        <Link href="/queryNow">
          <button>Query Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
