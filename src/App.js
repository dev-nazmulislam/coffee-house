import "./index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Navbar from "./component/navbar/Navbar";
import Order from "./component/order/Order";
import SingUp from "./component/register/SingUp";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
      </Routes>
    </div>
  );
}

export default App;
