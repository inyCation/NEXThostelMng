import React from 'react';


import "./FeaturedHostelOnHome.scss";
import { useAppSelector } from '@/lib/hooks';
import { featuredHostel } from '@/lib/store/features/featuredHostel/featuredHostel';
import ListingCard from '../ListingCard/ListingCard';

const FeaturedHostelOnHome = () => {
    const hostels = useAppSelector((state) => state.featuredHostel.featuredHostel);
    
    console.log(hostels);
    
    // const hostels = Array.isArray(hostel?.data?.hostel) ? hostel.data.hostel : [];
    // console.log(hostels);

    return (
        <span className="listings">
            {
                hostels.map((hostelData: any, index: number) => (
                    <ListingCard key={index} title={hostelData.title} imageUrl={hostelData.imageURLs} featured={hostelData.featured} hostelId={hostelData._id}/>
                ))
            }
        </span>
    );
};

export default FeaturedHostelOnHome;
