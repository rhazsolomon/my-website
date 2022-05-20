import './App.css';

import React from "react";
import MyResume from './pages/MyResume';
import PieChartPage from './pages/PieChartPage'

import {
  BrowserRouter as Router,
  Route,
  Routes,
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
