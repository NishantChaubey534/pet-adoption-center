const request = require('supertest');
const app = require('../../server');

describe('POST /api/pets', () => {
  it('should create a new pet', async () => {
    const res = await request(app)
      .post('/api/pets')
      .send({
        name: 'Max',
        breed: 'Beagle',
        age: 2,
        description: 'Energetic and friendly',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Max');
  });
});
 