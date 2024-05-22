"use client"

import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import "./LoginForm.scss";

const LoginForm = () => {
  const [loginRegisterToggler, setLoginRegisterToggler] = useState(true);

  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    async (data) => {
      const response = await axios.post('/api/login', data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Handle success, maybe store tokens or user data
        console.log("Login successful:", data);
        queryClient.invalidateQueries('user'); // Example to refetch user data
      },
      onError: (error) => {
        // Handle error
        console.error("Login error:", error);
      }
    }
  );

  const registerMutation = useMutation(
    async (data) => {
      const response = await axios.post('/api/register', data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Handle success, maybe store tokens or user data
        console.log("Registration successful:", data);
        queryClient.invalidateQueries('user'); // Example to refetch user data
      },
      onError: (error) => {
        // Handle error
        console.error("Registration error:", error);
      }
    }
  );

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginMutation.mutate({ email, password });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const userName = e.target.userName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    registerMutation.mutate({ userName, email, password });
  };

  return (
    <div className="loginForm">
      <div className="loginOrRegister">
        <div className={`login ${loginRegisterToggler ? 'activeTitle' : ''}`} onClick={() => setLoginRegisterToggler(true)}>Login</div>
        <div className={`register ${loginRegisterToggler ? '' : 'activeTitle'}`} onClick={() => setLoginRegisterToggler(false)}>Register</div>
      </div>

      {
        loginRegisterToggler ? (
          <form onSubmit={handleLoginSubmit} className={`${loginRegisterToggler ? 'active' : ''}`}>
            <input type="text" name="email" id="email" placeholder='Email' />
            <input type="password" name="password" id="password" placeholder='Password' />
            <div className="rememberMeForgetPass">
              <span> <input type="checkbox" name="rememberme" id="rememberme" /> Remember Me </span>
              <span className="forgetPassword">Forget Password</span>
            </div>
            <button type="submit" className='submit'>Login</button>
          </form>
        ) :
        (
          <form onSubmit={handleRegisterSubmit} className={`${loginRegisterToggler ? "" : 'active'}`}>
            <input type="text" name="userName" id="userName" placeholder='Username' />
            <input type="text" name="email" id="email" placeholder='Email' />
            <input type="password" name="password" id="password" placeholder='Password' />
            <input type="text" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' />
            <div className="termsAndCondition">
              <span> <input type="checkbox" name="terms" id="terms" /> I've read and accept terms & conditions </span>
            </div>
            <button type="submit" className='submit'>Sign Up</button>
          </form>
        )
      }
    </div>
  );
};

export default LoginForm;
