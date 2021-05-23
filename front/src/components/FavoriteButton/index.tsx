import { IMoveInfo } from "@typings/db";
import { Button } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FavoriteButtonContainer } from "./styles";
interface IFavoriteButtonProps {
  userFrom: string | null;
  movieInfo: IMoveInfo;
  movieId: string;
}
function FavoriteButton({
  userFrom,
  movieInfo,
  movieId,
}: IFavoriteButtonProps) {
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const onClickFavorite = useCallback(() => {
    if (favorited) {
      axios
        .delete("/api/favorite/removeFromFavorite", {
          data: { movieId, userFrom },
        })
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber((prev) => prev - 1);
            setFavorited((prev) => !prev);
          } else {
            alert("Favorite 리스트에서 지우는 걸 실패했습니다.");
          }
        });
    } else {
      axios
        .post("/api/favorite/addToFavorite", {
          movieId,
          userFrom,
          movieTitle: movieInfo.title,
          moviePost: movieInfo.poster_path,
          movieRunTime: movieInfo.runtime,
        })
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber((prev) => prev + 1);
            setFavorited((prev) => !prev);
          } else {
            alert("Favorite 리스트에서 추가하는 걸 실패했습니다.");
          }
        });
    }
  }, [
    favorited,
    movieId,
    movieInfo.poster_path,
    movieInfo.runtime,
    movieInfo.title,
    userFrom,
  ]);

  useEffect(() => {
    axios
      .get(`/api/favorite/favoriteNumber/movieId/${movieId}`)
      .then((response) => {
        if (response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert("숫자 정보를 가져오는데 실패 했습니다.");
        }
      });
    axios
      .post("/api/favorite/favorited", { movieId, userFrom })
      .then((response) => {
        setFavorited(response.data.favorited);
        if (response.data.success) {
        } else {
          alert("정보를 가져오는데 실패했습니다.");
        }
      });
  }, [movieId, userFrom]);
  return (
    <FavoriteButtonContainer>
      <Button type="primary" ghost onClick={onClickFavorite}>
        {favorited ? "Not Favorite " : "Add to Favorite "}
        {favoriteNumber}
      </Button>
    </FavoriteButtonContainer>
  );
}

export default FavoriteButton;
