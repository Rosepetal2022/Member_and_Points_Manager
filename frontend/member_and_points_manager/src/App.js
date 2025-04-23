
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import MemberHome from './pages/MemberHome';
import AdminHome from './pages/AdminHome';

import './App.css';

function App() {
  return (
    <Router>
        <Header />
        
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/MemberHome" element={<MemberHome />} />
          <Route path="/AdminHome" element={<AdminHome />} />
        </Routes>
       <Footer />
      </Router>
  );
}

export default App;
