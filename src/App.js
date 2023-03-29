import './App.css';
import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components';
import Home from './pages';
import Inventory from './pages/inventory';


function App() {
  // eslint-disable-next-line
  return (
    <div className="App">
      <Router><Navbar/><Routes><Route exact path='/' element={<Home />}/></Routes></Router>
    </div>
  );
}

export default App;