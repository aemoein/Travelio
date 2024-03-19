import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Modules/Home/Home';
import SignIn from './Modules/SignIn/SignIn';
import SignUp from './Modules/SignUp/SignUp';
import TermsAndConditions from './Modules/Learn/TermsAndConditionsPage'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        </Routes>
    </Router>
  );
}

export default App;


