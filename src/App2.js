import './App2.css';
import React,{useState,useEffect} from 'react'

const Component1 = () =>{
    return <div><h1>Inventory</h1><nav><ul><li><a href = "index.html">Home</a></li><li><a href="Inventory.html">Inventory</a></li><li><a href="Orders.html">Order Records</a></li></ul></nav></div>
    }
    /**
     * Create the player component. 
     * 
     * @returns The App component
     */
    function App2() {
      return (
        <div className="App2">
          <Component1/>
        </div>
      );
    }
    
    export default App2;