import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Modules/Home/Home';
import SignIn from './Modules/SignIn/SignIn';
import SignUp from './Modules/SignUp/SignUp';
import TermsAndConditions from './Modules/Learn/TermsAndConditionsPage';
import SignUpInfo from './Modules/SignUp/SignUpInfo';
import Preferences from './Modules/SignUp/Preferences'
import PreferenceSelector from './Modules/SignUp/PreferenceSelector'
import RecommendedPreferences from './Modules/SignUp/RecPrefrences'
import Profile from './Modules/Profile/Profile';
import Quiz from './Modules/Quiz/Quiz';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/signUpInfo" element={<SignUpInfo />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/preferences/select" element={<PreferenceSelector />} />
          <Route path="/preferences/recommended" element={<RecommendedPreferences />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
    </Router>
  );
}

export default App;


