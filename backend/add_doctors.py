from config import doctors_collection

doctors_collection.insert_many([
    {'name': 'Dr. Priya Sharma', 'specialization': 'Cardiologist', 'available_times': ['10:00 AM', '11:00 AM', '2:00 PM'], 'fee': 500},
    {'name': 'Dr. Rahul Mehta', 'specialization': 'Dermatologist', 'available_times': ['9:00 AM', '12:00 PM', '3:00 PM'], 'fee': 400},
    {'name': 'Dr. Sneha Patel', 'specialization': 'Pediatrician', 'available_times': ['10:00 AM', '1:00 PM', '4:00 PM'], 'fee': 350},
    {'name': 'Dr. Arun Joshi', 'specialization': 'Orthopedic', 'available_times': ['11:00 AM', '2:00 PM', '5:00 PM'], 'fee': 600},
    {'name': 'Dr. Meena Iyer', 'specialization': 'Neurologist', 'available_times': ['9:00 AM', '11:00 AM', '3:00 PM'], 'fee': 700}
])

print("Doctors added successfully!")