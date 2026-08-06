# PerioRiskScore – AI Powered Periodontal Disease Risk Prediction System

PerioRiskScore is a full-stack, production-ready AI healthcare application engineered to predict, monitor, and manage periodontal (gum) disease risk using Random Forest Machine Learning, multi-role web applications, cross-platform mobile apps, Express REST APIs, Firebase infrastructure, and automated testing suites.

---

## 🌟 Key Features

### 1. Patient Portal
- **10-Step AI Risk Assessment Wizard**: Interactive questionnaire evaluating age, smoking, bleeding gums, pocket impaction, systemic health, brushing/flossing habits, mobility, family history, and dental visits.
- **AI Prediction Engine**: Random Forest classification returning risk score (0-100), risk level (`Low`, `Moderate`, `High`, `Severe`), softmax probability matrix, and feature weight contribution.
- **Personalized Recommendations**: Clinical and preventive guidelines tailored to individual risk factors.
- **PDF Report Generator**: Download official PDF assessment reports.
- **Specialist Consultation**: Search periodontists, book appointments, and chat directly with assigned doctors.
- **PerioRisk AI Assistant**: 24/7 interactive clinical chatbot for oral health queries.

### 2. Doctor Portal
- **Clinical Dashboard**: Overview of assigned patients, risk alerts, and pending appointment requests.
- **Patient Management**: Review complete patient risk reports, probability distributions, and clinical parameters.
- **Appointment Management**: Approve or reject patient consultation requests.
- **Encrypted Chat**: Direct messaging channel with patients.

### 3. Administrator Console
- **System Supervision**: Monitor total registered accounts, API latency, and database health.
- **User & Role Management**: Toggle account active status (Enable/Disable).
- **Security Audit Logs**: Immutable HIPAA-compliant event logs.

---

## 🛠️ Technology Stack

- **Web Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Axios.
- **Mobile App**: React Native, Expo, TypeScript.
- **Backend API**: Node.js, Express.js, TypeScript, JWT Auth, PDFKit, Helmet, Rate Limiter.
- **AI / ML Engine**: Scikit-Learn Random Forest Classifier (Python pipeline + Node.js inference engine).
- **Database & Storage**: Firebase Cloud Firestore (11 collections) + Firebase Storage.
- **Testing**: Jest, Supertest, 300+ Test Suite Specification.
- **Deployment**: Vercel (Frontend), Render (Backend), Firebase (Hosting & Firestore Rules).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Running Backend Server
```bash
cd backend
npm install
npm run dev
```
Backend will start at `http://localhost:5000`. Health check: `http://localhost:5000/api/health`.

### 3. Running Frontend Web App
```bash
cd frontend-web
npm install
npm run dev
```
Web App will start at `http://localhost:3000`.

### 4. Running Mobile App
```bash
cd mobile-app
npm install
npm start
```

---

## 🧪 Testing

Run backend automated API integration tests:
```bash
cd backend
npm test
```
The full 300+ Test Suite specification can be found at [tests/test_suite_300.md](file:///c:/Users/HP/Desktop/moblie/tests/test_suite_300.md).

---

## 📄 License
Production-ready software developed for engineering project deployment.
