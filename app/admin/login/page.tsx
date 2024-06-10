"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import "@/styles/main.scss";
import "./style.scss"


import "@/styles/mediaQuery.scss";
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { adminLoggedInToggle } from '@/lib/store/features/adminLoggedIn/adminLogin';
import Link from 'next/link';
import Image from 'next/image';
import bgImg from "@/assets/home/loginBg.svg"

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const Page: React.FC = () => {
  const [loginRegisterToggler, setLoginRegisterToggler] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
  });



  const dispatch = useAppDispatch();
  const router = useRouter();

  const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateEmail = (email:string) => {
    return emailValidationPattern.test(email);
  }



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginRegisterToggler) {
      if (loginData.email.trim() === "" || loginData.password === "") {
        toast.error("Fill Up All Details");
        return;
      }
      if(!validateEmail(loginData.email)){
        toast.error("Email Is Not Valid");
        return;
      }
      try {
        const login = async () => {
          return await axios.post('/api/admin/login', { ...loginData })
        }
        toast.promise(
          login().then((response) => {
            return response;
          }).catch((error) => {
            throw error;
          }),
          {
            loading: 'Logging in...',
            success: (response) => {
              
              Cookies.set("adminLoggedInState", "loggedInAsAdmin")
              dispatch(adminLoggedInToggle())
              setLoginData({
                email: "",
                password: ""
              })
              router.push("/admin")
              return <div>{response.data!.message}</div>
            },
            error: (error) => <div>{error.response!.data.error}</div>,
          }
        );
      } catch (error: any) {
        toast.error(error.message!);
      }
    } else {
      if (registerData.email.trim() === '' || registerData.password.trim() === '' || registerData.username.trim() === '' || confirmPassword === '') {
        toast.error(`Fill All Details`);
        return;
      }
      if(!validateEmail(registerData.email)){
        toast.error("Email Is Not Valid");
        return;
      }
      if(registerData.username.trim().length <= 7){
        toast.error("Username Must Be Of 8 Characters");
        return;
      }
      
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

      if(!passwordPattern.test(registerData.password)){
        toast.error("Password must be 8 to 16 characters and include at least one uppercase letter, one lowercase letter, one symbol, and one digit");
        return;
      }

      if (registerData.password !== confirmPassword) {
        toast.error(`Confirm Password Does't match`);
        return;
      }
      if (!termsAccepted) {
        toast.error('Please accept the terms and conditions');
        return;
      }

      try {
        const signup = async () => {
          return await axios.post('/api/admin/signup', { ...registerData })
        }


        toast.promise(
          signup().then((res) => {
            return res;
          }).catch((err) => {
            throw err;
          }),
          {
            loading: 'Singin up ...',
            success: (res) => {
              setLoginRegisterToggler(true);
              setRegisterData({
                username: '',
                email: '',
                password: '',
              })
              return <b>{res.data.message}</b>
            },
            error: (err) => <b>{err.response!.data.error}</b>,
          }
        );
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleLoginInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTermsCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };


  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className='adminLoginPage'>
      <div className="bg">
        <Image src={bgImg} fill={true} alt='bgImg' className={'image'} />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="loginForm">
        <div className="loginOrRegister">
          <div
            className={`login ${loginRegisterToggler ? 'activeTitle' : ''}`}
            onClick={() => setLoginRegisterToggler(true)}
          >
            Login
          </div>
          <div
            className={`register ${loginRegisterToggler ? '' : 'activeTitle'}`}
            onClick={() => setLoginRegisterToggler(false)}
          >
            Register
          </div>
        </div>

        {loginRegisterToggler ? (
          <form action="" className={`${loginRegisterToggler ? 'active' : ''}`} onSubmit={handleSubmit}>
            <h4>Login As Hostel Owner</h4>
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
              {/* <span className='text-black '>
                <input type="checkbox" name="rememberMe" id="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} /> <label htmlFor="rememberMe">Remember Me</label>
                <Link href="/admin/login" className='text-black '> Login As Admin</Link>
              </span> */}
              <span className="forgetPassword">Forget Password</span>
            </div>
            <button type="submit" className="submit">
              Login
            </button>
          </form>
        ) : (
          <form action="" className={`${loginRegisterToggler ? '' : 'active'}`} onSubmit={handleSubmit}>
            <h4>Register As Hostel Owner</h4>
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
              onChange={handleConfirmPasswordChange}
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
    </div>
  );
};

export default Page;
