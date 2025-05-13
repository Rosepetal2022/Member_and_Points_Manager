
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import MemberHome from './pages/MemberHome';
import AdminHome from './pages/AdminHome';
import PointsList from './pages/PointsList';
import AddHorse from './pages/AddHorse';
import EditHorse from './pages/EditHorse';
import RemoveHorse from './pages/RemoveHorse';
import TransferHorse from './pages/TransferHorse';
import './App.css';

function App() {
  return (
    <Router>
        <Header />
        
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/MemberHome" element={<MemberHome />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/Points" element={<PointsList />} />
          <Route path="/AddHorse" element={<AddHorse />} />
          <Route path="/EditHorse" element={<EditHorse />} />
          <Route path="/RemoveHorse" element={<RemoveHorse />} />
          <Route path="/TransferHorse" element={<TransferHorse />} />
        </Routes>
       <Footer />
      </Router>
  );
}

export default App;
