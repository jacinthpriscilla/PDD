# PerioRiskScore REST API Documentation

Base URL: `http://localhost:5000/api`

## Authentication Endpoints
- `POST /auth/register` - Create new Patient or Doctor account
- `POST /auth/login` - Authenticate user & return JWT token
- `POST /auth/forgot-password` - Request password reset link
- `POST /auth/verify-email` - Confirm email verification code

## Patient Endpoints
- `GET /patients/profile` - Get authenticated patient profile
- `PUT /patients/profile` - Update patient details
- `GET /patients/dashboard-stats` - Get assessment totals & next appointment

## AI Prediction Endpoints
- `POST /predictions/assess` - Submit 10-step questionnaire & compute Random Forest score
- `GET /predictions` - Get historical prediction records
- `GET /predictions/:id` - Get prediction details
- `GET /predictions/:id/pdf` - Download PDF risk assessment report

## Doctor Endpoints
- `GET /doctors` - List public periodontist directory
- `GET /doctors/:id` - Get doctor details
- `GET /doctors/dashboard-stats` - Doctor clinical dashboard metrics

## Appointment Endpoints
- `POST /appointments` - Book appointment
- `GET /appointments` - List appointments
- `PATCH /appointments/:id/status` - Update status (`approved` | `rejected` | `completed`)

## Chat & AI Assistant
- `GET /chat/messages` - Retrieve consultation channel messages
- `POST /chat/messages` - Send message
- `POST /chat/ai-assistant` - Query AI Chat Assistant

## Admin Management
- `GET /admin/users` - User directory
- `PATCH /admin/users/:id/toggle-status` - Enable/disable account
- `GET /admin/analytics` - System metrics & risk distribution
- `GET /admin/audit-logs` - Security audit trail
