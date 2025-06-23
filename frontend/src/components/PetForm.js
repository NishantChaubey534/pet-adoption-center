import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetForm = ({ editablePet, setEditablePet, fetchPets }) => {
  const [pet, setPet] = useState({
    name: '',
    age: '',
    breed: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (editablePet) {
      setPet(editablePet);
    } else {
      setPet({
        name: '',
        age: '',
        breed: '',
        description: '',
        image: ''
      });
    }
  }, [editablePet]);

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editablePet) {
        await axios.put(`http://localhost:5000/api/pets/${editablePet._id}`, pet);
        alert("Pet updated!");
      } else {
        await axios.post('http://localhost:5000/api/pets', pet);
        alert("Pet added!");
      }
      fetchPets();
      setEditablePet(null);
      setPet({
        name: '',
        age: '',
        breed: '',
        description: '',
        image: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={pet.name} onChange={handleChange} required />
      <input name="age" placeholder="Age" type="number" value={pet.age} onChange={handleChange} required />
      <input name="breed" placeholder="Breed" value={pet.breed} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={pet.description} onChange={handleChange} />
      <input name="image" placeholder="Image URL" value={pet.image} onChange={handleChange} />
      <button type="submit">{editablePet ? "Update Pet" : "Add Pet"}</button>
    </form>
  );
};

export default PetForm;
