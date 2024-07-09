"use client"

import React, { useEffect } from 'react'
import "@/styles/main.scss"

import "@/styles/mediaQuery.scss"
import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks'




const page = () => {



  const email = useAppSelector((state) => state.adminLoggedIn.adminEmail);

  useEffect(() => {
    if (!email) {
      window.location.replace('/login'); // Redirect using window.location.replace
    }
  }, [email]);

  if (!email) {
    // Optional: Show a loading state or message while redirecting
    return <div>Redirecting...</div>;
  }
  
  return (
    <div>
      <li className='hover-underline-animation'>
        <Link href="admin/addhostelroom">Add Hostel Room</Link>
      </li>

    </div>
  )
}

export default page