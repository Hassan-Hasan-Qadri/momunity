import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import Resources from "./pages/resources";

import JsonData from "./data/data.json";
import "./App.css";
import Events from "./pages/events";
import Account from "./pages/Account";


const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home data={landingPageData} />}/>
        <Route path="/signup" element={<Account />}/>
        <Route path="/resources" element={<Resources data={landingPageData} />}/>
        <Route path="/events" element={<Events data={landingPageData} />}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
