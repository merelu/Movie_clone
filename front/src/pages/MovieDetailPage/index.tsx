import MainImage from "@components/MainImage";
import MovieInfoTable from "@components/MovieInfoTable";
import { IMoveInfo } from "@typings/db";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "src/config";

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const [movieInfo, setMovieInfo] = useState<IMoveInfo>();

  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    axios.get(endpointInfo).then((response) => {
      console.log(response.data);
      setMovieInfo(response.data);
    });
  }, [movieId]);
  return (
    <div>
      {/* Header */}
      {movieInfo && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${movieInfo.backdrop_path}`}
          title={movieInfo.title}
          text={movieInfo.overview}
        />
      )}
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Info */}
        {movieInfo && <MovieInfoTable movieInfo={movieInfo} />}
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
