import React, { useState } from 'react';
import axios from 'axios';

const Itinerary = () => {
    const [formData, setFormData] = useState({
        city: '',
        startDate: '',
        endDate: '',
        budget: '',
        numPeople: 1,
    });

    const [itinerary, setItinerary] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3003/api/itinerary', formData);
        setItinerary(response.data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                <select name="budget" value={formData.budget} onChange={handleChange} required>
                    <option value="">Select Budget</option>
                    <option value="low">Low</option>
                    <option value="mid">Mid</option>
                    <option value="high">High</option>
                    <option value="custom">Custom</option>
                </select>
                <input type="number" name="numPeople" value={formData.numPeople} onChange={handleChange} min="1" required />
                <button type="submit">Get Itinerary</button>
            </form>
            {itinerary && (
                <div>
                    <h2>Flights</h2>
                    {itinerary.flights.map((flight, index) => (
                        <div key={index}>
                            <p>{flight}</p>
                            <a href={flight.link} target="_blank" rel="noopener noreferrer">Book</a>
                        </div>
                    ))}
                    <h2>Hotels</h2>
                    {itinerary.hotels.map((hotel, index) => (
                        <div key={index}>
                            <p>{hotel}</p>
                            <a href={hotel.link} target="_blank" rel="noopener noreferrer">Book</a>
                        </div>
                    ))}
                    <h2>Attractions</h2>
                    {itinerary.attractions.map((attraction, index) => (
                        <div key={index}>
                            <p>{attraction.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Itinerary;