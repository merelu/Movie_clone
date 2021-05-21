import { IMoveInfo } from "@typings/db";
import { Button } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { FavoriteButtonContainer } from "./styles";
interface IFavoriteButtonProps {
  movieInfo: IMoveInfo;
  movieId: string;
}
function FavoriteButton({ movieInfo, movieId }: IFavoriteButtonProps) {
  useEffect(() => {
    axios
      .get(`/favorite/favoriteNumber/movieId/${movieId}`)
      .then((response) => {
        if (response.data.success) {
        } else {
          alert("숫자 정보를 가져오는데 실패 했습니다.");
        }
      });
  }, []);
  return (
    <FavoriteButtonContainer>
      <Button type="primary" ghost>
        Favorite
      </Button>
    </FavoriteButtonContainer>
  );
}

export default FavoriteButton;
