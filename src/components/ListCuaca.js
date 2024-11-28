import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../App.css'; // Import file CSS

Modal.setAppElement('#root');

function ListCuaca() {
    const [cities, setCities] = useState([]); // Daftar kota
    const [newCity, setNewCity] = useState(''); // Input kota baru
    const [selectedCity, setSelectedCity] = useState(null); // Kota yang dipilih
    const [modalIsOpen, setModalIsOpen] = useState(false); // Modal status
    const [editMode, setEditMode] = useState(false); // Mode edit
    const [editedCityData, setEditedCityData] = useState({
        city: '',
        temperature: '',
        description: ''
    });

    const [loading, setLoading] = useState(true); // Status loading

    useEffect(() => {
        fetchCities();
    }, []); // Mengambil data saat komponen dimuat

    const fetchCities = async () => {
        try {
            const response = await axios.get('http://110.239.71.90:5000/weather');
            setCities(response.data);
            setLoading(false); // Setelah data diterima, set loading ke false
        } catch (error) {
            console.error("Error fetching cities:", error);
            setLoading(false); // Jika ada error, tetap set loading ke false
        }
    };

    const addCity = async () => {
        if (newCity) {
            try {
                await axios.post('http://110.239.71.90:5000/weather', { city: newCity });
                setNewCity('');
                fetchCities();
            } catch (error) {
                console.error("Error adding city:", error);
            }
        }
    };

    const openModal = (city) => {
        setSelectedCity(city);
        setEditedCityData(city);
        setModalIsOpen(true);
        setEditMode(false);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://110.239.71.90:5000/weather/${selectedCity.id}`, editedCityData);
            fetchCities();
            closeModal();
        } catch (error) {
            console.error("Error updating city data:", error);
        }
    };

    // Jika data masih loading, tampilkan loading spinner
    if (loading) {
        return <div>Loading cities...</div>;
    }

    return (
        <div className="background">
            <div className="content">
                <h1 className="title">Climatic Map</h1>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Nama Lokasi"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={addCity} className="add-button">+</button>
                </div>
                <div className="city-list">
                    {cities.map((city) => (
                        <div key={city.id} className="city-item" onClick={() => openModal(city)}>
                            {city.city}
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h3 style={{ color: '#004d40', textAlign: 'center', marginBottom: '20px' }}>Cuaca Terkini</h3>
                {selectedCity && !editMode && (
                    <div>
                        <p><strong>Kota:</strong> {selectedCity.city}</p>
                        <p><strong>Suhu:</strong> {selectedCity.temperature} °C</p>
                        <p><strong>Deskripsi:</strong> {selectedCity.description}</p>
                        <button onClick={handleEdit} className="edit-button">Edit</button>
                    </div>
                )}
                {editMode && (
                    <div>
                        <input
                            type="text"
                            placeholder="Kota"
                            value={editedCityData.city}
                            onChange={(e) => setEditedCityData({ ...editedCityData, city: e.target.value })}
                            className="modal-input"
                        />
                        <input
                            type="text"
                            placeholder="Suhu"
                            value={editedCityData.temperature}
                            onChange={(e) => setEditedCityData({ ...editedCityData, temperature: e.target.value })}
                            className="modal-input"
                        />
                        <input
                            type="text"
                            placeholder="Deskripsi"
                            value={editedCityData.description}
                            onChange={(e) => setEditedCityData({ ...editedCityData, description: e.target.value })}
                            className="modal-input"
                        />
                        <button onClick={handleEditSubmit} className="submit-button">Submit</button>
                    </div>
                )}
                <button onClick={closeModal} className="close-button">Close</button>
            </Modal>
        </div>
    );
}

export default ListCuaca;
