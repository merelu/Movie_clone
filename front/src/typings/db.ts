export interface IUser {
  _id?: string;
  isAuth?: boolean;
  isAdmin?: boolean;
  name?: string;
  email?: string;
  lastname?: string;
  role?: boolean;
  image?: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
