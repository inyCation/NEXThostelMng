import HostelRoomAddForm from '@/components/admincomponents/HostelAddForm/HostelRoomAddForm'
import React from 'react'

import "@/styles/main.scss"

import "@/styles/mediaQuery.scss"


const page = () => {
  return (
    <div className='admin_add_hostel_page'>
        <HostelRoomAddForm />
    </div>
  )
}

export default page