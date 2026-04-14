from config import doctors_collection

# Clear existing doctors first
doctors_collection.delete_many({})

doctors_collection.insert_many([
    # Cardiologists
    {"name": "Dr. Priya Sharma", "specialization": "Cardiologist", "available_times": ["9:00 AM", "11:00 AM", "2:00 PM"], "fee": 700},
    {"name": "Dr. Ramesh Gupta", "specialization": "Cardiologist", "available_times": ["10:00 AM", "1:00 PM", "4:00 PM"], "fee": 650},
    {"name": "Dr. Anita Desai", "specialization": "Cardiologist", "available_times": ["8:00 AM", "12:00 PM", "3:00 PM"], "fee": 750},

    # Dermatologists
    {"name": "Dr. Rahul Mehta", "specialization": "Dermatologist", "available_times": ["9:00 AM", "11:00 AM", "3:00 PM"], "fee": 400},
    {"name": "Dr. Sneha Joshi", "specialization": "Dermatologist", "available_times": ["10:00 AM", "2:00 PM", "5:00 PM"], "fee": 450},
    {"name": "Dr. Kavya Nair", "specialization": "Dermatologist", "available_times": ["8:00 AM", "1:00 PM", "4:00 PM"], "fee": 420},

    # Pediatricians
    {"name": "Dr. Sneha Patel", "specialization": "Pediatrician", "available_times": ["9:00 AM", "11:00 AM", "2:00 PM"], "fee": 350},
    {"name": "Dr. Arjun Verma", "specialization": "Pediatrician", "available_times": ["10:00 AM", "12:00 PM", "4:00 PM"], "fee": 380},
    {"name": "Dr. Pooja Iyer", "specialization": "Pediatrician", "available_times": ["8:00 AM", "1:00 PM", "3:00 PM"], "fee": 360},

    # Orthopedics
    {"name": "Dr. Arun Joshi", "specialization": "Orthopedic", "available_times": ["9:00 AM", "11:00 AM", "3:00 PM"], "fee": 600},
    {"name": "Dr. Vikram Singh", "specialization": "Orthopedic", "available_times": ["10:00 AM", "2:00 PM", "5:00 PM"], "fee": 550},
    {"name": "Dr. Neha Kulkarni", "specialization": "Orthopedic", "available_times": ["8:00 AM", "12:00 PM", "4:00 PM"], "fee": 580},

    # Neurologists
    {"name": "Dr. Meena Iyer", "specialization": "Neurologist", "available_times": ["9:00 AM", "11:00 AM", "2:00 PM"], "fee": 800},
    {"name": "Dr. Suresh Menon", "specialization": "Neurologist", "available_times": ["10:00 AM", "1:00 PM", "4:00 PM"], "fee": 850},
    {"name": "Dr. Divya Pillai", "specialization": "Neurologist", "available_times": ["8:00 AM", "12:00 PM", "3:00 PM"], "fee": 820},

    # Gynecologists
    {"name": "Dr. Rekha Shah", "specialization": "Gynecologist", "available_times": ["9:00 AM", "11:00 AM", "2:00 PM"], "fee": 600},
    {"name": "Dr. Sunita Reddy", "specialization": "Gynecologist", "available_times": ["10:00 AM", "1:00 PM", "4:00 PM"], "fee": 650},
    {"name": "Dr. Asha Bhatt", "specialization": "Gynecologist", "available_times": ["8:00 AM", "12:00 PM", "3:00 PM"], "fee": 620},

    # ENT Specialists
    {"name": "Dr. Karan Malhotra", "specialization": "ENT Specialist", "available_times": ["9:00 AM", "11:00 AM", "3:00 PM"], "fee": 450},
    {"name": "Dr. Poonam Saxena", "specialization": "ENT Specialist", "available_times": ["10:00 AM", "2:00 PM", "5:00 PM"], "fee": 480},
    {"name": "Dr. Rohit Tiwari", "specialization": "ENT Specialist", "available_times": ["8:00 AM", "1:00 PM", "4:00 PM"], "fee": 460},

    # Psychiatrists
    {"name": "Dr. Nisha Kapoor", "specialization": "Psychiatrist", "available_times": ["9:00 AM", "11:00 AM", "2:00 PM"], "fee": 700},
    {"name": "Dr. Amit Bose", "specialization": "Psychiatrist", "available_times": ["10:00 AM", "1:00 PM", "4:00 PM"], "fee": 750},
    {"name": "Dr. Ritu Agarwal", "specialization": "Psychiatrist", "available_times": ["8:00 AM", "12:00 PM", "3:00 PM"], "fee": 720},

    # Ophthalmologists
    {"name": "Dr. Sanjay Rao", "specialization": "Ophthalmologist", "available_times": ["9:00 AM", "11:00 AM", "3:00 PM"], "fee": 500},
    {"name": "Dr. Lalitha Kumar", "specialization": "Ophthalmologist", "available_times": ["10:00 AM", "2:00 PM", "5:00 PM"], "fee": 520},
    {"name": "Dr. Harish Naidu", "specialization": "Ophthalmologist", "available_times": ["8:00 AM", "1:00 PM", "4:00 PM"], "fee": 510},

    # General Physicians
    {"name": "Dr. Sunil Jain", "specialization": "General Physician", "available_times": ["9:00 AM", "11:00 AM", "2:00 PM"], "fee": 300},
    {"name": "Dr. Madhuri Patil", "specialization": "General Physician", "available_times": ["10:00 AM", "1:00 PM", "4:00 PM"], "fee": 280},
    {"name": "Dr. Vinod Sharma", "specialization": "General Physician", "available_times": ["8:00 AM", "12:00 PM", "3:00 PM"], "fee": 320},
])

print("All doctors added successfully!")