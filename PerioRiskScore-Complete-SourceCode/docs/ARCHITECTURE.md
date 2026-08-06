# PerioRiskScore Architecture & Technical Design

## 1. System Overview
PerioRiskScore is a full-stack AI-driven periodontal disease risk prediction system designed to process 10 clinical and lifestyle risk markers using a Random Forest Machine Learning classifier.

```
                    +--------------------------------+
                    |   User (Web App & Mobile App)  |
                    +---------------+----------------+
                                    |
                           HTTPS / REST API
                                    v
                    +---------------+----------------+
                    |  Node.js / Express API Server  |
                    +---------------+----------------+
                                    |
          +-------------------------+-------------------------+
          |                         |                         |
          v                         v                         v
+------------------+     +--------------------+     +-------------------+
| Random Forest ML |     |  Firebase Admin /  |     |  PDF Generator    |
| Inference Engine |     |  Firestore Cloud   |     |  Service          |
+------------------+     +--------------------+     +-------------------+
```

## 2. Multi-Role Data Isolation (RBAC)
- **Patient**: Access personal assessment wizard, historical trend graphs, appointments booking, doctor search, encrypted doctor chat, AI chatbot assistant, PDF report export.
- **Doctor**: Clinical management dashboard, assigned patient risk records, appointment approval/rejection calendar, consultation chat.
- **Admin**: System user management, status toggling, API latency monitoring, global risk distribution metrics, and security audit log monitoring.

## 3. Random Forest Inference Engine
Feature weight distribution across 10 assessment parameters:
1. `smokingHabits` (18% Weight)
2. `bleedingGums` (16% Weight)
3. `pocketDepthProxy` (16% Weight)
4. `systemicHealth` (12% Weight)
5. `flossingFrequency` (9% Weight)
6. `ageGroup` (8% Weight)
7. `looseTeeth` (8% Weight)
8. `brushingFrequency` (7% Weight)
9. `familyHistory` (3% Weight)
10. `lastDentalVisit` (3% Weight)
