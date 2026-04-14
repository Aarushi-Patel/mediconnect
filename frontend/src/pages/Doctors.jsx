import { useEffect, useState } from "react";
import { getDoctors } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Doctors.css";

function Doctors() {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getDoctors().then((res) => {
      const groups = {};
      res.data.forEach((doc) => {
        if (!groups[doc.specialization]) groups[doc.specialization] = [];
        groups[doc.specialization].push(doc);
      });
      setGrouped(groups);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredGroups = Object.entries(grouped).filter(([spec]) =>
    spec.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctors-container">
      <h2 className="page-title">Find Doctors</h2>
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search by specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading doctors...</p>
      ) : filteredGroups.length === 0 ? (
        <p>No specialization found.</p>
      ) : (
        filteredGroups.map(([specialization, doctors]) => (
          <div key={specialization} className="specialization-section">
            <h3 className="specialization-title">🏥 {specialization}</h3>
            <div className="doctors-grid">
              {doctors.map((doctor) => (
                <div className="doctor-card" key={doctor._id}>
                  <div className="doctor-avatar">👨‍⚕️</div>
                  <h3>{doctor.name}</h3>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="fee">Consultation Fee: ₹{doctor.fee}</p>
                  <p className="times">🕐 {doctor.available_times?.join(", ")}</p>
                  <p className="rating">
  ⭐ {doctor.rating ? `${doctor.rating} / 5 (${doctor.total_ratings} reviews)` : "No ratings yet"}
</p>
                  <button
                    className="book-btn"
                    onClick={() => navigate(`/book/${doctor._id}`)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Doctors;