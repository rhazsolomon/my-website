import './App.css';

import React from "react";
import MyResume from './pages/MyResume';
import PieChartPage from './pages/PieChartPage'

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/resume' element={<MyResume />} />
        <Route path='/pie' element={<PieChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
