import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '64px', padding: '20px' }}>
        <h2>Welcome to the Home Page</h2>
      </div>
    </div>
  );
};

export default Home;
