import React from 'react';
import "./FeaturedHostelOnHome.scss";
import { useAppSelector } from '@/lib/hooks';
import ListingCard from '../ListingCard/ListingCard';
const FeaturedHostelOnHome = () => {
    const hostels = useAppSelector((state) => state.featuredHostel.featuredHostel);
    console.log(hostels);
    return (
        <span className="listings">
            {
                hostels.map((hostelData: any, index: number) => (
                    <ListingCard key={index} owner={hostelData.owner} title={hostelData.title} imageUrl={hostelData.imageURLs} featured={hostelData.featured} hostelId={hostelData._id}/>
                ))
            }
        </span>
    );
};

export default FeaturedHostelOnHome;
