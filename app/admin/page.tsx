import React from 'react'
import "@/styles/main.scss"

import "@/styles/mediaQuery.scss"
import Link from 'next/link'




const page = () => {
  return (
    <div>
      <li className='hover-underline-animation'>
        <Link href="admin/addhostelroom">Add Hostel Room</Link>
      </li>

    </div>
  )
}

export default page