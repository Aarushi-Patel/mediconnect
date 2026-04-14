from pymongo import MongoClient

MONGO_URL = "mongodb+srv://drashtip125_db_user:python125@cluster0.3wxlji9.mongodb.net/mediconnect_db?retryWrites=true&w=majority"

client = MongoClient(MONGO_URL)
db = client["mediconnect_db"]

users_collection = db["users"]
doctors_collection = db["doctors"]
appointments_collection = db["appointments"]