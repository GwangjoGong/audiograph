import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_BALANCE } from "../components/buy-modal";
import { MY_INVESTMENTS_QUERY } from "./play";
import { getAccountBalance } from "../__generated__/getAccountBalance";

import { getMyInvestments } from "../__generated__/getMyInvestments";
import { useEffect, useState } from "react";
import { ManagedMusic } from "../components/managed-music";
import { LogoutButton } from "../components/logout-btn";

export type InvestedMusic = {
  id: number;
  title: string;
  artist: string;
  coverImage: string;
  recentPrice: number;
  price: number;
  amount: number;
};

export const Manage = () => {
  const [investments, setInvestments] = useState<InvestedMusic[]>([]);

  const { data: accountBalance } = useQuery<getAccountBalance>(
    GET_ACCOUNT_BALANCE
  );

  const { data: investmentData } = useQuery<getMyInvestments>(
    MY_INVESTMENTS_QUERY
  );

  const getMappedInvestments = () => {
    const result: InvestedMusic[] = [];
    for (const investment of investmentData?.getMyInvestments!) {
      const { id, title, coverImage, token, artist } = investment.music;
      const existingInvest = result.find((i) => i.id === investment.music.id);
      if (existingInvest) {
        existingInvest.amount += investment.amount;
      } else {
        const newInvest: InvestedMusic = {
          id,
          title,
          coverImage,
          artist: artist.join(", "),
          recentPrice: token.recentPrice!,
          price: investment.price,
          amount: investment.amount,
        };
        result.push(newInvest);
      }
    }
    setInvestments(result);
  };

  const getTotalAsset = () => {
    return investments.reduce((acc, curr) => {
      return acc + curr.recentPrice * curr.amount;
    }, accountBalance?.getAccountBalance.accountBalance || 0);
  };

  const getTotalAssetRatio = () => {
    const totalAsset = getTotalAsset();
    const originalAsset = investments.reduce((acc, curr) => {
      return acc + curr.price * curr.amount;
    }, accountBalance?.getAccountBalance.accountBalance || 0);

    return (
      Math.floor(((totalAsset - originalAsset) * 10000) / originalAsset) / 100
    );
  };

  useEffect(() => {
    if (investmentData) {
      getMappedInvestments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investmentData]);

  return (
    <div
      className="container overflow-auto relative "
      style={{ height: `${window.innerHeight}px` }}
    >
      <div className="w-full">
        <div className="w-full flex justify-between items-center mt-3">
          <h2 className="ont-medium text-xl">manage</h2>
          <LogoutButton />
        </div>
        <div className="mt-3 shadow-mini rounded-md py-5 px-4 text-center">
          <div className="text-sm font-medium text-purple-600 mb-3">
            Total Asset
          </div>
          <div className="text-md">
            {getTotalAsset()} Hbar ({getTotalAssetRatio()}%)
          </div>
          <div className="text-sm font-medium text-purple-600 mt-5 mb-3">
            Account Balance
          </div>
          <div className="text-md">
            {accountBalance?.getAccountBalance.accountBalance} Hbar
          </div>
        </div>
        <div className="mt-3 shadow-drop rounded-md py-5 px-4">
          <div className="text-sm mb-3">investments</div>
          {investments.map((i) => (
            <ManagedMusic music={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
