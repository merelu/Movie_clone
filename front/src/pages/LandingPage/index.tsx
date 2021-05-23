import GridCards from "@components/GridCards";
import { IMovie } from "@typings/db";
import { Row } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "src/config";
import MainImage from "@components/MainImage";
import { LandingPageContainer, ContentContainer } from "./styles";

function LandingPage() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [mainMovie, setMainMovie] = useState<IMovie>();
  const [currentPage, setCurrentPage] = useState(0);

  const LoadMoreItems = useCallback(() => {
    console.log("load");
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      currentPage + 1
    }`;
    axios.get(endpoint).then((response) => {
      console.log(response.data);
      setMovies((prev) => prev.concat(response.data.results));
      setCurrentPage((prev) => prev + 1);
    });
  }, [currentPage]);

  const infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      LoadMoreItems();
    }
  }, [LoadMoreItems]);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    axios.get(endpoint).then((response) => {
      console.log(response.data);
      setMovies((prev) => prev.concat(response.data.results));
      setCurrentPage(response.data.page);
      setMainMovie(response.data.results[0]);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, [infiniteScroll]);

  return (
    <div>
      <LandingPageContainer>
        {/* Main Image */}

        {mainMovie && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${mainMovie.backdrop_path}`}
            title={mainMovie.original_title}
            text={mainMovie.overview}
          />
        )}
        <ContentContainer>
          <h2>Movies by latest</h2>
          <hr />
          {/* Movie Grid Cards */}
          <Row gutter={[16, 16]}>
            {movies &&
              movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                        : "/img/image-not-found-fix.jpg"
                    }
                    contentId={movie.id}
                    contentName={movie.original_title}
                    content="movie"
                  />
                </React.Fragment>
              ))}
          </Row>
        </ContentContainer>
      </LandingPageContainer>
    </div>
  );
}

export default LandingPage;
