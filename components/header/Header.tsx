"use client"
import React, { useState, useEffect } from 'react';
import "./Header.scss";
import Link from 'next/link';
import { FaUser } from "react-icons/fa";

const Header = () => {
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
        <li className="user">
          <Link href={"/login"}>Login <FaUser /></Link>
        </li>
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
