import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MediConnect 🏥</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        {token && <Link to="/my-appointments">My Appointments</Link>}
        {token && role === "admin" && <Link to="/admin">Admin</Link>}
        {token ? (
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
