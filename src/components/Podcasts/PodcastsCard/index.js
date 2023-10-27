import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function PodcastCard({ id, title, displayImage }) {
  return (
    <Link to={`/podcasts/${id}`}>
      <div className="podcast-card">
        <img className="podcast-display-image" src={displayImage} />
        <p className="podcast-title">{title}</p>
      </div>
    </Link>
  );
}

export default PodcastCard;
