import styled from "@emotion/styled";

interface IMainImageProps {
  image: string;
}
export const MainImageContainer = styled.div<IMainImageProps>`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 39%,
      rgba(0, 0, 0, 0) 41%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(${(props) => props.image});
  height: 500px;
  background-size: 100%, cover;
  background-position: center, center;
  width: 100%;
  position: relative;
`;

export const MainMovieContent = styled.div`
  position: absolute;
  max-width: 500px;
  bottom: 2rem;
  margin-left: 2rem;
`;

export const MainMovieTitle = styled.h2`
  color: white;
`;
export const MainMovieText = styled.p`
  color: white;
  font-size: 1rem;
`;
