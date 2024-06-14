import React from 'react';
import ListingCard from '../ListingCard/ListingCard';
import { useAppSelector } from '@/lib/hooks';
import { hostelRenderOnHome } from '@/lib/store/features/hostelRenderOnHome/hostelRenderOnHome';






const HostelRenderOnHome = () => {
  const hostel = useAppSelector((state) => state.hostelRenderOnHome.hostelRenderOnHome);


  const hostels = Array.isArray(hostel) ? [] : hostel?.data?.hostel || [];

  return (
    <div className="listings">
     
      {hostels.map((hostelData: any, index: number) => (
        <ListingCard key={index} title={hostelData.title} />
      ))}
    </div>
  );
};

export default HostelRenderOnHome;
