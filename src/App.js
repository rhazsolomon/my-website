import './App.css';

import React from "react";
import MyResume from './pages/MyResume';
import Cashflow from './pages/Cashflow'

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Playground from './pages/Playground';
import CashflowAdmin from './pages/CashflowAdmin';
import CashflowLogin from './pages/CashflowLogin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/resume' element={<MyResume />} />
        <Route path='/cashflow' element={<CashflowLogin />} />
        <Route path='/cashflow-admin' element={<CashflowAdmin />} />
        <Route path='/playground' element={<Playground />} />
      </Routes>
    </Router>
  );
}

export default App;
