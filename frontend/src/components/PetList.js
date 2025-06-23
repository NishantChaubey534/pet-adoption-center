import React from 'react';
import axios from 'axios';

const PetList = ({ pets, setEditablePet, fetchPets }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pets/${id}`);
      alert("Pet deleted");
      fetchPets();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (pet) => {
    setEditablePet(pet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h2>🐶 Available Pets for Adoption</h2>
      {pets.length === 0 ? (
        <p>No pets found.</p>
      ) : (
        pets.map((pet) => (
          <div key={pet._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{pet.name} ({pet.age} yrs)</h3>
            <p>Breed: {pet.breed}</p>
            <p>{pet.description}</p>
            {pet.image && <img src={pet.image} alt={pet.name} width="200" />}
            <br />
            <button onClick={() => handleEdit(pet)}>✏️ Edit</button>
            <button onClick={() => handleDelete(pet._id)} style={{ marginLeft: '10px' }}>🗑️ Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PetList;
