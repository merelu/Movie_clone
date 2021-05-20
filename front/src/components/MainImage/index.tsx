import React from "react";
import {
  MainImageContainer,
  MainMovieContent,
  MainMovieText,
  MainMovieTitle,
} from "./styles";

interface IMainImageProps {
  image: string;
  title: string;
  text: string;
}
function MainImage({ image, title, text }: IMainImageProps) {
  return (
    <MainImageContainer image={image}>
      <div>
        <MainMovieContent>
          <MainMovieTitle>{title}</MainMovieTitle>
          <MainMovieText>{text}</MainMovieText>
        </MainMovieContent>
      </div>
    </MainImageContainer>
  );
}

export default MainImage;
