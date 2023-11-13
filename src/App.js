import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Onboard from "./Components/Onboard";
import Forgot from "./Components/Forgot";
import Quil from "./Components/Quil";
import Add from './Components/Add'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin/>} />
        <Route path="/signup" element={<Signin register/>}/>
        <Route path="/onboard" element={<Onboard/>}/>
        <Route path="/onboards" element={<Add signup/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/quil/:id" element={<Quil/>}/>
      </Routes>
    </div>
  );
}

export default App;
