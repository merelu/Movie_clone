import GridCards from "@components/GridCards";
import MainImage from "@components/MainImage";
import MovieInfoTable from "@components/MovieInfoTable";
import { IMoveInfo, IMovieActor } from "@typings/db";
import { Button, Row } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "src/config";

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const [movieInfo, setMovieInfo] = useState<IMoveInfo>();
  const [movieCrew, setMovieCrew] = useState<IMovieActor[]>();
  const [viewActor, setViewActor] = useState(false);

  const toggleActorViewButton = useCallback(() => {
    setViewActor((prev) => !prev);
  }, []);
  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    axios.get(endpointInfo).then((response) => {
      setMovieInfo(response.data);
    });

    axios.get(endpointCrew).then((response) => {
      console.log(response.data);
      setMovieCrew(response.data.cast);
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" ghost>
            Favorite
          </Button>
        </div>
        {/* Movie Info */}
        {movieInfo && <MovieInfoTable movieInfo={movieInfo} />}
        <br />

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button type="primary" shape="round" onClick={toggleActorViewButton}>
            Toggle Actor view
          </Button>
        </div>

        {viewActor ? (
          <div style={{ width: "85%", margin: "1rem auto" }}>
            <h2>Actors</h2>
            <hr />
            <Row gutter={[16, 16]}>
              {movieCrew &&
                movieCrew.map((crew, index) => (
                  <React.Fragment key={index}>
                    <GridCards
                      image={
                        crew.profile_path
                          ? `${IMAGE_BASE_URL}w500${crew.profile_path}`
                          : "/img/image-not-found-fix.jpg"
                      }
                      contentId={crew.id}
                      contentName={crew.name}
                      content="actor"
                    ></GridCards>
                  </React.Fragment>
                ))}
            </Row>
          </div>
        ) : (
          <br />
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
