const Pet = require('../models/pet');

exports.getPets = async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
};

exports.getPet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  res.json(pet);
};

exports.createPet = async (req, res) => {
  const pet = new Pet(req.body);
  await pet.save();
  res.status(201).json(pet);
};

exports.updatePet = async (req, res) => {
  const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPet);
};

exports.deletePet = async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  res.json({ message: 'Pet deleted' });
};
