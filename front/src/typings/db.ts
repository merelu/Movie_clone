import { number } from "yup/lib/locale";

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

export interface IMoveInfo {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanie[];
  production_countries: IProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IProductionCompanie {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IProductionCountries {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IMovieActor {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface IFavorite {
  createdAt: string;
  movieId: number;
  moviePost: string;
  movieRunTime: string;
  movieTitle: string;
  updatedAt: string;
  userFrom: string;
}
