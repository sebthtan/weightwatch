import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import HomePage from './components/HomePage'
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SearchPage from './components/SearchPage'
import WorkoutsPage from './components/WorkoutsPage'
import { authenticate } from "./services/auth";
import { useDispatch } from "react-redux";
import { addUser } from "./store/session";
import { getAllExercises } from './store/exercises'


function App() {
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser(user))
        dispatch(getAllExercises())
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={false} authenticated={authenticated}>
          <NavBar setAuthenticated={setAuthenticated} />
          <div className='content'>
            <User />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path='/workouts' exact={true} authenticated={authenticated}>
          <NavBar setAuthenticated={setAuthenticated} />
          <div className='content'>
            <WorkoutsPage />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/search" authenticated={authenticated}>
          <NavBar setAuthenticated={setAuthenticated} />
          <div className='content'>
            <SearchPage />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <NavBar setAuthenticated={setAuthenticated} />
          <div className='content'>
            <HomePage />
          </div>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
