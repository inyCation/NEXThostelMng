"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import "@/styles/main.scss";
import "./style.scss"
import "@/styles/mediaQuery.scss";
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
  const [loginRegisterToggler, setLoginRegisterToggler] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: ''});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLoginInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterInputChange = (e :ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleConfirmPassword = (e :ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleTermsCheckboxChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginRegisterToggler) {
      console.log({...loginData});
      
      // Handle login
      try {
        const response = await axios.post('/api/admin/login', loginData);
        toast.success('Login successful:', response.data.message);
      } catch (error:any) {
        console.log("Error - ",error.response.data.error);
        toast.error(`Error logging in: ${error.response!.data.error}`);
      }
    } else {
      // Handle registration
      console.log(registerData);
      
      
      if (registerData.password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      if (!termsAccepted) {
        toast.error('You must accept the terms and conditions');
        return;
      }
      try {
        const response = await axios.post('/api/admin/signup', registerData);
        toast.success('Registration successful:', response.data.message);
      } catch (error:any) {
        toast.error(`Error registering: ${error.response!.data.error}`);
      }
    }
  };

  return (
    <div>
      <Toaster />
      <h4>Login As Admin</h4>
      <div onClick={() => setLoginRegisterToggler(prev => !prev)}>Login</div>
      <div onClick={() => setLoginRegisterToggler(prev => !prev)}>Signup</div>
      {loginRegisterToggler ? (
        <form action="" className={`${loginRegisterToggler ? 'active' : ''}`} onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginInputChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginInputChange}
          />
          <div className="rememberMeForgetPass">
            <span className='text-black'>
             
            </span>
            <span className="forgetPassword">Forget Password</span>
          </div>
          <button type="submit" className="submit">
            Login
          </button>
        </form>
      ) : (
        <form action="" className={`${loginRegisterToggler ? '' : 'active'}`} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={registerData.username}
            onChange={handleRegisterInputChange}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleRegisterInputChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleRegisterInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          <div className="termsAndCondition">
            <span>
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={termsAccepted}
                onChange={handleTermsCheckboxChange}
              />
              <label htmlFor="terms">I've read and accept terms & conditions</label>
            </span>
          </div>
          <button type="submit" className="submit">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default Page;
