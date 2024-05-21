'use client';
import BgImg from "@/assets/home/herobg.jpg"
import Image from "next/image";
import MainSearchBox from "@/components/mainSearchBox/MainSearchBox";


import "@/styles/main.scss"


import "@/styles/mediaQuery.scss"
import ListingCard from "@/components/ListingCard/ListingCard";


export default function Home() {
  return (
    <>
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
