import './App.css';

import React from "react";
import MyWebsiteLandingPage from './pages/MyWebsiteLandingPage';
import OweMessagePage from './pages/OweMessagePage'
import TimelineAppPage from './pages/TimelineAppPage'
import MyResume from './pages/MyResume';
import FlipCard from './components/FlipCard';
import WorkInProgress from './components/WorkInProgress'
import MyResumeSmallScreen from './pages/MyResumeSmallScreen'
import PieChartPage from './pages/PieChartPage'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MyResume />} />
        <Route path='/pie' element={<PieChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
