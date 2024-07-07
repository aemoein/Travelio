import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Challenge.css";

export default function Local() {
  const { type } = useParams(); // Get the type parameter from the URL
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        let response;
        if (type === "photochallenge") {
          response = await fetch("http://localhost:5005/api/cc/photo");
        } else if (type === "puzzle") {
          response = await fetch("http://localhost:5005/api/cc/puzzle");
        } else {
          throw new Error("Invalid type");
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bodychallenge">
      <div className="App">
        <h1>
          🔭Explore the Wonders of the World - Choose Your Next Adventure!🗺️
        </h1>
        <div className="grid-container">
          {cities.map((city, index) => (
            <div key={index} className="grid-item">
              <Link
                key={index}
                to={`/challengegame/local/${type}/${city.city}`}
                className="grid-item"
              >
                <img src={city.photoLink} alt={city.city} />
                <h2>{city.city}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
