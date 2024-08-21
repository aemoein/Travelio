import React, { useState } from 'react';
import axios from 'axios';
import FlightCard from '../../Components/Card/FlightCard';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import citiesData from '../../Components/Data/airports.json';
import apiUrl from '../../Config/config';

const FlightSearchForm = () => {
    const [formData, setFormData] = useState({
        originLocationCode: '',
        destinationLocationCode: '',
        departureDate: '',
        returnDate: '',
        adults: 1,
        children: 0,
        travelClass: 'ECONOMY',
        nonStop: false,
    });
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e, value, name) => {
        console.log(`handleChange called with name: ${name}, value:`, value);
        if (value) {
            // Find the city object in citiesData that matches the selected value
            const selectedCity = citiesData.find(city => city.city === value.city);
    
            if (selectedCity) {
                console.log(`Selected city:`, selectedCity);
                setFormData(prevState => ({
                    ...prevState,
                    [name]: selectedCity.Airport
                }));
            }
        } else {
            console.log(`Clearing ${name} field`);
            // Clear the field if value is null (e.g., user clears selection)
            setFormData(prevState => ({
                ...prevState,
                [name]: ''
            }));
        }
    };    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        setLoading(true);
        setError(null);

        const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults, children, travelClass, nonStop } = formData;

        // Check if either originLocationCode or destinationLocationCode is empty
        if (!originLocationCode || !destinationLocationCode) {
            setError("Please select both origin and destination locations.");
            setLoading(false);
            return;
        }

        const params = {
            originLocationCode,
            destinationLocationCode,
            departureDate,
            returnDate,
            adults,
            children,
            travelClass,
            nonStop,
        };

        try {
            const response = await axios.get(`${apiUrl}/trip/flights`, { params });
            console.log('API response:', response.data);
            setFlights(response.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ width: '80vw', ml: '10vw', mr: '10vw', mt: 10, minHeight: '100vh'}}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography align="left" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '50px'}}>
                            Flight Search
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={citiesData}
                                    getOptionLabel={(option) => option.city}
                                    onChange={(e, value) => handleChange(e, value, "originLocationCode")}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Origin"
                                            name="originLocationCode"
                                            value={formData.originLocationCode}
                                            required
                                        />
                                    )}
                                    getOptionSelected={(option, value) => option.city === value.city}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <Autocomplete
                                    fullWidth
                                    options={citiesData}
                                    getOptionLabel={(option) => option.city}
                                    onChange={(e, value) => handleChange(e, value, "destinationLocationCode")}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Destination"
                                            name="destinationLocationCode"
                                            value={formData.destinationLocationCode}
                                            required
                                        />
                                    )}
                                    getOptionSelected={(option, value) => option.city === value.city}
                                />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Departure Date"
                                        name="departureDate"
                                        value={formData.departureDate}
                                        onChange={(e) => setFormData(prevState => ({ ...prevState, departureDate: e.target.value }))}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Return Date"
                                        name="returnDate"
                                        value={formData.returnDate}
                                        onChange={(e) => setFormData(prevState => ({ ...prevState, returnDate: e.target.value }))}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Adults"
                                        name="adults"
                                        value={formData.adults}
                                        onChange={(e) => setFormData(prevState => ({ ...prevState, adults: e.target.value }))}
                                        inputProps={{
                                            min: "1",
                                            max: "10",
                                        }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Children"
                                        name="children"
                                        value={formData.children}
                                        onChange={(e) => setFormData(prevState => ({ ...prevState, children: e.target.value }))}
                                        inputProps={{
                                            min: "0",
                                            max: "10",
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Travel Class</InputLabel>
                                        <Select
                                            value={formData.travelClass}
                                            onChange={(e) => setFormData(prevState => ({ ...prevState, travelClass: e.target.value }))}
                                            name="travelClass"
                                            required
                                        >
                                            <MenuItem value="ECONOMY">Economy</MenuItem>
                                            <MenuItem value="BUSINESS">Business</MenuItem>
                                            <MenuItem value="FIRST">First Class</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel 
                                        sx={{ fontFamily: 'Poppins', fontWeight: '900' }}
                                        control={
                                            <Checkbox
                                                checked={formData.nonStop}
                                                onChange={(e) => setFormData(prevState => ({ ...prevState, nonStop: e.target.checked }))}
                                                name="nonStop"
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}
                                            />
                                        }
                                        label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: '900' }}>Non-Stop Flights Only</Typography>}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        fullWidth
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: '700',
                                            fontSize: '25px',
                                            borderRadius: '20px',
                                            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                                        }}
                                    >
                                        {loading ? 'Loading...' : 'Search Flights'}
                                    </Button>
                                </Grid>
                                {error && (
                                    <Grid item xs={12}>
                                        <Typography color="error" align="center">
                                            {error}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </form>
                    </Grid>
                    {flights?.length > 0 && (
                        <Grid item xs={12}>
                            <Typography align="left" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px'}}>
                                Flight Results:
                            </Typography>
                            <Grid container spacing={2}>
                                {flights.map((flight, index) => (
                                    <Grid item xs={10} sm={12} md={12} lg={6} xl={6} key={index}>
                                        <FlightCard
                                            flight={flight}
                                            cityName={formData.destinationLocationCode}
                                            arrivalDate={formData.departureDate}
                                            departureDate={formData.returnDate}
                                            adults={formData.adults}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <Footer/>
        </>
    );
};

export default FlightSearchForm;