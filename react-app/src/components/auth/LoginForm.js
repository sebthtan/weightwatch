import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/session'

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

  return (
    <div className='flex container justify-center items-center text-gray-300 h-full'>
      <form onSubmit={onLogin} className='absolute bg-light top-1/3 flex flex-col w-1/4 p-16'>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='container flex flex-col justify-center items-start'>
          <label className='mx-1 my-3' htmlFor="email">Email</label>
          <div className='container flex'>
            <input
              className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
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
              className='bg-input-light border-2 custom-border-color w-full field-focus p-1'
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='container flex justify-end items-center mt-10'>
            <button className='flex justify-center items-center w-28 h-8 border-2 custom-border-color bg-input-light field-focus' style={{ color: '#ea80fc' }} type='submit'>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
