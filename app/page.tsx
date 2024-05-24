"use client"
import "@/styles/main.scss"

import "@/styles/mediaQuery.scss"

import ListingCard from "@/components/ListingCard/ListingCard";
import MainSearchBox from "@/components/mainSearchBox/MainSearchBox";



import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const cookieValue = Cookies.get('userAuthToken');
    if (!cookieValue) {
      router.push("/login")
    }
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
