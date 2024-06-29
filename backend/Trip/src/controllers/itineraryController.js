const axios = require('axios');

const getFlights = async (city, startDate, endDate, numPeople) => {
    try {
        const url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/SFO-sky/${city}-sky/${startDate}`;
        const options = {
            params: {
                inboundpartialdate: endDate
            },
            headers: {
                "X-RapidAPI-Key": "261c5895d4mshc41a587b49bb01ap18a48cjsn83eb753477fd",
                "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        };
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error('Error fetching flights:', error.message);
        throw error;
    }
};

const getHotels = async (city, checkinDate, checkoutDate, numPeople) => {
    try {
        const url = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search";
        const options = {
            params: {
                city,
                checkin_date: checkinDate,
                checkout_date: checkoutDate,
                guests: numPeople
            },
            headers: {
                "X-RapidAPI-Key": "261c5895d4mshc41a587b49bb01ap18a48cjsn83eb753477fd",
                "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com"
            }
        };
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error('Error fetching hotels:', error.message);
        throw error;
    }
};

const getAttractionsAndMeals = async (city) => {
    try {
        const url = `https://api.foursquare.com/v3/places/search?query=attractions&near=${city}`;
        const options = {
            headers: {
                "Authorization": "fsq3GiWWTn6tyurbMu+P7F1uep1ky3yUAK7L+sqkDXtA5nI="
            }
        };
        const response = await axios.get(url, options);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching attractions and meals:', error.message);
        throw error;
    }
};

exports.getItinerary = async (req, res) => {
    const { city, startDate, endDate, budget, numPeople } = req.body;

    try {
        const flights = await getFlights(city, startDate, endDate, numPeople);
        const hotels = await getHotels(city, startDate, endDate, numPeople);
        const attractions = await getAttractionsAndMeals(city);

        res.json({ flights, hotels, attractions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};