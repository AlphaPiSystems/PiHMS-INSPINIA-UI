import json

def update_staff_names():
    indian_names = [
        "Dr. Rajesh Kumar", "Priya Sharma", "Dr. Amit Patel", "Sunita Reddy", "Sanjay Gupta",
        "Anjali Nair", "Dr. Vikram Singh", "Meera Iyer", "Abdul Rahman", "Deepa Menon",
        "Sneha Rao", "Rohan Verma", "Kavita Deshmukh", "Arjun Malhotra", "Tanvi Joshi",
        "Vivek Pandey", "Ritu Saxena", "Suresh Iyer", "Pooja Hegde", "Manish Tiwari",
        "Aishwarya Pillai", "Rahul Dravid", "Shikha Goel", "Varun Dhawan", "Neha Kakkar",
        "Aditya Roy", "Ishani Mukherjee", "Kartik Aaryan", "Sandhya Rathi", "Gautam Gambhir",
        "Mithali Raj", "Rohit Sharma", "Smriti Mandhana", "Jasprit Bumrah", "Hardik Pandya",
        "Rishabh Pant", "Ravindra Jadeja", "K L Rahul", "Cheteshwar Pujara", "Ajinkya Rahane",
        "Ishant Sharma", "Mohammed Shami", "Umesh Yadav", "Hanuma Vihari", "Mayank Agarwal",
        "Prithvi Shaw", "Shubman Gill", "Navdeep Saini", "Shardul Thakur", "Washington Sundar",
        "Axar Patel", "Yuzvendra Chahal", "Kuldeep Yadav", "Deepak Chahar", "T Natarajan",
        "Suryakumar Yadav", "Ishan Kishan", "Devdutt Padikkal", "Harshal Patel", "Avesh Khan",
        "Chetan Sakariya", "Varun Chakravarthy", "Ruturaj Gaikwad", "Venkatesh Iyer", "Harpreet Brar",
        "Ravi Bishnoi", "Arshdeep Singh", "Umran Malik", "Mohsin Khan", "Yash Dayal"
    ]

    db_path = 'src/assets/data/db.json'
    with open(db_path, 'r') as f:
        db = json.load(f)

    staff_list = db.get('staff', [])
    for i, staff in enumerate(staff_list):
        if "Staff Member" in staff['Name'] or "Staff " in staff['Name']:
            # Use name from list if available, else loop back or keep original
            name_idx = i % len(indian_names)
            staff['Name'] = indian_names[name_idx]

    with open(db_path, 'w') as f:
        json.dump(db, f, indent=2)
    
    print(f"Updated {len(staff_list)} staff names with Indian names.")

if __name__ == "__main__":
    update_staff_names()
