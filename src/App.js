import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './components/Login';
import Home from './components/Home/Home';
import Header from './components/Home/Header';
import { auth } from './firebase';
import { AuthContext } from './provider/AuthProvider';
import PrivatedRoute from './components/PrivatedRoute';
import Profile from './components/Home/Profile';
import Books from './components/Home/Books';
import Info from './components/Home/Info';
import Admin from './components/Home/Admin';
const App = () => {

  const {setUser } = useContext(AuthContext);
  function onChange(user) {
    setUser(user);
  }
  // https://firebase.google.com/docs/auth/web/manage-users

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onChange)

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, []);
  const HomeComponent = () => {
    return (
      <div>
        <Header />
        <Home />
      </div>
    )
  }

  const BookingComponent = () => {
    return (
      <div>
        <Header />
        <Books />
      </div>
    )
  }
  const BookingInfoComponent = () => {
    return (
      <div>
        <Header />
        <Info />
      </div>
    )
  }
  const ProfileComponent = () => {
    return (
      <div>
        <Header />
        <Profile />
      </div>
    )
  }
  const AdminComponent = () => {
    return (
      <div>
        <Header />
        <Admin />
      </div>
    )
  }
  return (
    <Router>
      <Switch>
        <PrivatedRoute exact path="/" component={HomeComponent} />
        <PrivatedRoute exact path="/admin" component={AdminComponent} />
        <PrivatedRoute exact path="/profile/:id" component={ProfileComponent} />
        <PrivatedRoute exact path="/books" component={BookingComponent} />
        <PrivatedRoute exact path="/info/:id" component={BookingInfoComponent} />
        <Route path="/login">
          <Login />
        </Route>
 
      </Switch>
    </Router>

  );
}

export default App;
