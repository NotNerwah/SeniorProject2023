import './App.css';
import React,{useState,useEffect} from 'react'



//component
const Component1 = () =>{
return <div><h1>Warehouse Inventory Manager</h1><nav><ul><li><a href = "./index.html">Home</a></li><li><a href="./Inventory.html">Inventory</a></li><li><a href="./Orders.html">Order Records</a></li></ul></nav>
<body><img src="https://i.pinimg.com/originals/e3/5b/86/e35b8679124625148e3fb1983c95ed38.png" class="center"></img></body></div>
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