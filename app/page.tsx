"use client"
import "@/styles/main.scss"

import "@/styles/mediaQuery.scss"

import ListingCard from "@/components/ListingCard/ListingCard";
import MainSearchBox from "@/components/mainSearchBox/MainSearchBox";



import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { useEffect } from "react";

import { useRouter } from "next/navigation";



export default function Home() {
  // console.log(authToken,'data');
  
  const router = useRouter()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('api/user/verifyToken');
        
        if(!response.data.test) {
          router.push("/login")
        }
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])
    
  return (
    <>
        <Toaster />
        <div className="bgImg">
          {/* <Image src={BgImg} alt="BgImg" /> */}
        </div>
        <MainSearchBox />
        <div className="listings">
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </div>
    </>
  );
}
