import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginForm.scss';
import { useMutation } from 'react-query';

import toast, { Toaster } from 'react-hot-toast';
interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface RegisterData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const LoginForm: React.FC = () => {
  const [loginRegisterToggler, setLoginRegisterToggler] = useState<boolean>(true);

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const loginMutation = useMutation((loginData: LoginData) =>
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    }).then((res) => {
      if (!res.ok) throw new Error('Login failed');
      return res.json();
    })
  );

  const registerMutation = useMutation((registerData: RegisterData) =>
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    }).then((res) => {
      if (!res.ok) throw new Error('Registration failed');
      return res.json();
    })
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (loginRegisterToggler) {
      try {
        await loginMutation.mutateAsync(loginData);
        toast.success('Login successful');
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      try {
        await registerMutation.mutateAsync(registerData);
        toast.success('Registration successful');
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleLoginInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    setLoginData((prevState) => ({
      ...prevState,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  const handleRegisterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: name === 'terms' ? checked : value,
    }));
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="loginForm">
        <div className="loginOrRegister">
          <div className={`login ${loginRegisterToggler ? 'activeTitle' : ''}`} onClick={() => setLoginRegisterToggler(true)}>Login</div>
          <div className={`register ${loginRegisterToggler ? '' : 'activeTitle'}`} onClick={() => setLoginRegisterToggler(false)}>Register</div>
        </div>

        {loginRegisterToggler ? (
          <form action="" className={`${loginRegisterToggler ? 'active' : ''}`} onSubmit={handleSubmit}>
            <input type="text" name="email" id="email" placeholder="Email" value={loginData.email} onChange={handleLoginInputChange} />
            <input type="password" name="password" id="password" placeholder="Password" value={loginData.password} onChange={handleLoginInputChange} />
            <div className="rememberMeForgetPass">
              <span>
                <input type="checkbox" name="rememberMe" id="rememberMe" checked={loginData.rememberMe} onChange={handleLoginInputChange} /> <label htmlFor="rememberMe">Remember Me</label>
              </span>
              <span className="forgetPassword">Forget Password</span>
            </div>

            <button type="submit" className="submit">Login</button>
          </form>
        ) : (
          <form action="" className={`${loginRegisterToggler ? '' : 'active'}`} onSubmit={handleSubmit}>
            <input type="text" name="userName" id="userName" placeholder="Username" value={registerData.userName} onChange={handleRegisterInputChange} />
            <input type="text" name="email" id="email" placeholder="Email" value={registerData.email} onChange={handleRegisterInputChange} />
            <input type="password" name="password" id="password" placeholder="Password" value={registerData.password} onChange={handleRegisterInputChange} />
            <input type="text" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" value={registerData.confirmPassword} onChange={handleRegisterInputChange} />

            <div className="termsAndCondition">
              <span>
                <input type="checkbox" name="terms" id="terms" checked={registerData.terms} onChange={handleRegisterInputChange} /> <label htmlFor="terms">I've read and accept terms & conditions</label>
              </span>
            </div>

            <button type="submit" className="submit">Sign Up</button>
          </form>
        )}
      </div>
    </>
  );
};

export default LoginForm;
