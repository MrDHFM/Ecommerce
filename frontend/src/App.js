import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/customer/Auth/Login/Login";
import Signup from "../src/customer/Auth/Login/Signup";
import Home from "../src/customer/pages/Home/Home";
import Header from "./customer/components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
