import './App.css';

import React from "react";
import MyWebsiteLandingPage from './pages/MyWebsiteLandingPage';
import OweMessagePage from './pages/OweMessagePage'
import TimelineAppPage from './pages/TimelineAppPage'
import MyResume from './pages/MyResume';
import FlipCard from './components/FlipCard';
import WorkInProgress from './components/WorkInProgress'


function App() {
  return (
    <div className="App flex flex-col w-screen h-screen items-center justify-center">
      {/* <MyWebsiteLandingPage /> */}
      {/* <OweMessagePage /> */}
      <WorkInProgress className="md:hidden" />
      <MyResume className="hidden md:flex" />
      {/* <FlipCard className={'w-2/3 h-2/3'} front={<MyResume />} back={"Hello"} /> */}
    </div>
  );
}

export default App;
