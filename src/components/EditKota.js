import React, { useState } from 'react';

const EditCity = ({ city, onEdit, onClose }) => {
  const [cityName, setCityName] = useState(city.city);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(city.id, cityName);
  };

  return (
    <div>
      <h2>Edit Kota</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">Update Kota</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCity;
