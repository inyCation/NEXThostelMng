"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';
import '@/styles/main.scss';
import '@/styles/mediaQuery.scss';
import mongoose from 'mongoose';

interface UserProfile {
    userDetail:userDetail;
    hostelBookings: Booking[];
}

interface userDetail {
    _id: mongoose.Types.ObjectId;
    username:string;
    email:string;
    password:string;
    createdAt:string;
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

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.post<UserProfile>('/api/user/userprofilewithbookingdata', { email });
                setUserProfile(response.data);
            } catch (error: any) {
                setError(error.message);
            }
        };

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

    // Function to format date string into readable format
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
        return date.toLocaleDateString(); // Adjust locale and format as needed
    };



    return (
        <div className="page">
            <div className="user__detail">
                <div>Username: {userProfile.userDetail.username}</div>
                <div>Your Email: {userProfile.userDetail.email}</div>
                <div>Created At: {userProfile.userDetail.createdAt.split("T")[0]}</div>
            </div>

            <div className="bookings">
                {userProfile.hostelBookings.map((booking, index) => (
                    <div className="booking" key={index}>
                        <div>Booking ID: {booking._id.toString()}</div>
                        <div>Hostel Name: {booking.hostelName}</div>
                        <div>Check-In Date: {formatDate(booking.checkinDate)}</div>
                        <div>Check-Out Date: {formatDate(booking.checkoutDate)}</div>
                        <div>Total Price: ${booking.totalprice}</div>
                        <div>Status: {booking.status ? "Booked" : "Pending"}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;