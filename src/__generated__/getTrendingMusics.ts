/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TokenStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getTrendingMusics
// ====================================================

export interface getTrendingMusics_getTrendingMusics_musics_token {
  __typename: "Token";
  stock: number | null;
  totalStock: number;
  recentPrice: number | null;
  initialPrice: number;
  status: TokenStatus;
}

export interface getTrendingMusics_getTrendingMusics_musics {
  __typename: "Music";
  id: number;
  title: string;
  artist: string[];
  coverImage: string;
  sourceUrl: string;
  composer: string[] | null;
  arranger: string[] | null;
  lyricist: string[] | null;
  token: getTrendingMusics_getTrendingMusics_musics_token;
}

export interface getTrendingMusics_getTrendingMusics {
  __typename: "GetAllMusicsOutput";
  ok: boolean;
  error: string | null;
  musics: getTrendingMusics_getTrendingMusics_musics[] | null;
}

export interface getTrendingMusics {
  getTrendingMusics: getTrendingMusics_getTrendingMusics;
}
