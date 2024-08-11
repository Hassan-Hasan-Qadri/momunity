import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import Resources from "./pages/resources";
import jwtDecode from "jwt-decode";
import JsonData from "./data/data.json";
import "./App.css";
import Events from "./pages/events";
import Account from "./pages/Account";
import { api } from "./config.js";
import http from "./services/httpService";
import Discussion from "./pages/discussionForum.jsx";
import PostPage from "./pages/postPage.jsx";
import GoogleForm from "./pages/surveyForm.jsx";

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const jwt = localStorage.getItem("token");
        const user_jwt = jwtDecode(jwt);
        const { data } = await http.get(`${api.usersEndPoint}${user_jwt._id}`);
        setUser(data);
      } catch (ex) {}
    }
    fetchUser();
    setLandingPageData(JsonData);
  }, []);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home data={landingPageData} />}/>
        <Route path="/signup" element={<Account />}/>
        <Route path="/resources" element={<Resources data={landingPageData} />}/>
        <Route path="/events" element={<Events data={landingPageData} />}/>
        <Route path="/discussion" element={<Discussion data={landingPageData} />}/>
        <Route path="/form/:id" element={<GoogleForm data={landingPageData} />}/>
        <Route
          path="/post/:id"
          element={<PostPage data={landingPageData} />}
        />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
