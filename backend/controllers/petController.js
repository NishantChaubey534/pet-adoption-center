const Pet = require('../models/pet');

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.status(200).json(pet);
  } catch (error) {
    // Invalid ID format will throw a CastError
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid pet ID format" });
    }
    res.status(500).json({ error: error.message });
  }
};


exports.createPet = async (req, res) => {
  try {
    let { name, age, breed, description, image, status } = req.body;

    // Try to convert age to number (if it's a string like "2")
    if (typeof age === 'string') age = Number(age);
    if (typeof age !== 'number' || isNaN(age)) {
      return res.status(400).json({ error: "Age must be a valid number." });
    }

    const newPet = new Pet({ name, age, breed, description, image, status });
    await newPet.save();

    // Return `id` instead of `_id` for Keploy dynamic substitution
    res.status(201).json({
      id: newPet._id,
      name: newPet.name,
      age: newPet.age,
      breed: newPet.breed,
      description: newPet.description,
      image: newPet.image,
      status: newPet.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updatePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const updateData = { ...req.body };

    // Optional: Convert age to number if it's a string
    if (updateData.age) {
      const parsedAge = Number(updateData.age);
      if (isNaN(parsedAge)) {
        return res.status(400).json({ error: "Age must be a valid number." });
      }
      updateData.age = parsedAge;
    }

    const updatedPet = await Pet.findByIdAndUpdate(petId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.status(200).json({
      id: updatedPet._id,
      name: updatedPet.name,
      age: updatedPet.age,
      breed: updatedPet.breed,
      description: updatedPet.description,
      image: updatedPet.image,
      status: updatedPet.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);

    if (!deletedPet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    // 204 No Content – no body is returned
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
