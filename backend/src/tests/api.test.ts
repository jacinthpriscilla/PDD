import request from 'supertest';
import app from '../server';

describe('PerioRiskScore Backend API Integration Tests', () => {
  let authToken: string;

  it('GET /api/health - should return online status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('online');
  });

  it('POST /api/auth/login - should authenticate sample patient', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'patient@periorisk.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    authToken = res.body.token;
  });

  it('POST /api/predictions/assess - should process 10-step periodontal risk assessment', async () => {
    const assessmentAnswers = {
      ageGroup: 2,
      smokingHabits: 2,
      bleedingGums: 3,
      pocketDepthProxy: 2,
      systemicHealth: 1,
      brushingFrequency: 1,
      flossingFrequency: 3,
      looseTeeth: 1,
      familyHistory: 1,
      lastDentalVisit: 2
    };

    const res = await request(app)
      .post('/api/predictions/assess')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ answers: assessmentAnswers });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.prediction).toBeDefined();
    expect(res.body.prediction.riskScore).toBeGreaterThan(0);
    expect(['Low', 'Moderate', 'High', 'Severe']).toContain(res.body.prediction.riskCategory);
  });

  it('GET /api/doctors - should retrieve public doctor directory', async () => {
    const res = await request(app).get('/api/doctors');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.doctors)).toBe(true);
  });
});
