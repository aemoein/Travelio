
import React from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem } from '@mui/material';

const ExploreSection = ({
    selectedCategory,
    handleCategoryChange,
    activeButtonStyles,
    buttonStyles,
    searchTerm,
    handleSearchChange,
    selectedRegion,
    handleRegionChange,
    selectedContinent,
    handleContinentChange,
}) => {
    return (
        <Box
            sx={{ 
                maxWidth: '100%',
                width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }, 
                ml: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw' }
            }} 
        >
            <Box 
                sx={{ 
                    maxWidth: '100%',
                    width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }, 
                    //ml: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw' }
                }}
            >
                <Typography 
                    align="left" 
                    sx={{
                        fontFamily: 'Merriweather',
                        fontWeight: '900',
                        fontSize: { xs: '16px', sm: '24px', md: '28px', lg: '28px' },
                        lineHeight: '1.2',
                        width: 'fit-content',
                        backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    Explore
                </Typography>
                <Typography 
                    gutterBottom 
                    sx={{ 
                        fontSize: { xs: '28px', sm: '32px', md: '38px', lg: '42px' }, 
                        fontFamily: 'Poppins', 
                        fontWeight: '600' 
                    }}
                >
                    Destinations
                </Typography>
            </Box>
            <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                gap={2} // Adds 16px spacing between buttons
                sx={{ 
                    width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' },
                    //mx: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw' }
                }}
            >
                <Button
                    sx={selectedCategory === 'countries' ? activeButtonStyles : buttonStyles}
                    onClick={() => handleCategoryChange('countries')}
                >
                    COUNTRIES
                </Button>
                <Button
                    sx={selectedCategory === 'cities' ? activeButtonStyles : buttonStyles}
                    onClick={() => handleCategoryChange('cities')}
                >
                    CITIES
                </Button>
                <Button
                    sx={selectedCategory === 'natural' ? activeButtonStyles : buttonStyles}
                    onClick={() => handleCategoryChange('natural')}
                >
                    NATURE
                </Button>
            </Box>
            <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                sx={{ 
                    width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }, 
                    //mx: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw' },
                    mb: 2,
                }}
            >
                <TextField
                    label="Search destinations"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{ sx: { borderRadius: '40px' } }}
                    InputLabelProps={{ sx: { pl: 1.7 } }}
                    sx={{ maxWidth: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }}}
                /> 
            </Box>
            <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                sx={{ 
                    width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }, 
                    //mx: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw' },
                }}
            >
                <Select
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                    sx={{ 
                        mb: 2, 
                        mr: 2, 
                        borderRadius: '40px', 
                        '& .MuiSelect-select': { paddingLeft: '1.7em' }, 
                    }}
                >
                    <MenuItem value="">All Regions</MenuItem>
                    <MenuItem value="North America">North America</MenuItem>
                    <MenuItem value="Central America & Caribbean">Central America & Caribbean</MenuItem>
                    <MenuItem value="South America">South America</MenuItem>
                    <MenuItem value="Northern Europe">Northern Europe</MenuItem>
                    <MenuItem value="Western Europe">Western Europe</MenuItem>
                    <MenuItem value="Southern Europe">Southern Europe</MenuItem>
                    <MenuItem value="Eastern Europe">Eastern Europe</MenuItem>
                    <MenuItem value="Russia and Caucasus">Russia and Caucasus</MenuItem>
                    <MenuItem value="Central Asia">Central Asia</MenuItem>
                    <MenuItem value="Middle East">Middle East</MenuItem>
                    <MenuItem value="North Africa">North Africa</MenuItem>
                    <MenuItem value="West Africa">West Africa</MenuItem>
                    <MenuItem value="Central Africa">Central Africa</MenuItem>
                    <MenuItem value="East Africa">East Africa</MenuItem>
                    <MenuItem value="Southern Africa">Southern Africa</MenuItem>
                    <MenuItem value="South Asia">South Asia</MenuItem>
                    <MenuItem value="Southeast Asia">Southeast Asia</MenuItem>
                    <MenuItem value="East Asia">East Asia</MenuItem>
                    <MenuItem value="Oceania">Oceania</MenuItem>
                    <MenuItem value="The Arctic and Antarctica">The Arctic and Antarctica</MenuItem>
                </Select>
                <Select
                    value={selectedContinent}
                    onChange={handleContinentChange}
                    variant="outlined"
                    fullWidth
                    displayEmpty
                    sx={{ 
                        mb: 2, 
                        borderRadius: '40px', 
                        '& .MuiSelect-select': { paddingLeft: '1.7em' }, 
                    }}
                >
                    <MenuItem value="">All Continents</MenuItem>
                    <MenuItem value="North America">North America</MenuItem>
                    <MenuItem value="South America">South America</MenuItem>
                    <MenuItem value="Europe">Europe</MenuItem>
                    <MenuItem value="Asia">Asia</MenuItem>
                    <MenuItem value="Africa">Africa</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="Antarctica">Antarctica</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

export default ExploreSection;