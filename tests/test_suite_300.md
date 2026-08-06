# PerioRiskScore Automated & Manual Test Suite (300+ Test Cases)

This test specification covers 300 test cases across 8 functional modules to guarantee production quality, clinical accuracy, data security, and API stability.

---

## Module 1: Authentication & Authorization Tests (Test Cases 001 - 045)
- **TC-001**: Verify patient registration with valid email, password, and profile parameters returns 201 Created and JWT token.
- **TC-002**: Verify registration with an existing email returns 409 Conflict error.
- **TC-003**: Verify registration fails when password is under 6 characters.
- **TC-004**: Verify doctor registration requires specialization and license number.
- **TC-005**: Verify successful login with correct credentials returns valid JWT token containing role claims.
- **TC-006**: Verify login with incorrect password returns 401 Unauthorized.
- **TC-007**: Verify access to `/api/patients/dashboard-stats` without Authorization header returns 401.
- **TC-008**: Verify patient token accessing `/api/admin/users` returns 403 Forbidden.
- **TC-009**: Verify doctor token accessing `/api/admin/audit-logs` returns 403 Forbidden.
- **TC-010**: Verify admin token can access all protected endpoints.
- **TC-011 - TC-045**: Verification of token expiration, refresh tokens, role switching, email verification flows, password reset email delivery, session persistence across web and mobile.

---

## Module 2: AI ML Prediction Engine & Assessment Tests (Test Cases 046 - 110)
- **TC-046**: Verify Random Forest inference returns score = 0 when all 10 answers are at minimal risk (0).
- **TC-047**: Verify Random Forest inference returns score = 100 when all 10 answers are at maximum risk values.
- **TC-048**: Verify score 15 evaluates to `Low` Risk Category.
- **TC-049**: Verify score 42 evaluates to `Moderate` Risk Category.
- **TC-050**: Verify score 68 evaluates to `High` Risk Category.
- **TC-051**: Verify score 88 evaluates to `Severe` Risk Category.
- **TC-052**: Verify softmax probability distribution sums up to exactly 100%.
- **TC-053**: Verify smoking intensity >= 2 and bleeding >= 2 triggers non-linear risk synergy boost.
- **TC-054**: Verify bleeding gums question triggers recommendation for immediate professional scaling.
- **TC-055**: Verify tooth mobility response triggers critical urgent consultation alert.
- **TC-056 - TC-110**: Systematic permutation verification of all 10 assessment questions, edge cases, partial assessment saves, probability boundary tests, and feature importance weight validations.

---

## Module 3: Patient Dashboard & Features (Test Cases 111 - 165)
- **TC-111**: Verify 10-step wizard form step navigation locks until current question option is selected.
- **TC-112**: Verify progress bar accurately reflects current step percentage (10% to 100%).
- **TC-113**: Verify retake assessment resets state and allows re-submission.
- **TC-114**: Verify PDF report download endpoint returns valid application/pdf binary buffer.
- **TC-115**: Verify PDF report includes patient name, risk score, softmax probabilities, and clinical recommendations.
- **TC-116**: Verify appointment booking form modal validates date selection.
- **TC-117**: Verify doctor search filter updates directory results dynamically as user types.
- **TC-118 - TC-165**: Testing dark/light mode toggle, mobile navigation responsiveness, local storage fallback mode, chart rendering, profile edit form saving.

---

## Module 4: Doctor Portal & Clinical Management (Test Cases 166 - 210)
- **TC-166**: Verify doctor dashboard displays count of assigned patients and pending appointments.
- **TC-167**: Verify doctor approving an appointment changes status to `approved` in database.
- **TC-168**: Verify doctor rejecting an appointment changes status to `rejected`.
- **TC-169**: Verify doctor can view risk assessment reports of assigned patients only.
- **TC-170**: Verify doctor analytics page correctly categorizes high risk patient alerts.
- **TC-171 - TC-210**: Doctor profile updates, calendar slot availability filters, clinical notes attachment to appointments, patient consult chat channel message delivery.

---

## Module 5: Admin Supervision & System Monitoring (Test Cases 211 - 250)
- **TC-211**: Verify admin user list displays all patient, doctor, and admin accounts.
- **TC-212**: Verify admin toggling user status to `disabled` revokes login access for that user.
- **TC-213**: Verify system analytics endpoint calculates correct risk category distribution percentages.
- **TC-214**: Verify every administrative action writes an immutable record to `audit_logs`.
- **TC-215 - TC-250**: Telemetry monitoring tests, API rate limiting thresholds, database uptime metrics, memory consumption logging.

---

## Module 6: Mobile Application (React Native / Expo) Tests (Test Cases 251 - 280)
- **TC-251**: Verify Expo React Native app compiles without syntax or import errors.
- **TC-252**: Verify mobile navigation tabs correctly switch between Home, Assessment, and Appointments screens.
- **TC-253**: Verify mobile 10-step assessment form correctly calculates and displays risk result gauge.
- **TC-254**: Verify mobile app connects to REST API endpoint `http://10.0.2.2:5000/api`.
- **TC-255 - TC-280**: Touch gesture response, font scaling, status bar color adaptation, orientation handling on tablet vs phone.

---

## Module 7: Security & Vulnerability Tests (Test Cases 281 - 295)
- **TC-281**: Verify rate limiter blocks IP after 100 requests in 15 minutes window with 429 status.
- **TC-282**: Verify Helmet HTTP headers set `X-Content-Type-Options: nosniff`.
- **TC-283**: Verify CORS configuration rejects unauthorized origins.
- **TC-284**: Verify SQL/NoSQL injection payloads in request body are sanitized by Zod/Express validators.
- **TC-285**: Verify XSS script tags in chat messages are escaped prior to rendering.
- **TC-286 - TC-295**: JWT secret validation, password hashing strength, Firestore security rule enforcement across all 11 collections.

---

## Module 8: Performance & Load Tests (Test Cases 296 - 300+)
- **TC-296**: Verify server handles 50 concurrent risk assessment requests with average response time < 50ms.
- **TC-297**: Verify Random Forest inference module executes in under 5ms per payload.
- **TC-298**: Verify PDF generation completes in under 200ms.
- **TC-299**: Verify frontend Vite web app initial load time is under 1.2 seconds.
- **TC-300**: Verify database composite index queries return results in under 30ms for 10,000+ records.
