import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../services/auth";
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/session'
import logo3 from '../NavBar/logo3.png'
import splashimg from './splashimg.jpg'

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(addUser(user))
    } else {
      setErrors(user.errors);
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

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
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
      <form onSubmit={onLogin} className='absolute top-1/4 flex flex-col w-1/4 px-16 pb-8 pt-16 z-10 rounded font-bold' style={{ backgroundColor: 'rgba(46, 45, 45, 0.95)' }}>
        <div className='justify-self-start flex items-center justify-center mb-5'>
          <img src={logo3} alt='logo' />
        </div>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='container flex flex-col justify-center items-start'>
          <label className='mx-1 my-3' htmlFor="email">Email</label>
          <div className='container flex'>
            <input
              className='bg-white bg-opacity-10 border-2 custom-border-color w-full field-focus p-1'
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
        </div>
        <div className='container flex flex-col justify-center items-start'>
          <label className='mx-1 my-3' htmlFor="password">Password</label>
          <div className='container flex'>
            <input
              className='bg-white bg-opacity-10 active: border-2 custom-border-color w-full field-focus p-1'
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='container flex justify-center items-center mt-10'>
            <button
              className='flex justify-center items-center w-full h-8 border-2 custom-border-color bg-white bg-opacity-10 hover:bg-opacity-20 field-focus font-bold rounded-full main-pink'
              type='submit'
            >
              Log In
            </button>
          </div>
          <div className='container flex justify-center items-center mt-10 pb-2 font-normal text-xs border-b-2' style={{ borderColor: '#3B3B3E' }}>
            <p>Don't have an account?</p><nobr><Link to='/sign-up'>
              <p className='font-bold main-pink pl-2'>Sign up</p>
            </Link></nobr>
          </div>
          <div className='container flex justify-center items-center py-2 font-normal text-xs'>
            <button
              type='button'
              className='font-bold main-pink'
              onClick={onDemoLogin}
            >Demo login</button>
          </div>
        </div>
      </form>
    </div>

  </>);
};

export default LoginForm;
