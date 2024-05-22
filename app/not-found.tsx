import Link from 'next/link'
import React from 'react'

const notFound  : React.FC  = () => {
  return (
    <div className=''>
        <div className=''>The Page You Requested Is Not Found</div>
        <Link href={"/"} >Let's Go Home</Link>
    </div>
  )
}

export default notFound