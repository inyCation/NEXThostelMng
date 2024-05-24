"use client"
import React, { useState, useEffect } from 'react';
import "./Header.scss";
import Link from 'next/link';
import { FaUser } from "react-icons/fa";
import axios from 'axios';

import { useAppSelector,useAppDispatch } from '@/lib/hooks';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { loggedInToggle } from '@/lib/store/features/loggedIn/loggedIn';




const Header: React.FC = () => {
  const [isNotOpen, setIsNotOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  const toggleClass = () => {
    setIsNotOpen(!isNotOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);


  const loggedInState = useAppSelector((state) => state.loggedIn.loggedIn);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      const response = await axios.get('/api/user/logout');

      dispatch(loggedInToggle());
      router.push("/login")
      toast.success(response.data.message)

    } catch (error) {
      toast.error('Error in Loggin out');
    }
  };








return (
  <nav className={`nav ${isVisible ? 'visible' : 'hidden'}`}>
    <div className="logo hover-underline-animation">
      <Link href="/">HOSTELO</Link>
    </div>
    <ul className={`menu ${isNotOpen ? 'close' : ''}`}>
      <li className='hover-underline-animation'>
        <Link href="/">Home</Link>
      </li>
      <li className='hover-underline-animation'>
        <Link href="/about">About</Link>
      </li>
      <li className='hover-underline-animation'>
        <Link href="/contact">Contact</Link>
      </li>
      {
        loggedInState ? (
          <li className="user">
            <div onClick={handleClick}>Logout <FaUser /></div>
          </li>
        ) : (<li className="user">
          <Link href={"/login"}>Login <FaUser /></Link>
        </li>)
      }

    </ul>
    <div className="hamBurger" onClick={toggleClass}>
      <div id="nav-icon3" className={isNotOpen ? '' : 'open'}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
);
};

export default Header;
