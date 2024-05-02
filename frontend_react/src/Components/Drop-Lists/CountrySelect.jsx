import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CountrySelect = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        labelId="country-select-label"
        id="country-select"
        value={selectedCountry}
        onChange={handleChange}
        label="Country"
      >
        {countries.map((country) => (
          <MenuItem key={country.value} value={country.value}>
            {country.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelect;