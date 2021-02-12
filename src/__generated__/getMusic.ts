/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetMusicInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMusic
// ====================================================

export interface getMusic_getMusic_music_token {
  __typename: "Token";
  id: number;
  stock: number | null;
  recentPrice: number | null;
}

export interface getMusic_getMusic_music {
  __typename: "Music";
  title: string;
  artist: string[];
  coverImage: string;
  copyrightPeriod: string | null;
  copyrightTrust: string | null;
  representativeTrustee: string | null;
  publishDate: any | null;
  token: getMusic_getMusic_music_token;
}

export interface getMusic_getMusic {
  __typename: "GetMusicOutput";
  ok: boolean;
  error: string | null;
  music: getMusic_getMusic_music | null;
}

export interface getMusic {
  getMusic: getMusic_getMusic;
}

export interface getMusicVariables {
  input: GetMusicInput;
}
