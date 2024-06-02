import Link from 'next/link'
import React from 'react'

import "@/styles/main.scss"

import "@/styles/mediaQuery.scss"


const notFound  : React.FC  = () => {
  return (
    <div className=''>
        <div className=''>The Page You Requested Is Not Found</div>
        <Link href={"/"} >Let's Go Home</Link>
    </div>
  )
}

export default notFound