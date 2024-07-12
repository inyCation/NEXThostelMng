"use client"
import React, { useEffect, useState } from 'react'
import "@/styles/main.scss"
import "@/styles/mediaQuery.scss"
import { useAppSelector } from '@/lib/hooks'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import ListingCard from '@/components/ListingCard/ListingCard'
interface Hostel {
  _id: string;
  title: string;
  featured: boolean;
  imageURLs: string[];
  hostelId: string;
  deleteState?: boolean;
  owner: string;
  location: string;
}
const page = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const email = useAppSelector((state) => state.adminLoggedIn.adminEmail);
  useEffect(() => {
    if (!email) {
      window.location.replace('/login'); 
    }
  fetchHostels();
  }, [email]);
  if (!email) {
    return <div>Redirecting...</div>;
  }

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
  return (
    <div>
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
                    address={hostel.location}
                    deleteState={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default page