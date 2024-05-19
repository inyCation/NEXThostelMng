import React from 'react'

import { FaLocationPin, FaFacebook, FaYoutube, FaTwitter, } from "react-icons/fa6"
import { AiFillMail, AiFillPhone } from "react-icons/ai"


import "./Footer.scss"
const Footer = () => {
  return (
    <div className='footer'>
      <div className="top">
        <div className="col1 ">
          <h3>HOSTELO</h3>
          <div className="socials">
            <FaFacebook />
            <FaYoutube />
            <FaTwitter />
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio excepturi nam totam sequi, ipsam consequatur repudiandae libero illum. </p>
        </div>

        <div className="col2">
          <h4 className="title">Helpful Links</h4>
          <ul className="menu">
            <li>Login</li>
            <li>My Account</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="col3">
          <h4 className="title">Category</h4>
          <ul className="menu">
            <li>Shop</li>
            <li>Travel</li>
            <li>Sport</li>
          </ul>
        </div>

        <div className="col4">
          <h4 className="title">Contact us</h4>
          <ul className="menu">
            <li>
              <FaLocationPin /> <span> 3th North Ave, Florida, USA </span>
            </li>
            <li>
              <AiFillMail />  <span> info@listagram.com</span>
            </li>
            <li>
              <AiFillPhone /> <span> +44 078 767 595</span>
            </li>
          </ul>

        </div>





      </div>
      <div className="bottom">
        <p className="copyright">
          © 2024 HOTELO. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer