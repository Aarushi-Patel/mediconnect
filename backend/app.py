from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "mediconnect_super_secret_key_123"

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
jwt = JWTManager(app)

from routes.auth import auth
from routes.doctors import doctors
from routes.appointments import appointments

app.register_blueprint(auth, url_prefix="/api/auth")
app.register_blueprint(doctors, url_prefix="/api/doctors")
app.register_blueprint(appointments, url_prefix="/api/appointments")

@app.route("/")
def home():
    return {"message": "Welcome to MediConnect API!"}

if __name__ == "__main__":
    app.run(debug=True, port=5000)