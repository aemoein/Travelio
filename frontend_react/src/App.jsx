import React, { useState, useEffect } from 'react';
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
import SocialFeed from './Modules/Social/SocialFeed';
import CreatePost from './Modules/Social/CreatePost';
import Search from './Modules/Social/Search';
import ExploreFeed from './Modules/Social/ExploreFeed';
import ChallengePage from './Modules/Challenge/ChallengePage';
import Local from './Modules/Challenge/Local';
import Global from './Modules/Challenge/Global';
import LocalChoose from './Modules/Challenge/LocalChoose';
import ChallengeChoose from './Modules/Challenge/GlobalChoose';
import Puzzle from './Modules/Challenge/Puzzle';
import ChallengeGame from './Modules/Challenge/ChallengeGame';
import ChallengeProfile from './Modules/Challenge/ChallengeProfile';
import AchievemntsRewards from './Modules/Achievements/AchievemntsRewards';

const AssetImage = () => {
  const { '*': path } = useParams();
  const imageSrc = `/assets/${path}`;

  return (
    <div>
      <img src={imageSrc} alt={path} />
      {!imageSrc.includes('assets/') && <p>Image not found</p>}
    </div>
  );
};

const AssetList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('/api/files')
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(error => console.error('Error fetching files:', error));
  }, []);

  return (
    <div>
      <h1>Files in Assets Directory</h1>
      <ul>
        {files.map(file => (
          <li key={file}>{file}</li>
        ))}
      </ul>
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
        <Route path="/file-list" element={<AssetList />} />
        <Route path="/planning/hotels" element={<HotelsPage />} />
        <Route path="/planning/itinerary" element={<Itinerary />} />
        <Route path="/planning/review" element={<Review />} />
        <Route path="/social" element={<SocialFeed />} />
        <Route path="/social/create" element={<CreatePost />} />
        <Route path="/social/search" element={<Search />} />
        <Route path="/social/profile" element={<Profile />} />
        <Route path="/social/explore" element={<ExploreFeed />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/local/:type" element={<Local />} />
        <Route path="/global/:type" element={<Global />} />
        <Route path="/local/choose" element={<LocalChoose />} />
        <Route path="/global/choose" element={<ChallengeChoose />} />
        <Route path="/challengegame/puzzle" element={<Puzzle />} />
        <Route path="/challengegame/:location/:type/:city" element={<ChallengeGame />} />
        <Route path="/User/:user" element={<ChallengeProfile />} />
        <Route path="/achievementsandrewards" element={<AchievemntsRewards />} />
      </Routes>
    </Router>
  );
}

export default App;