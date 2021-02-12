/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateInvestmentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createInvestment
// ====================================================

export interface createInvestment_createInvestment {
  __typename: "CreateInvestmentOutput";
  ok: boolean;
  error: string | null;
}

export interface createInvestment {
  createInvestment: createInvestment_createInvestment;
}

export interface createInvestmentVariables {
  input: CreateInvestmentInput;
}
