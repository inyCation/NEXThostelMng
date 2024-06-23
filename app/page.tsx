"use client"
import "@/styles/main.scss"



import "@/styles/mediaQuery.scss"

import ListingCard from "@/components/ListingCard/ListingCard";
import MainSearchBox from "@/components/mainSearchBox/MainSearchBox";


import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { featuredHostel } from '@/lib/store/features/featuredHostel/featuredHostel';


import axios from "axios";

import HostelRenderOnHome from "@/components/hostelrenderonhome/HostelRenderOnHome";
import FeaturedHostelOnHome from "@/components/featuredhostelonhome/FeaturedHostelOnHome";


export default function Home() {
  const router = useRouter();
  const loggedInState = useAppSelector((state) => state.loggedIn.loggedIn);
  useEffect(() => {
    if (!loggedInState) {
      router.push("/login")
      return
    }
  }, [loggedInState])


  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/hostel/featuredhostel');
        dispatch(featuredHostel(response.data));
      } catch (error: any) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch]);


  return (
    <>
      <Toaster />
      <div className="bgImg">
        {/* <Image src={BgImg} alt="BgImg" /> */}
      </div>
      <MainSearchBox />
    
      <div className="featuredHostels">
        <h3>Best Hostels Around You</h3>
        <FeaturedHostelOnHome />
      </div>
      
      <div >
        <HostelRenderOnHome />
      </div>
    </>
  );
}
