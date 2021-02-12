/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum TokenStatus {
  Close = "Close",
  Investing = "Investing",
  Open = "Open",
}

export interface CreateAccountInput {
  email: string;
  password: string;
}

export interface CreateInvestmentInput {
  amount: number;
  musicId: number;
}

export interface GetMusicInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
