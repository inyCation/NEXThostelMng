import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginForm.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks';

import axios from 'axios';
import { loggedInToggle } from '@/lib/store/features/loggedIn/loggedIn';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { FaEye, FaEyeSlash } from "react-icons/fa"

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

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };






  const dispatch = useAppDispatch();
  const router = useRouter();

  const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateEmail = (email: string) => {
    return emailValidationPattern.test(email);
  }



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginRegisterToggler) {
      if (loginData.email.trim() === "" || loginData.password === "") {
        toast.error("Fill Up All Details");
        return;
      }
      if (!validateEmail(loginData.email)) {
        toast.error("Email Is Not Valid");
        return;
      }
      try {
        const login = async () => {
          return await axios.post('/api/user/login', { ...loginData })
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

              if (rememberMe) {
                Cookies.set("userRememberToken", "remember")

              }

              Cookies.set("userLoggedInState", "loggedInAsUser")
              dispatch(loggedInToggle(loginData.email))
              setLoginData({
                email: "",
                password: ""
              })
              router.push("/")
              return <div>{response.data!.message}</div>
            },
            error: (error) => <div>{error.response!.data.error}</div>,
          }
        );
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      if (registerData.email.trim() === '' || registerData.password.trim() === '' || registerData.username.trim() === '' || confirmPassword === '') {
        toast.error(`Fill All Details`);
        return;
      }
      if (!validateEmail(registerData.email)) {
        toast.error("Email Is Not Valid");
        return;
      }
      if (registerData.username.trim().length <= 7) {
        toast.error("Username Must Be Of 8 Characters");
        return;
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[. !@#$%^&*(){}<>?\/\\|~`])[A-Za-z\d. !@#$%^&*(){}<>?\/\\|~`]{8,16}$/;

      if (!passwordPattern.test(registerData.password)) {
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
          return await axios.post('/api/user/signup', { ...registerData })
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
              return <b>{res.data!.message}</b>
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginInputChange}
            />
            <label className='eyeIcon' htmlFor="password"
              onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</label>
            <div className="rememberMeForgetPass">
              <span className='text-black '>
                <Link href="/admin/login" className='text-black '> Login As Hostel Owner</Link>
              </span>

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
              type={showPassword2 ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterInputChange}
            />
            <label className='eyeIcon2' htmlFor="password"
              onClick={togglePasswordVisibility2}>{showPassword2 ? <FaEyeSlash /> : <FaEye />}</label>

            <input
              type={showPassword3 ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <label className='eyeIcon3' htmlFor="confirmPassword"
              onClick={togglePasswordVisibility3}>{showPassword3 ? <FaEyeSlash /> : <FaEye />}</label>


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
    </>
  );
};

export default LoginForm;


