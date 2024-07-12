'use client'
import React, { useEffect } from 'react';

import '@/styles/main.scss';

import "./style.scss"

import '@/styles/mediaQuery.scss';


import ListingCard from '@/components/ListingCard/ListingCard';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { hostelRenderForSuperAdminPanel } from '@/lib/store/features/hostelRenderForSuperAdminPanel/hostelRenderForSuperAdminPanel';
import axios from 'axios';

const Page = () => {
  const dispatch = useAppDispatch();

  const email = useAppSelector((state) => state.superAdminLoogedIn.superAdminEmail);

  useEffect(() => {
    if (!email) {
      window.location.replace('/login');
    }
  }, [email]);

  if (!email) {

    return <div>Redirecting...</div>;
  }




  const fetchHostelBookings = async () => {
    try {
      const response = await axios.get('/api/hostel/allhostel');
      if (response.status === 200) {
        dispatch(hostelRenderForSuperAdminPanel(response.data.hostel));
      } else {
        console.error('Failed to fetch hostels: Unexpected response status', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch hostels:', error);
    }
  };

  useEffect(() => {
    fetchHostelBookings();
  }, []);

  const hostel = useAppSelector((state) => state.hostelRenderForSuperAdminPanel.hostelRenderForSuperAdminPanel);
  const hostels = Array.isArray(hostel) ? hostel : [];

  return (
    <div>
      <div className="listings">
        {hostels.length === 0 ? (
          <div className='noHostelFound'>No Hostel Found!!</div>
        ) : (
          hostels.map((hostelData, index) => (
            <ListingCard
              key={index}
              title={hostelData.title}
              imageUrl={hostelData.imageURLs}
              hostelId={hostelData._id}
              deleteState={true}
              owner={hostelData.owner}
              address={hostelData.location}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
