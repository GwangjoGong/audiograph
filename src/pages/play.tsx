import { gql, useQuery } from "@apollo/client";
import { getMyInvestments } from "../__generated__/getMyInvestments";

const MY_INVESTMENTS_QUERY = gql`
  query getMyInvestments {
    getMyInvestments {
      id
      amount
      price
      music {
        title
        coverImage
        sourceUrl
        artist
        token {
          recentPrice
        }
      }
    }
  }
`;

export const Play = () => {
  const { data } = useQuery<getMyInvestments>(MY_INVESTMENTS_QUERY);

  return (
    <div className="container overflow-auto relative">
      <div className="w-full">
        <h2 className="mt-3 font-medium text-xl">play</h2>
        <div className="mt-3 shadow-drop rounded-md py-5 px-4">
          <div className="text-sm mb-3">owned</div>
          {data?.getMyInvestments.length === 0 && <div>No songs yet :(</div>}
        </div>
      </div>
    </div>
  );
};
