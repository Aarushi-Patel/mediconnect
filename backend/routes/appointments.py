from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import appointments_collection, doctors_collection
from bson import ObjectId
from datetime import datetime

appointments = Blueprint("appointments", __name__)

@appointments.route("/book", methods=["POST"])
@jwt_required()
def book_appointment():
    data = request.get_json()
    patient_id = get_jwt_identity()

    priority = data.get("priority", "normal")
    priority_score = 1 if priority == "urgent" else 2

    appointment_date = data.get("date")
    today = datetime.utcnow().strftime("%Y-%m-%d")
    status = "confirmed" if appointment_date == today else "pending"

    existing = list(appointments_collection.find({
        "doctor_id": data.get("doctor_id"),
        "date": appointment_date,
        "time": data.get("time"),
        "status": {"$ne": "cancelled"}
    }))
    queue_position = len(existing) + 1

    appointments_collection.insert_one({
        "patient_id": patient_id,
        "patient_name": data.get("patient_name"),
        "doctor_id": data.get("doctor_id"),
        "date": appointment_date,
        "time": data.get("time"),
        "priority": priority,
        "priority_score": priority_score,
        "symptoms": data.get("symptoms", ""),
        "status": status,
        "queue_position": queue_position,
        "booked_at": datetime.utcnow().isoformat()
    })
    return jsonify({
        "message": "Appointment booked successfully",
        "queue_position": queue_position,
        "priority": priority
    }), 201

@appointments.route("/my", methods=["GET"])
@jwt_required()
def get_my_appointments():
    patient_id = get_jwt_identity()
    all_appointments = list(appointments_collection.find(
        {"patient_id": patient_id}
    ).sort("priority_score", 1))
    for a in all_appointments:
        a["_id"] = str(a["_id"])
    return jsonify(all_appointments), 200

@appointments.route("/cancel/<id>", methods=["DELETE"])
@jwt_required()
def cancel_appointment(id):
    appointments_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"status": "cancelled"}}
    )
    return jsonify({"message": "Appointment cancelled"}), 200

@appointments.route("/all", methods=["GET"])
@jwt_required()
def get_all_appointments():
    all_appointments = list(appointments_collection.find().sort("priority_score", 1))
    for a in all_appointments:
        a["_id"] = str(a["_id"])
    return jsonify(all_appointments), 200

@appointments.route("/rate/<id>", methods=["POST"])
@jwt_required()
def rate_appointment(id):
    data = request.get_json()
    rating = data.get("rating")
    appointments_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"rating": rating}}
    )
    appt = appointments_collection.find_one({"_id": ObjectId(id)})
    doctor_id = appt["doctor_id"]
    all_ratings = list(appointments_collection.find({
        "doctor_id": doctor_id,
        "rating": {"$exists": True}
    }))
    avg_rating = sum(a["rating"] for a in all_ratings) / len(all_ratings)
    doctors_collection.update_one(
        {"_id": ObjectId(doctor_id)},
        {"$set": {"rating": round(avg_rating, 1), "total_ratings": len(all_ratings)}}
    )
    return jsonify({"message": "Rating submitted"}), 200