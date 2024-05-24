"use client"
import React from 'react'
import "@/styles/main.scss"

import "@/styles/mediaQuery.scss"


import LoginForm from '@/components/loginForm/LoginForm'
import Image from 'next/image'

import bgImg from "@/assets/home/loginBg.svg"

import { QueryClient, QueryClientProvider } from 'react-query'




const queryClient = new QueryClient({});

const page : React.FC  = () => {
  return (
    <div className='loginPage'>
      <div className="bg">
        <Image src={bgImg} fill={true} alt='bgImg' className={'image'}  />
      </div>
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    </div>
  )
}

export default page





// <div className="w-full relative pt-[100%]">
// <Image
//   src="/profile.webp"
//   alt="profile"
//   objectFit="cover"
//   fill
//   className="w-full h-full top-0 left-0 object-cover rounded-2xl"
// />
// </div>