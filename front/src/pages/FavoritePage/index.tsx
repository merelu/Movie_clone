import { IFavorite } from "@typings/db";
import { Button } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FavoriteTable, Favoritetd, Favoriteth, Favoritetr } from "./styles";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "src/config";
function FavoritePage() {
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const onClickDelete = useCallback((movieId, userFrom) => {
    axios
      .delete(`/api/favorite/removeFromFavorite`, {
        data: {
          movieId,
          userFrom,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setFavorites((prev) => prev.filter((v) => v.movieId !== movieId));
        } else {
          alert("favorite item을 삭제하는데 실패했습니다.");
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `/api/favorite/favoriteMovies/userId/${window.localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        if (response.data.success) {
          setFavorites((prev) => response.data.favorites);
        } else {
          alert("영화 정보를 가져오는데 실패했습니다.");
        }
      });
  }, []);

  const renderCards = favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img
            src={`${IMAGE_BASE_URL}w300${favorite.moviePost}`}
            alt={favorite.moviePost}
          />
        ) : (
          "/img/image-not-found-fix.jpg"
        )}
      </div>
    );
    return (
      <Favoritetr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <Favoritetd>{favorite.movieTitle}</Favoritetd>
        </Popover>
        <Favoritetd>{favorite.movieRunTime} mins</Favoritetd>
        <Favoritetd>
          <Button
            type="primary"
            ghost
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </Button>
        </Favoritetd>
      </Favoritetr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />

      <FavoriteTable>
        <thead>
          <Favoritetr>
            <Favoriteth>Movie Title</Favoriteth>
            <Favoriteth>Movie Runtime</Favoriteth>
            <Favoriteth>Remove from favorites</Favoriteth>
          </Favoritetr>
        </thead>
        <tbody>{renderCards}</tbody>
      </FavoriteTable>
    </div>
  );
}

export default FavoritePage;
