/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TokenStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getRecentMusics
// ====================================================

export interface getRecentMusics_getRecentMusics_musics_token {
  __typename: "Token";
  stock: number | null;
  totalStock: number;
  recentPrice: number | null;
  initialPrice: number;
  status: TokenStatus;
}

export interface getRecentMusics_getRecentMusics_musics {
  __typename: "Music";
  id: number;
  title: string;
  artist: string[];
  coverImage: string;
  sourceUrl: string;
  composer: string[] | null;
  arranger: string[] | null;
  lyricist: string[] | null;
  token: getRecentMusics_getRecentMusics_musics_token;
}

export interface getRecentMusics_getRecentMusics {
  __typename: "GetAllMusicsOutput";
  ok: boolean;
  error: string | null;
  musics: getRecentMusics_getRecentMusics_musics[] | null;
}

export interface getRecentMusics {
  getRecentMusics: getRecentMusics_getRecentMusics;
}
