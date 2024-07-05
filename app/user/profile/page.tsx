"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';
import '@/styles/main.scss';

import "./style.scss"

import '@/styles/mediaQuery.scss';
import mongoose from 'mongoose';

interface UserProfile {
    userDetail: userDetail;
    hostelBookings: Booking[];
}

interface userDetail {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    createdAt: string;
}

interface Booking {
    _id: mongoose.Types.ObjectId;
    hostelName: string;
    checkinDate: string;
    checkoutDate: string;
    totalprice: number;
    status: boolean;
}
const Page: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const email = useAppSelector((state) => state.loggedIn.userEmail);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.post<UserProfile>('/api/user/userprofilewithbookingdata', { email });
            setUserProfile(response.data);
        } catch (error: any) {
            setError(error.message);
        }
    };
    useEffect(() => {
        if (email) {
            fetchUserProfile();
        }
    }, [email]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    const handleRefresh = () =>{
        fetchUserProfile();
    }

   
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
        return date.toLocaleDateString(); 
    };



    return (
        <div className="userDashboard">
            <div className="user__detail">
                <div>Username: {userProfile.userDetail.username}</div>
                <div>Your Email: {userProfile.userDetail.email}</div>
                <div>Created At: {userProfile.userDetail.createdAt.split("T")[0]}</div>
            </div>

            <div className="booking">Your Bookings</div>
            <table className="bookings__table">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Hostel Name</th>
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {userProfile.hostelBookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking._id.toString()}</td>
                            <td>{booking.hostelName}</td>
                            <td>{formatDate(booking.checkinDate)}</td>
                            <td>{formatDate(booking.checkoutDate)}</td>
                            <td>${booking.totalprice}</td>
                            <td>{booking.status ? "Booked" : "Pending"}</td>
                        </tr>
                    ))}
                </tbody>
                <button className='refreshBtn' onClick={handleRefresh}>Refresh</button>
            </table>
        </div>
    );
};

export default Page;