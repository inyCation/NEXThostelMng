'use client'
import HostelRoomAddForm from '@/components/admincomponents/HostelAddForm/HostelRoomAddForm'
import React, { useEffect } from 'react'
import "@/styles/main.scss"
import "@/styles/mediaQuery.scss"
import { useAppSelector } from '@/lib/hooks'
const page = () => {
  const email = useAppSelector((state) => state.adminLoggedIn.adminEmail);
  useEffect(() => {
    if (!email) {
      window.location.replace('/login'); 
    }
  }, [email]);
  if (!email) {return <div>Redirecting...</div>;}
  return (
    <div className='admin_add_hostel_page'>
        <HostelRoomAddForm />
    </div>
  )
}
export default page