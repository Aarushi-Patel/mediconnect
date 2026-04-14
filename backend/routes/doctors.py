from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from config import doctors_collection

doctors = Blueprint("doctors", __name__)

@doctors.route("/", methods=["GET"])
def get_doctors():
    all_doctors = list(doctors_collection.find())
    for doctor in all_doctors:
        doctor["_id"] = str(doctor["_id"])
    return jsonify(all_doctors), 200

@doctors.route("/add", methods=["POST"])
@jwt_required()
def add_doctor():
    data = request.get_json()
    doctors_collection.insert_one({
        "name": data.get("name"),
        "specialization": data.get("specialization"),
        "available_times": data.get("available_times"),
        "fee": data.get("fee")
    })
    return jsonify({"message": "Doctor added successfully"}), 201