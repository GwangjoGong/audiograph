import { gql, useQuery } from "@apollo/client";
import { LogoutButton } from "../components/logout-btn";
import { MyMusic } from "../components/my-music";
import { getMyInvestments } from "../__generated__/getMyInvestments";

export const MY_INVESTMENTS_QUERY = gql`
  query getMyInvestments {
    getMyInvestments {
      id
      amount
      price
      music {
        id
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
        <div className="w-full flex justify-between items-center mt-3">
          <h2 className="font-medium text-xl">play</h2>
          <LogoutButton />
        </div>
        <div className="mt-3 shadow-drop rounded-md">
          <div className="text-sm  py-5 px-4">my songs</div>
          {data?.getMyInvestments.length === 0 && <div>No songs yet :(</div>}
          {data?.getMyInvestments.map((inv) => (
            <MyMusic music={inv.music} amount={inv.amount} />
          ))}
        </div>
      </div>
    </div>
  );
};
