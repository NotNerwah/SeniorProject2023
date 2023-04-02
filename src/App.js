import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components';
import Home from './pages';
import Inventory from './pages/inventory';
import InventoryAdjustment from './pages/inventoryadjustment';


function App() {
  // eslint-disable-next-line
  return (
    <div className="App"><h1>Warehouse Inventory Manager</h1>
      <Router><Navbar/><Routes><Route exact path='/' element={<Home />}/><Route path='/inventory' element={<Inventory/>}/><Route path='/inventoryadjustment' element={<InventoryAdjustment/>}/></Routes></Router>
    </div>
  );
}

export default App;