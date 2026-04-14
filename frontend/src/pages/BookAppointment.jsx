import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctors, bookAppointment } from "../services/api";
import "./BookAppointment.css";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("normal");
  const [symptoms, setSymptoms] = useState("");
  const [message, setMessage] = useState("");
  const [queueInfo, setQueueInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDoctors().then((res) => {
      const found = res.data.find((d) => d._id === id);
      setDoctor(found);
    });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setLoading(true);
    try {
      const res = await bookAppointment({
        doctor_id: id,
        date,
        time,
        priority,
        symptoms,
        
      });
      setQueueInfo(res.data);
    } catch {
      setMessage("Booking failed. Please try again.");
    }
    setLoading(false);
  };

  if (queueInfo) return (
    <div className="book-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>Appointment Booked!</h2>
        <div className={`priority-badge ${queueInfo.priority}`}>
          {queueInfo.priority === "urgent" ? "🚨 URGENT" : "📋 NORMAL"}
        </div>
        <div className="queue-info">
          <p>Your Queue Position</p>
          <div className="queue-number">#{queueInfo.queue_position}</div>
          <p className="queue-note">
            {queueInfo.priority === "urgent"
              ? "You have been marked as urgent and will be prioritized!"
              : "You are in the normal queue. Please arrive on time."}
          </p>
        </div>
        <button className="auth-btn" onClick={() => navigate("/my-appointments")}>
          View My Appointments
        </button>
      </div>
    </div>
  );

  if (!doctor) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div className="book-container">
      <div className="book-card">
        <h2>Book Appointment 📅</h2>
        <div className="doctor-info-box">
          <span>👨‍⚕️</span>
          <div>
            <p className="doc-name">{doctor.name}</p>
            <p className="doc-spec">{doctor.specialization} • ₹{doctor.fee}</p>
          </div>
        </div>
        {message && <p className="error-msg">{message}</p>}
        <form onSubmit={handleBooking}>
          <div className="form-group">
            <label>Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div className="form-group">
            <label>Select Time</label>
            <select value={time} onChange={(e) => setTime(e.target.value)} required>
              <option value="">-- Choose a time --</option>
              {doctor.available_times?.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Priority Level</label>
            <div className="priority-options">
              <div
                className={`priority-option normal ${priority === "normal" ? "selected" : ""}`}
                onClick={() => setPriority("normal")}
              >
                <span>📋</span>
                <strong>Normal</strong>
                <small>Routine checkup or non-urgent issue</small>
              </div>
              <div
                className={`priority-option urgent ${priority === "urgent" ? "selected" : ""}`}
                onClick={() => setPriority("urgent")}
              >
                <span>🚨</span>
                <strong>Urgent</strong>
                <small>Severe pain or emergency condition</small>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Describe Your Symptoms</label>
            <textarea
              placeholder="e.g. Severe chest pain since morning, difficulty breathing..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
              required
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;