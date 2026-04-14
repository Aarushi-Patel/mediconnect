import { useState } from "react";
import { addDoctor } from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [availableTimes, setAvailableTimes] = useState("");
  const [fee, setFee] = useState("");
  const [message, setMessage] = useState("");

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await addDoctor({
        name,
        specialization,
        available_times: availableTimes.split(","),
        fee,
      });
      setMessage("Doctor added successfully!");
      setName("");
      setSpecialization("");
      setAvailableTimes("");
      setFee("");
    } catch (err) {
      setMessage("Failed to add doctor.");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="page-title">Admin Dashboard</h2>
        <p className="admin-subtitle">Add a new doctor to MediConnect</p>
        {message && <p className="admin-message">{message}</p>}
        <form onSubmit={handleAddDoctor}>
          <div className="form-group">
            <label>Doctor Name</label>
            <input
              type="text"
              placeholder="e.g. Dr. Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              placeholder="e.g. Cardiologist"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Available Times (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. 10:00 AM, 2:00 PM, 4:00 PM"
              value={availableTimes}
              onChange={(e) => setAvailableTimes(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Consultation Fee (₹)</label>
            <input
              type="number"
              placeholder="e.g. 500"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Add Doctor</button>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
