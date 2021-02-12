import {
  gql,
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { buyMusicVar, modalOpenVar } from "../apollo";

import {
  createInvestment,
  createInvestmentVariables,
} from "../__generated__/createInvestment";
import { getAccountBalance } from "../__generated__/getAccountBalance";
import { getMusic, getMusicVariables } from "../__generated__/getMusic";
import { FormError } from "./form-error";

const GET_MUSIC_QUERY = gql`
  query getMusic($input: GetMusicInput!) {
    getMusic(input: $input) {
      ok
      error
      music {
        title
        artist
        coverImage
        copyrightPeriod
        copyrightTrust
        representativeTrustee
        publishDate

        token {
          id
          stock
          recentPrice
        }
      }
    }
  }
`;

export const GET_ACCOUNT_BALANCE = gql`
  query getAccountBalance {
    getAccountBalance {
      ok
      error
      accountBalance
    }
  }
`;

const CREATE_INVESTMENT_MUTATION = gql`
  mutation createInvestment($input: CreateInvestmentInput!) {
    createInvestment(input: $input) {
      ok
      error
    }
  }
`;

export const BuyModal = () => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const isOpen = useReactiveVar(modalOpenVar);
  const musicId = useReactiveVar(buyMusicVar);

  const [getMusic, { data: musicData }] = useLazyQuery<
    getMusic,
    getMusicVariables
  >(GET_MUSIC_QUERY, {
    variables: {
      input: {
        id: musicId,
      },
    },
  });

  const { data: accountBalanceData } = useQuery<getAccountBalance>(
    GET_ACCOUNT_BALANCE
  );

  const [invest, { loading }] = useMutation<
    createInvestment,
    createInvestmentVariables
  >(CREATE_INVESTMENT_MUTATION, {
    onCompleted: (data) => {
      if (!data.createInvestment.ok) {
        setError(data.createInvestment.error!);
      } else {
        closeModal();
        window.location.reload();
      }
    },
  });

  const closeModal = () => {
    modalOpenVar(false);
  };

  const doInvestment = () => {
    invest({
      variables: {
        input: {
          amount,
          musicId,
        },
      },
    });
  };

  const buyableStock = Math.floor(
    accountBalanceData?.getAccountBalance.accountBalance! /
      musicData?.getMusic.music?.token.recentPrice!
  );

  const availableStock =
    buyableStock > musicData?.getMusic.music?.token.stock!
      ? musicData?.getMusic.music?.token.stock
      : buyableStock;

  useEffect(() => {
    if (musicId > 0) {
      getMusic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicId]);

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          maxWidth: "640px",
          height: "fit-content",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0px 4px 10px 6px rgba(188, 190, 206, 0.2)",
          border: "none",
        },
      }}
      closeTimeoutMS={500}
      contentLabel="Test"
    >
      <div className="w-full flex justify-between">
        <h2 className="font-medium text-xl">Invest</h2>
      </div>
      <div className="mt-4 flex">
        <div
          className="w-24 h-24 bg-cover bg-center"
          style={{
            backgroundImage: `url(${musicData?.getMusic.music?.coverImage})`,
          }}
        ></div>
        <div className="ml-4 flex-1 flex flex-col justify-center">
          <span className="text-2xl font-medium">
            {musicData?.getMusic.music?.title}
          </span>
          <span className="text-lg mt-4 opacity-40">
            {musicData?.getMusic.music?.artist.join(", ")}
          </span>
        </div>
      </div>
      <table className="w-full mt-4">
        <tbody>
          <tr>
            <th className="text-left font-medium">Copyright Period</th>
            <td className="font-light">
              {musicData?.getMusic.music?.copyrightPeriod}
            </td>
          </tr>
          <tr>
            <th className="text-left font-medium">Copyright Trust</th>
            <td className="font-light">
              {musicData?.getMusic.music?.copyrightTrust}
            </td>
          </tr>
          <tr>
            <th className="text-left font-medium">Representative Trustee</th>
            <td className="font-light">
              {musicData?.getMusic.music?.representativeTrustee}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-12 flex flex-col items-end">
        <span className="mb-2 opacity-40">
          Total {availableStock} shares available
        </span>
        <div className="mb-2">
          <span className="font-medium mr-4">Amount</span>
          <input
            className="input w-24"
            type="number"
            value={amount}
            min="0"
            onChange={(e) => {
              if (+e.target.value > availableStock!) {
                return;
              }
              setAmount(+e.target.value);
            }}
          />
        </div>
        <div className="mb-2 flex">
          <span className="font-medium mr-4">Price per share</span>
          <div className="w-24 text-right">
            {musicData?.getMusic.music?.token.recentPrice}Hbar
          </div>
        </div>
        <div className="mt-4 flex">
          <span className="font-medium mr-4">Total cost</span>
          <div className="w-24 text-right text-purple-600">
            {musicData?.getMusic.music?.token.recentPrice! * amount}Hbar
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <FormError errorMessage={error} />
      </div>
      <div className="mt-4 flex justify-between">
        <button className="btn" onClick={closeModal}>
          Cancel
        </button>
        <button
          disabled={amount === 0 || loading}
          className="btn"
          onClick={doInvestment}
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      </div>
    </Modal>
  );
};
