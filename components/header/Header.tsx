"use client"
import React, { useState, useEffect } from 'react';
import "./Header.scss";
import Link from 'next/link';
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { loggedInToggle } from '@/lib/store/features/loggedIn/loggedIn';
import { adminLoggedInToggle } from '@/lib/store/features/adminLoggedIn/adminLogin';
import { superAdminLoggedInToggle } from '@/lib/store/features/superAdminLoggedIn/superAdminLogin';

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


  const dispatch = useAppDispatch();
  const loggedInState = useAppSelector((state) => state.loggedIn.loggedIn);
  const adminLoogedInState = useAppSelector((state) => state.adminLoggedIn.adminLoggedIn)
  const superAdminLoggedInState = useAppSelector((state) => state.superAdminLoogedIn.superAdminLoggedIn);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await axios.get('/api/user/logout');
      dispatch(loggedInToggle(""));
      router.push("/login")
      toast.success(response.data.message)

    } catch (error) {
      toast.error('Error in Loggin out');
    }
  };
  const handleAdminLogoutClick = async () => {
    try {
      const response = await axios.get('/api/admin/logout');
      dispatch(adminLoggedInToggle(""));
      router.push("/admin/login")
      toast.success(response.data.message)

    } catch (error) {
      toast.error('Error in Loggin out');
    }
  }

  const handleSuperAdminLogoutClick = async () => {
    try {
      const response = await axios.get('/api/superadmin/logout');
      dispatch(superAdminLoggedInToggle(""));
      router.push("/")
      toast.success(response.data.message)

    } catch (error) {
      toast.error('Error in Loggin out');
    }
  }

  return (
    <nav className={`nav ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="logo hover-underline-animation">
        <Link href="/">HOSTELO</Link>
      </div>
      <ul className={`menu ${isNotOpen ? 'close' : ''}`}>
        {
          superAdminLoggedInState ? (
            <>
              <li className='hover-underline-animation'>
                <Link href="/superadmin/hostels">Hostels</Link>
              </li>
              <li className='hover-underline-animation'>
                <Link href="/superadmin/listusers">List Users</Link>
              </li>
              <li className='hover-underline-animation'>
                <Link href="/superadmin/listhostelowners">List Hostel Owners</Link>
              </li>
              <li className='hover-underline-animation'>
                <Link href="/superadmin/upgrade">Upgrade</Link>
              </li>
              <li className='hover-underline-animation'>
                <Link href="/superadmin/dashboard">Dashboard</Link>
              </li>

              <li className="user">
                <div onClick={handleSuperAdminLogoutClick}> Logout Super Admin <FaUser /></div>
              </li>

            </>
          ) : (
            adminLoogedInState ? (
              <>
                <li className='hover-underline-animation'>
                  <Link href="/admin">Home</Link>
                </li>
                <li className='hover-underline-animation'>
                  <Link href="/admin/addhostelroom">List Hostel</Link>
                </li>
                <li className='hover-underline-animation'>
                  <Link href="/admin/dashboard">Dashboard</Link>
                </li>
                <li className='hover-underline-animation'>
                    <Link href="/contact">Contact Support</Link>
                  </li>
                {
                  adminLoogedInState ? (
                    <li className="user">
                      <div onClick={handleAdminLogoutClick}> Logout Owner <FaUser /></div>
                    </li>
                  ) : (<li className="user">
                    <Link href={"/admin/login"}> Login Owner <FaUser /></Link>
                  </li>)
                }
              </>
            ) :
              (
                <>
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
                      <>
                        <li className='hover-underline-animation'>
                          <Link href="/user/profile">Profile</Link>
                        </li>
                        <li className="user">
                          <div onClick={handleClick}>Logout <FaUser /></div>
                        </li>
                      </>

                    ) : (<li className="user">
                      <Link href={"/login"}>Login <FaUser /></Link>
                    </li>)
                  }
                </>
              )
          )
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




