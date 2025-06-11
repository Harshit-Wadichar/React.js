import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCounter] = useState(0);

 //const counter = 5;
 const addValue = () => {
  if(count<20){
    setCounter(count + 1);
    setCounter(prevCounter => prevCounter + 1 )
    setCounter(prevCounter => prevCounter + 1)
    setCounter(prevCounter => prevCounter + 1)
  }
  console.log("addValue called", count);
 }

 const removeValue = () => {
  if(count>0){
  setCounter(count - 1);
  }
  console.log("removeValue called", count);
 }

  return (
    <>
      <h1> chai aur react</h1>
      <h2>counter value: {count}</h2>

      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>Remove value</button>
    </>
  );
}

export default App;
