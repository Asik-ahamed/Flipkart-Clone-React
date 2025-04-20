import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import './LoginModal.css';
import supabase from '../../supabase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';

const LoginModal = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState(true); // true = login, false = signup

  const dispatch = useDispatch();

  // Handle Signup
  const signup = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Signup error:", error.message);
      alert(`Signup failed: ${error.message}`);
      return;
    }

    if (data?.user) {
      alert("Account created. Please verify your email.");
    }
  };

  // Handle Login
  const login = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("Login error:", error.message);  // Log the full error object for debugging
      alert(`Login failed: ${error.message}`);       // Alert the user of the specific error
      return;
    }

    if (data?.user) {
      dispatch(setUser(data.user));
      alert("Login successful!");
      setIsOpen(false); // Close the modal on success
    } else {
      alert("Login failed. Please try again.");
    }
  };

  // If modal is closed, return null
  if (!isOpen) return null;

  return (
    <div className='overlay'>
      <div className='LoginModal'>
        <div className='left'>
          <p className='Login-title'>{loginType ? "Login" : "Sign Up"}</p>
          <p className='Login-des'>
            {loginType
              ? "Access your orders, wishlist, and more"
              : "Create an account to start shopping"}
          </p>
        </div>

        <div className='right'>
          <input
            type="email"
            className='Login-input'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className='Login-input'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className='termsandcon'>
            By continuing, you agree to Flipkart's{" "}
            <span style={{ color: "blue" }}>Terms of Use</span> and{" "}
            <span style={{ color: "blue" }}>Privacy Policy</span>
          </p>
          <button className='Login-btn' onClick={loginType ? login : signup}>
            {loginType ? "Login" : "Sign Up"}
          </button>
          <p className='Login-signup' onClick={() => setLoginType(!loginType)}>
            {loginType ? "New to Flipkart? Create Account" : "Already a user? Login"}
          </p>
        </div>

        <div className='close' onClick={() => setIsOpen(false)}>
          <RxCross2 size={20} />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
