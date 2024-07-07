import { Link } from "react-router-dom";

import "./Challenge.css";

const ChallengeType = [
  {
    name: "Photo",
    photo:
      "https://drprem.com/travel/wp-content/uploads/sites/53/2013/08/Asian-photographer-travel-in-old-temple-in-Bali.jpg",
    link: "/local/photochallenge",
  },
  {
    name: "Puzzle",
    photo:
      "https://st.depositphotos.com/1005233/4708/i/450/depositphotos_47084153-stock-photo-young-attractive-tourist-reading-map.jpg",
    link: "/local/puzzle",
  },
];

export default function LocalChoose() {
  return (
    <div className="bodychallenge">
      <div>
        <h1>Choose the type of the challenge</h1>
        <div className="grid-container">
          {ChallengeType.map((choice, index) => (
            <div key={index} className="grid-item">
              <Link key={index} to={choice.link} className="grid-item">
                <img src={choice.photo} alt={choice.name} />
                <h2>{choice.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
