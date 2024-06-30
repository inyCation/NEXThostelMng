"use client"
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';

import '@/styles/main.scss';
import '@/styles/mediaQuery.scss';
import toast, { Toaster } from 'react-hot-toast';
import mongoose from 'mongoose';




interface HostelBooking {
  _id: string;
  hostelName: string;
  userEmail: string;
  noOfPerson: number;
  checkinDate: string;
  checkoutDate: string;
  totalprice: number;
  gst: number;
  status: boolean;
}

const Dashboard = () => {
  const email = useAppSelector(state => state.adminLoggedIn.adminEmail);

  const [hostelBookings, setHostelBookings] = useState<HostelBooking[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (email) {
      fetchHostelBookings();
    }
  }, [email]);

  const fetchHostelBookings = async () => {
    try {
      const response = await axios.post('/api/admin/dashboardbooking', { email: email });
      if (response.status === 200) {
        setHostelBookings(response.data.hostelBookings);
      } else {
        setError('Failed to fetch data');
      }
    } catch (error) {
      setError('Failed to fetch data');
    }
  };




  const handleApproval = async (status: boolean, bookingId: any) => {
    const bId = new mongoose.Types.ObjectId(bookingId);


    try {
      const response = await axios.post("/api/admin/approvebooking", {
        status,
        bId,
      });

      if (response.status === 200) {
        setHostelBookings(prevBookings =>
          prevBookings.map(booking =>
            booking._id === bookingId ? { ...booking, status } : booking
          )
        );
        toast.success(`${response.data.success}`);
      } else {
        toast.error(response.data.error || "Internal Server Error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Network Error");
    }
  };

  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString(); 
  };


  return (
    <>
      <Toaster />
      <div className='hostel__Owner__Dashboard'>
        <h2 className='welcome__Text'>WELCOME TO DASHBOARD</h2>
        {email && (
          <div className="admin__info">
            <p>Logged in as: {email}</p>
          </div>
        )}
        {error && <p>{error}</p>}
        <div className="hostel__Booking__Latest__Details">
          {hostelBookings.length > 0 ? (
            hostelBookings.map((booking) => (
              <div className="hostel_Bookings" key={booking._id}>
                {booking.hostelName && (
                  <div className="hostelName">
                    Hostel Name: {booking.hostelName}
                  </div>
                )}
                <div className="username">
                  User Email: {booking.userEmail}
                </div>
                <div className="personCount">
                  Number of Persons: {booking.noOfPerson}
                </div>
                <div className="checkinDate">
                  Check-in Date: {formatDate(booking.checkinDate)}
                </div>
                <div className="checkoutDate">
                  Check-out Date: {formatDate(booking.checkoutDate)}
                </div>
                <div className="status" >
                  Status: {booking.status ? "Approved" : "Pending"}
                </div>
                <div className="totalPrice">
                  Total Price: {booking.totalprice}
                </div>
                <div className="gst">
                  GST: {booking.gst}
                </div>
                <div className="approvalButtons">
                  <button className="approveButton" onClick={() => handleApproval(true, booking._id)} >Approve</button>
                  <button className="rejectButton" onClick={() => handleApproval(false, booking._id)} >Reject</button>
                </div>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
