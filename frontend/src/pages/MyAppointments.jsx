import { useEffect, useState } from "react";
import { getMyAppointments, cancelAppointment, getDoctors, rateAppointment } from "../services/api";
import "./MyAppointments.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    Promise.all([getMyAppointments(), getDoctors()])
      .then(([apptRes, docRes]) => {
        setAppointments(apptRes.data);
        const docMap = {};
        docRes.data.forEach((d) => { docMap[d._id] = d; });
        setDoctors(docMap);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      fetchData();
    } catch {
      alert("Failed to cancel appointment.");
    }
  };

  const handleRate = async (id, rating) => {
    try {
      await rateAppointment(id, rating);
      fetchData();
    } catch {
      alert("Failed to submit rating.");
    }
  };

  const isCompleted = (apptDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const apt = new Date(apptDate);
    apt.setHours(0, 0, 0, 0);
    return apt <= today;
  };

  return (
    <div className="appointments-container">
      <h2 className="page-title">My Appointments</h2>
      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="no-appt">You have no appointments yet. <a href="/doctors">Book one now!</a></p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appt) => (
            <div className="appointment-card" key={appt._id}>
              <div className="appt-info">
                <p><strong>Doctor:</strong> {doctors[appt.doctor_id]?.name || "Unknown"}</p>
                <p><strong>Specialization:</strong> {doctors[appt.doctor_id]?.specialization || "-"}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Fee:</strong> ₹{doctors[appt.doctor_id]?.fee || "-"}</p>
                <p>
                  <strong>Status: </strong>
                  <span className={`status ${appt.status}`}>{appt.status}</span>
                </p>
              </div>
              {isCompleted(appt.date) && appt.status !== "cancelled" && !appt.rating && (
                <div className="rating-section">
                  <p><strong>Rate your experience:</strong></p>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="star" onClick={() => handleRate(appt._id, star)}>⭐</span>
                    ))}
                  </div>
                </div>
              )}
              {appt.rating && (
                <p className="rated">Your Rating: {"⭐".repeat(appt.rating)}</p>
              )}
              {appt.status !== "cancelled" && (
                <button className="cancel-btn" onClick={() => handleCancel(appt._id)}>
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;