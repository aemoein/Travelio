import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './Modules/Home/Home';
import SignIn from './Modules/SignIn/SignIn';
import SignUp from './Modules/SignUp/SignUp';
import TermsAndConditions from './Modules/Learn/TermsAndConditionsPage';
import SignUpInfo from './Modules/SignUp/SignUpInfo';
import Preferences from './Modules/SignUp/Preferences';
import PreferenceSelector from './Modules/SignUp/PreferenceSelector';
import RecommendedPreferences from './Modules/SignUp/RecPrefrences';
import Profile from './Modules/Profile/Profile';
import Quiz from './Modules/Quiz/Quiz';
import Destinations from './Modules/Destinations/Destinations';
import City from './Modules/Destinations/City';
import FlightSearchForm from './Modules/Itinerary/Flights';
import HotelsPage from './Modules/Itinerary/Hotels';
import Itinerary from './Modules/Itinerary/Itinerary';
import Review from './Modules/Itinerary/Review';

const AssetImage = () => {
  const { '*': path } = useParams();
  const imageSrc = `${process.env.PUBLIC_URL}/Assets/${path}`;

  return (
    <div>
      <img src={imageSrc} alt={path} />
      {/* Conditional rendering for image not found */}
      {!imageSrc.includes('Assets/') && <p>Image not found</p>}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route path="/signUpInfo" element={<SignUpInfo />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/preferences/select" element={<PreferenceSelector />} />
        <Route path="/preferences/recommended" element={<RecommendedPreferences />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/city/:id" element={<City />} />
        <Route path="/planning" element={<FlightSearchForm />} />
        <Route path="/assets/*" element={<AssetImage />} />
        <Route path="/planning/hotels" element={<HotelsPage />} />
        <Route path="/planning/itinerary" element={<Itinerary />} />
        <Route path="/planning/review" element={<Review />} />
      
      </Routes>
    </Router>
  );
}

export default App;