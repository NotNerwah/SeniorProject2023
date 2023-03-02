import './App.css';
import React,{useState,useEffect} from 'react'

//component
const Component1 = () =>{
return <div><p>hi</p></div>;
}
/**
 * Create the player component. 
 * 
 * @returns The App component
 */
function App() {
  return (
    <div className="App">
      <Component1/>
    </div>
  );
}

export default App;