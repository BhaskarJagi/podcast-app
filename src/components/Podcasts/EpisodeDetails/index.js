import React from "react";
import "./styles.css";
import Button from "../../common/Button";

function EpisodeDetails({ index, title, description, audioFile, onClick }) {
  return (
    <div className="episode-details">
      <h2>
        {index}. {title}
      </h2>
      <p
        style={{ marginLeft: "1.5rem", textAlign: "left" }}
        className="podcast-description"
      >
        {description}
      </p>
      <Button
        style={{ width: "200px", marginLeft: "1.5rem" }}
        text={"play"}
        onClick={() => onClick(audioFile)}
      />
    </div>
  );
}

export default EpisodeDetails;
