import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom"; // ✅ ADD THIS

import './App.css'
import Home from './Home.jsx'
import Contact from './Contact.jsx';
import Navbar from "./Navbar";
import Trailers from "./Trailers.jsx";
import TrailerOne from './TrailerOne';
import TrailerTwo from './TrailerTwo';

import Booking from "./Booking.jsx";
function BookingRouteWrapper() {
  const { trailerType } = useParams(); // "enclosed" or "open"
  return <Booking trailerType={trailerType} />;
}
function App() {
  

  return (
    <>
    
    <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/trailers" element={<Trailers />} />
        <Route path="/trailerone" element={<TrailerOne />} />
        <Route path="/trailertwo" element={<TrailerTwo />} />

        <Route path="/book" element={<Booking />} />
        <Route path="/book/:trailerType" element={<BookingRouteWrapper />} />
      </Routes>
      
    </>
  )
}

export default App
