import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '64px', padding: '20px' }}>
        <h2>Welcome to the Home Page</h2>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
