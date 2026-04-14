from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt
from config import users_collection

auth = Blueprint("auth", __name__)
bcrypt = Bcrypt()

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "patient")

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password,
        "role": role
    })
    return jsonify({"message": "User registered successfully"}), 201

@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user["_id"]))
    return jsonify({"token": access_token, "name": user["name"], "role": user["role"]}), 200