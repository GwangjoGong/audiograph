import { gql, useQuery } from "@apollo/client";
import { MyMusic } from "../components/my-music";
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
        <div className="mt-3 shadow-drop rounded-md">
          <div className="text-sm py-5 px-4">my songs</div>
          {data?.getMyInvestments.length === 0 && <div>No songs yet :(</div>}
          {data?.getMyInvestments.map((inv) => (
            <MyMusic music={inv.music} amount={inv.amount} />
          ))}
        </div>
      </div>
    </div>
  );
};
