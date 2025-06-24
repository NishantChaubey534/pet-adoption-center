const {
  createPet,
  getPets,
  getPet,
  updatePet,
  deletePet
} = require('../../controllers/petController');

const Pet = require('../../models/pet');

jest.mock('../../models/pet');

describe('Pet Controller Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a pet and respond with 201', async () => {
    const mockPetData = { name: 'Tommy', breed: 'Bulldog', age: 3 };
    
    const mockSave = jest.fn(); 
    const mockPetInstance = { ...mockPetData, save: mockSave };

    Pet.mockImplementation(() => mockPetInstance);

    const req = { body: mockPetData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createPet(req, res);

    expect(Pet).toHaveBeenCalledWith(mockPetData);
    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPetInstance); 
  });

  test('should get all pets', async () => {
    const mockPets = [
      { name: 'Tommy', breed: 'Bulldog', age: 3 },
      { name: 'Milo', breed: 'Beagle', age: 2 }
    ];
    Pet.find.mockResolvedValue(mockPets);

    const req = {};
    const res = { json: jest.fn() };

    await getPets(req, res);

    expect(Pet.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockPets);
  });

  test('should get a pet by ID', async () => {
    const mockPet = { name: 'Tommy', breed: 'Bulldog', age: 3 };
    Pet.findById.mockResolvedValue(mockPet);

    const req = { params: { id: '123' } };
    const res = { json: jest.fn() };

    await getPet(req, res);

    expect(Pet.findById).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith(mockPet);
  });

  test('should update a pet by ID', async () => {
    const updatedPet = { name: 'Tommy', breed: 'Labrador', age: 4 };
    Pet.findByIdAndUpdate.mockResolvedValue(updatedPet);

    const req = {
      params: { id: '123' },
      body: updatedPet
    };
    const res = { json: jest.fn() };

    await updatePet(req, res);

    expect(Pet.findByIdAndUpdate).toHaveBeenCalledWith('123', updatedPet, { new: true });
    expect(res.json).toHaveBeenCalledWith(updatedPet);
  });

  test('should delete a pet by ID', async () => {
    Pet.findByIdAndDelete.mockResolvedValue();

    const req = { params: { id: '123' } };
    const res = { json: jest.fn() };

    await deletePet(req, res);

    expect(Pet.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith({ message: 'Pet deleted' });
  });
});
