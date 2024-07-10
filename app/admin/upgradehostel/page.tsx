"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';

import '@/styles/main.scss';
import './style.scss';
import '@/styles/mediaQuery.scss';
import toast, { Toaster } from 'react-hot-toast';
import ListingCard from '@/components/ListingCard/ListingCard';


interface Hostel {
    _id: string;
    title: string;
    featured: boolean;
    imageURLs: string[];
    hostelId: string;
    deleteState?: boolean;
    owner: string;
}

const Page = () => {
    const email = useAppSelector((state) => state.adminLoggedIn.adminEmail);
    const [hostels, setHostels] = useState<Hostel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!email) {
            window.location.replace('/login');
        } else {
            checkPremiumStatus();
        }
    }, [email]);

    const checkPremiumStatus = async () => {
        try {
            const response = await axios.post('/api/admin/ispremium', { email });
            if (!response.data.isPremium) {
                toast.error('You need to apply for premium status to access this feature.');
                setIsLoading(false);
            } else {
                fetchHostels();
            }
        } catch (error) {
            toast.error('Error checking premium status.');
            setIsLoading(false);
        }
    };

    const fetchHostels = async () => {
        try {
            const response = await axios.post('/api/admin/ownerhostels', { email });
            setHostels(response.data.hostels);
        } catch (error) {
            toast.error('Error fetching hostels.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!email) {
        return <div>Redirecting...</div>;
    }

    return (
        <div>
            {<Toaster />}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className=''>
                    {hostels.length === 0 ? (
                        <div>No hostels found.</div>
                    ) : (
                        <div className="listings">
                            {hostels.map((hostel, index) => (

                                <ListingCard
                                    key={index}
                                    title={hostel.title}
                                    imageUrl={hostel.imageURLs}
                                    hostelId={hostel._id}
                                    owner={hostel.owner}
                                    adminDashboard={true}
                                    
                                />


                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Page;


