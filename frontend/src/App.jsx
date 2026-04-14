import BookAppointment from "./pages/BookAppointment";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import MyAppointments from "./pages/MyAppointments";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/my-appointments" element={token ? <MyAppointments /> : <Navigate to="/login" />} />
        <Route path="/admin" element={token && localStorage.getItem("role") === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/book/:id" element={token ? <BookAppointment /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;