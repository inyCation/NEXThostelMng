import React from 'react';
import ListingCard from '../ListingCard/ListingCard';
import { useAppSelector } from '@/lib/hooks';

import "./HostelRenderOnHome.scss"

const HostelRenderOnHome = () => {
  const hostel = useAppSelector((state) => state.hostelRenderOnHome.hostelRenderOnHome);

  const hostels = Array.isArray(hostel?.data?.hostel) ? hostel.data.hostel : [];

  return (
    <div className="listings">

      {hostels.length === 0 ?( <div className='noHostelFound'>"No Hostel Found!!"</div>) : 
        hostels.map((hostelData: any, index: number) => (
          <ListingCard key={index} title={hostelData.title} imageUrl={hostelData.imageURLs}  hostelId={hostelData._id} owner={hostelData.owner} address={hostelData.location}/>
        ))
      }
    </div>
  );
};

export default HostelRenderOnHome;
