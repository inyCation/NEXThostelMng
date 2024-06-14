import React from 'react';
import ListingCard from '../ListingCard/ListingCard';
import { useAppSelector } from '@/lib/hooks';
import { hostelRenderOnHome } from '@/lib/store/features/hostelRenderOnHome/hostelRenderOnHome';

const HostelRenderOnHome = () => {
  const hostel = useAppSelector((state) => state.hostelRenderOnHome.hostelRenderOnHome);

  // Perform null/undefined check before accessing properties
  const hostels = hostel?.data?.hostel || [];

  return (
    <div className="listings">
      {/* Map over hostels, pass data to each ListingCard, and provide a unique key */}
      {hostels.map((hostelData: any, index: number) => (
        <ListingCard key={index} title={hostelData.title} />
      ))}
    </div>
  );
};

export default HostelRenderOnHome;
