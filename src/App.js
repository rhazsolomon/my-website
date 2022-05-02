import './App.css';

import React from "react";
import MyWebsiteLandingPage from './pages/MyWebsiteLandingPage';
import OweMessagePage from './pages/OweMessagePage'

function App() {
  return (
    <div className="App flex flex-col w-screen h-screen items-center justify-center">
      <MyWebsiteLandingPage />
      <OweMessagePage />
    </div>
  );
}

export default App;
