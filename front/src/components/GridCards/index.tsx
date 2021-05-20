import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import { CardImage, ImageContainer } from "./styles";
interface IGridCardsProps {
  image: string;
  movieId: number;
  movieName: string;
}
function GridCards({ image, movieId, movieName }: IGridCardsProps) {
  return (
    <Col lg={6} md={8} xs={24}>
      <ImageContainer>
        <Link to={`/movie/${movieId}`}>
          <CardImage src={image} alt={movieName} />
        </Link>
      </ImageContainer>
    </Col>
  );
}

export default GridCards;
