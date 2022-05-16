import './App.css';

import React from "react";
import MyWebsiteLandingPage from './pages/MyWebsiteLandingPage';
import OweMessagePage from './pages/OweMessagePage'
import TimelineAppPage from './pages/TimelineAppPage'
import MyResume from './pages/MyResume';

function App() {
  return (
    <div className="App flex flex-col w-screen h-screen items-center justify-center">
      {/* <MyWebsiteLandingPage /> */}
      {/* <OweMessagePage /> */}
      <MyResume />
    </div>
  );
}

export default App;
