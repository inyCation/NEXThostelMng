"use client"
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import '@/styles/main.scss';





import "./style.scss"

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

  const downloadBookingsAsPDF = () => {
    const input = document.getElementById('hostelBookingsTable');

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgHeight = (canvas.height * 208) / canvas.width;
        pdf.addImage(imgData, 0, 0, 208, imgHeight);
        pdf.save('hostelBookings.pdf');
      });
    } else {
      toast.error('Error generating PDF');
    }
  };


  const deleteQuery = async (id: any) => {
    const bId = new mongoose.Types.ObjectId(id);

    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) {
      return;
    }


    try {
      const response = await axios.post('/api/admin/deleteQuery', { bId: bId });

      if (response.status === 200) {
        setHostelBookings(prevBookings =>
          prevBookings.filter(booking => booking._id !== id)
        );

        console.log(response.data.message);

        toast.success(`${response.data.message}`);
      } else {
        toast.error(response.data.error || "Internal Server Error");
      }

    } catch (error: any) {
      console.log(error.error)
    }
  }




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
            <>
              <table className="hostelBookingsTable" id='hostelBookingsTable'>
                <thead>
                  <tr>
                    <th>Hostel Name</th>
                    <th>User Email</th>
                    <th>Number of Persons</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                    <th>Status</th>
                    <th>Total Price</th>
                    <th>GST</th>
                    <th>Actions</th>
                    <th>Delete</th>

                  </tr>
                </thead>
                <tbody>
                  {hostelBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.hostelName}</td>
                      <td>{booking.userEmail}</td>
                      <td>{booking.noOfPerson}</td>
                      <td>{formatDate(booking.checkinDate)}</td>
                      <td>{formatDate(booking.checkoutDate)}</td>
                      <td>{booking.status ? "Approved" : "Pending"}</td>
                      <td>{booking.totalprice}</td>
                      <td>{booking.gst}</td>
                      <td className='btnGroup'>
                        <button className="approveButton" onClick={() => handleApproval(true, booking._id)}>Approve</button>
                        <button className="rejectButton" onClick={() => handleApproval(false, booking._id)}>Reject</button>
                      </td>
                      <td>
                        <button className="deleteQuery" onClick={() => deleteQuery(booking._id)}>Delete Booking</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className='downloadBtn' onClick={downloadBookingsAsPDF}>Download as PDF</button>
            </>
          ) : (
            <p>No bookings found.</p>
          )}



        </div>
      </div >

    </>
  );
};

export default Dashboard;
