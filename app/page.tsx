"use client"
import "@/styles/main.scss"

import "@/styles/mediaQuery.scss"

import ListingCard from "@/components/ListingCard/ListingCard";
import MainSearchBox from "@/components/mainSearchBox/MainSearchBox";


import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from '@/lib/hooks';

export default function Home() {
  const router = useRouter();


  const loggedInState = useAppSelector((state) => state.loggedIn.loggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedInState) {
      router.push("/login")
      return
    }
  }, [loggedInState])



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
