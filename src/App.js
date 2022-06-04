import './App.css';

import React from "react";
import MyResume from './pages/MyResume';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import MyBlog from './pages/MyBlog';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/resume' element={<MyResume />} />
        <Route path='/blog' element={<MyBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
