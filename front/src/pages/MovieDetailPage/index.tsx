import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_KEY, API_URL } from "src/config";

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const [movieInfo, setMovieInfo] = useState([]);

  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    axios.get(endpointInfo).then((response) => {
      setMovieInfo((prev) => prev.concat(response.data));
    });
  }, [movieId]);
  return (
    <div>
      {/* Header */}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Info */}

        <br />
        {/* Actors Grid */}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button>Toggle Actor view</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
