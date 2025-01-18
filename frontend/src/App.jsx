import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import KundliChart from "./pages/KundliChart";
import Horoscope from "./pages/Horoscope";
import ChatPage from "./pages/ChatPage";
const App = () => {
  return (
    <Router>
      <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Kundli" element={<KundliChart />} />
          <Route path="/Horoscope" element={<Horoscope />} />
          <Route path="/Chat" element={<ChatPage />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
