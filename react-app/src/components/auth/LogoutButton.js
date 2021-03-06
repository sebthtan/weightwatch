import React from "react";
import { useDispatch } from 'react-redux'
import { logout } from "../../services/auth";
import { logoutUser } from '../../store/session';
import { logoutEntries } from '../../store/entries'
import { logoutWorkouts } from '../../store/workouts'


const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(logoutUser())
    dispatch(logoutEntries())
    dispatch(logoutWorkouts())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
