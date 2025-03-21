import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home2 from "./pages/Home2";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Test from "./pages/Test";
import reviews from "./data";
import Blog from "./pages/Blog";
import Download from "./pages/Download";
import Cbt from "./pages/Cbt";
import Register from "./pages/Register";
import Question from "./pages/Question";
import Dashboard from "./pages/Dashboard";
import All from "./pages/All";
import AdminDashboard from "./pages/AdminDashboard";
import Exam from "./pages/Exam";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cbt />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboards" element={<AdminDashboard />} />
          <Route path="/practice-for-utme" element={<All />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Services />} />
          <Route path="/download" element={<Download />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/start-exam" element={<Exam />} />
          <Route path="/" element={<Cbt />} />
          <Route path="/question" element={<Question />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
