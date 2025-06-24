const request = require('supertest');
const app = require('../../server');

describe('GET /api/pets', () => {
  it('should return all pets', async () => {
    const res = await request(app).get('/api/pets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
