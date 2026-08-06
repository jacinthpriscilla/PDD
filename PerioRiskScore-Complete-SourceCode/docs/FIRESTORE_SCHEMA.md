# Firestore Collections & Data Dictionary

PerioRiskScore database uses 11 normalized Firestore collections:

1. **`users`**: Base user identity credentials, role tags, and authentication metadata.
2. **`patients`**: Patient clinical profile, age, gender, medical history array, latest risk score.
3. **`doctors`**: Doctor specialization, license number, experience years, clinic address, rating.
4. **`assessments`**: Recorded 10-step periodontal questionnaire answers.
5. **`predictions`**: Generated Random Forest output (risk score 0-100, category, softmax probability matrix, recommendations).
6. **`appointments`**: Patient-Doctor booking requests, time slots, status (`pending`, `approved`, `rejected`, `completed`).
7. **`messages`**: Encrypted real-time consultation chat messages between patient and assigned periodontist.
8. **`notifications`**: Real-time push & in-app alerts (appointment updates, assessment reminders).
9. **`recommendations`**: Dynamic clinical recommendation master library categorized by risk level.
10. **`reports`**: Generated PDF report metadata and storage URLs.
11. **`audit_logs`**: System security logs, login events, and administrative actions.
