import React, { useState } from 'react';

const AddCity = ({ onAdd }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(city);
    setCity('');
  };

  return (
    <div>
      <h2>Tambah Kota</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Kota"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Tambah Kota</button>
      </form>
    </div>
  );
};

export default AddCity;
