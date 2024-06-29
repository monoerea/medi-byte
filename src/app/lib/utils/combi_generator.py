import random
import string
import pandas as pd

# Read the CSV files
insurance_df = pd.read_csv('medi-byte/src/app/lib/utils/Insurance.csv')
patient_df = pd.read_csv('medi-byte/src/app/lib/utils/Patient.csv')

# Extract IDs
insurance_ids = insurance_df['InsuranceID'].astype(str).tolist()
patient_ids = patient_df['PatientID'].astype(str).tolist()

# Shuffle the lists
random.shuffle(patient_ids)
random.shuffle(insurance_ids)

# Initialize variables
combinations = []
id_count = {pid: 0 for pid in patient_ids + insurance_ids}  # Initialize all IDs
max_usage = 20

# Define ULID generator function
def generate_ulid():
    timestamp = int(round(random.uniform(0, 99999)))
    return f"{timestamp}"

# Ensure at least one usage of each ID
for patient_id, insurance_id in zip(patient_ids, insurance_ids):
    ulid = generate_ulid()
    combinations.append((ulid,patient_id.upper(), insurance_id.upper()))
    id_count[patient_id] += 1
    id_count[insurance_id] += 1

# Generate additional combinations
while len(combinations) < 150:
    # Shuffle IDs again
    random.shuffle(patient_ids)
    random.shuffle(insurance_ids)
    
    for patient_id, insurance_id in zip(patient_ids, insurance_ids):
        if id_count[patient_id] < max_usage and id_count[insurance_id] < max_usage:
            ulid = generate_ulid()
            if ulid in patient_id or ulid in insurance_id or ulid in combinations:
                ulid = generate_ulid()
            else:
                combinations.append((ulid,patient_id.upper(), insurance_id.upper()))
                id_count[patient_id] += 1
                id_count[insurance_id] += 1
                break

# Print combinations
for combination in combinations:
    print(combination,',')
print(len(combinations))

df = pd.DataFrame(combinations, columns=['PatientInsuranceID','PatientID', 'InsuranceID'])

# Save DataFrame to CSV
df.to_csv('medi-byte/src/app/lib/utils/PatientInsurance.csv', index=False)
