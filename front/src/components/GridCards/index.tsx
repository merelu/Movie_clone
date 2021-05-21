import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import { CardImage, ImageContainer } from "./styles";

type ContentType = "movie" | "actor";

interface IGridCardsProps {
  image: string;
  contentId: number;
  contentName: string;
  content: ContentType;
}
function GridCards({
  image,
  contentId,
  contentName,
  content,
}: IGridCardsProps) {
  return (
    <Col lg={6} md={8} xs={24}>
      <ImageContainer>
        <Link to={`/${content}/${contentId}`}>
          <CardImage src={image} alt={contentName} />
        </Link>
      </ImageContainer>
    </Col>
  );
}

export default GridCards;
