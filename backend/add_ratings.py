from config import doctors_collection
from bson import ObjectId

doctors = list(doctors_collection.find())

mock_ratings = [4.5, 3.8, 4.2, 4.7, 3.5, 4.9, 4.1, 3.9, 4.6, 4.3,
                3.7, 4.8, 4.0, 3.6, 4.4, 4.2, 3.8, 4.7, 4.1, 4.5,
                3.9, 4.3, 4.6, 3.7, 4.8, 4.2, 4.0, 3.5, 4.9, 4.3]

mock_total = [12, 8, 15, 23, 6, 31, 18, 9, 27, 14,
              7, 25, 11, 5, 19, 13, 8, 22, 16, 10,
              9, 17, 24, 6, 28, 12, 14, 7, 33, 20]

for i, doctor in enumerate(doctors):
    doctors_collection.update_one(
        {"_id": doctor["_id"]},
        {"$set": {
            "rating": mock_ratings[i % len(mock_ratings)],
            "total_ratings": mock_total[i % len(mock_total)]
        }}
    )

print("Mock ratings added successfully!")