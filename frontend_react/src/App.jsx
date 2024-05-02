import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Modules/Home/Home';
import SignIn from './Modules/SignIn/SignIn';
import SignUp from './Modules/SignUp/SignUp';
import TermsAndConditions from './Modules/Learn/TermsAndConditionsPage';
import SignUpInfo from './Modules/SignUp/SignUpInfo';
import Preferences from './Modules/SignUp/Preferences'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/signUpInfo/:username" element={<SignUpInfo />} />
          <Route path="/preferences/:username" element={<Preferences />} />
        </Routes>
    </Router>
  );
}

export default App;


