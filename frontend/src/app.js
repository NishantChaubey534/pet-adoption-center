import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetForm from './components/PetForm';
import PetList from './components/PetList';

function App() {
  const [editablePet, setEditablePet] = useState(null);
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/pets');
      setPets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pet Adoption Center</h1>
      <PetForm
        editablePet={editablePet}
        setEditablePet={setEditablePet}
        fetchPets={fetchPets}
      />
      <hr />
      <PetList
        pets={pets}
        setEditablePet={setEditablePet}
        fetchPets={fetchPets}
      />
    </div>
  );
}

export default App;
