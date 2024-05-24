import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginForm.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import axios from 'axios';
import { loggedInToggle } from '@/lib/store/features/loggedIn/loggedIn';

import Cookies from 'js-cookie';  
import { useRouter } from 'next/navigation';   

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loginRegisterToggler, setLoginRegisterToggler] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

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


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (loginRegisterToggler) {
      if (loginData.email.trim() === "" || loginData.password === "") {
        toast.error("Fill Up All Details");
        return;
      }



      try {
        await axios.post('/api/user/login', { ...loginData })
          .then((response) => {


            if(rememberMe) {
              Cookies.set("userRememberToken","remember")
            }

            dispatch(loggedInToggle())
            router.push("/")

            
            toast.success(response.data.message);

          }).catch((error) => {
            toast.error(error.response.data.error);
          });;



      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      // Validate if password matches confirm password
      if (registerData.password !== confirmPassword) {
        toast.error(`Confirm Password Does't match`);
        return;
      }

      // Check if terms and conditions checkbox is checked
      if (!termsAccepted) {
        toast.error('Please accept the terms and conditions');
        return;
      }

      // Proceed with registration
      try {
        await axios.post('/api/user/signup', { ...registerData })
          .then((response: any) => {
            toast.success(response.data.message);
          }).catch((error) => {
            toast.error(error.response.data.error);
          });;

        // toast.success('Registration successful');
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

  const handleRememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };
  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <>
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
              <span>
                <input type="checkbox" name="rememberMe" id="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} /> <label htmlFor="rememberMe">Remember Me</label>
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
                />{' '}
                <label htmlFor="terms">I've read and accept terms & conditions</label>
              </span>
            </div>

            <button type="submit" className="submit">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default LoginForm;
