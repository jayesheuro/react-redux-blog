import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
