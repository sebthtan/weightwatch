import React, { useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/session'
import { login } from "../../services/auth";
import logo3 from '../NavBar/logo3.png'
import splashimg from './splashimg.jpg'

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser(user))
      }
    }
  };

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const user = await login("demo@aa.io", "password");
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(addUser(user));
    } else {
      setErrors(user.errors);
    }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (<>
    <div className='flex w-screen justify-center items-center h-screen opacity-40'
      style={{ backgroundImage: `url(${splashimg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
    </div>
    <div className='flex justify-center items-center text-gray-300'>
      <form onSubmit={onSignUp} className='top-20 absolute flex flex-col w-1/4 px-16 pb-8 pt-16 z-10 rounded font-bold' style={{ backgroundColor: 'rgba(46, 45, 45, 0.95)' }}>
        <div className='justify-self-start flex items-center justify-center mb-5'>
          <img src={logo3} alt='logo' />
        </div>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='container flex flex-col justify-center items-start'>
          <label className='mx-1 my-3'>User Name</label>
          <div className='container flex'>
            <input
              className='bg-white bg-opacity-10 border-2 custom-border-color w-full field-focus p-1'
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
        </div>
        <div className='container flex flex-col justify-center items-start'>
          <label className='mx-1 my-3'>Email</label>
          <div className='container flex'>
            <input
              className='bg-white bg-opacity-10 border-2 custom-border-color w-full field-focus p-1'
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
        </div>
        <div className='container flex flex-col justify-center items-start'>
          <label className='mx-1 my-3'>Password</label>
          <div className='container flex'>
            <input
              className='bg-white bg-opacity-10 border-2 custom-border-color w-full field-focus p-1'
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
        </div>
        <div className='container flex flex-col justify-center items-start'>
          <label className='mx-1 my-3'>Repeat Password</label>
          <div className='container flex'>
            <input
              className='bg-white bg-opacity-10 border-2 custom-border-color w-full field-focus p-1'
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
        </div>
        <div className='container flex justify-center items-center mt-10'>
          <button
            className='flex justify-center items-center w-full h-8 border-2 custom-border-color bg-white bg-opacity-10 hover:bg-opacity-20 field-focus font-bold rounded-full main-pink'
            type="submit">
            Sign Up
            </button>
        </div>
        <div className='container flex justify-center items-center mt-10 pb-2 font-normal text-xs border-b-2' style={{ borderColor: '#3B3B3E' }}>
          <p>Already have an account?</p><nobr><Link to='/login'>
            <p className='font-bold main-pink pl-2'>Log in</p>
          </Link></nobr>
        </div>
        <div className='container flex justify-center items-center py-2 font-normal text-xs'>
          <button
            type='button'
            className='font-bold main-pink'
            onClick={onDemoLogin}
          >Demo login</button>
        </div>
      </form>
    </div>
  </>);
};

export default SignUpForm;
