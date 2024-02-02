import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import About from './components/about';
import Profile from './components/profile';
import AddEvent from './components/addEvent';
import AllEvents from './components/allEvents';
import AllReviews from './components/allReviews';
import AddReview from './components/addReview';
import Discover from './components/discover';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/home" /> : <Register />}
          />
          <Route
            path="/home"  
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/about"
            element={token ? <About /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/addEvent"
            element={token ? <AddEvent /> : <Navigate to="/login" />}
          />
          <Route
            path="/allEvents"
            element={token ? <AllEvents /> : <Navigate to="/login" />}
          />
          <Route
            path="/allReviews"
            element={token ? <AllReviews /> : <Navigate to="/login" />}
          />
          <Route
            path="/addReview"
            element={token ? <AddReview /> : <Navigate to="/login" />}
          />
          <Route
            path="/discover"
            element={token ? <Discover /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
