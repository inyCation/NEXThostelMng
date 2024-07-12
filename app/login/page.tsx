"use client"
import React from 'react'
import "@/styles/main.scss"
import "@/styles/mediaQuery.scss"
import LoginForm from '@/components/loginForm/LoginForm'
import Image from 'next/image'
import bgImg from "@/assets/home/loginBg.svg"
const page: React.FC = () => {
  return (
    <div className='loginPage'>
      <div className="bg">
        <Image src={bgImg} fill={true} alt='bgImg' className={'image'} />
      </div>
      <LoginForm />
    </div>
  )
}
export default page
