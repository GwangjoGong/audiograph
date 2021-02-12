/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyInvestments
// ====================================================

export interface getMyInvestments_getMyInvestments_music_token {
  __typename: "Token";
  recentPrice: number | null;
}

export interface getMyInvestments_getMyInvestments_music {
  __typename: "Music";
  id: number;
  title: string;
  coverImage: string;
  sourceUrl: string;
  artist: string[];
  token: getMyInvestments_getMyInvestments_music_token;
}

export interface getMyInvestments_getMyInvestments {
  __typename: "Investment";
  id: number;
  amount: number;
  price: number;
  music: getMyInvestments_getMyInvestments_music;
}

export interface getMyInvestments {
  getMyInvestments: getMyInvestments_getMyInvestments[];
}
