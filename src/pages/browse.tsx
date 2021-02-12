import { gql, useQuery } from "@apollo/client";
import { BuyModal } from "../components/buy-modal";
import { InvestingMusic } from "../components/investing-music";
import { getRecentMusics } from "../__generated__/getRecentMusics";
import { getTrendingMusics } from "../__generated__/getTrendingMusics";
import { LogoutButton } from "../components/logout-btn";

const GET_TRENDING_MUSICS = gql`
  query getTrendingMusics {
    getTrendingMusics {
      ok
      error
      musics {
        id
        title
        artist
        coverImage
        sourceUrl
        composer
        arranger
        lyricist
        token {
          stock
          totalStock
          recentPrice
          initialPrice
          status
        }
      }
    }
  }
`;

const GET_RECENT_MUSICS = gql`
  query getRecentMusics {
    getRecentMusics {
      ok
      error
      musics {
        id
        title
        artist
        coverImage
        sourceUrl
        composer
        arranger
        lyricist
        token {
          stock
          totalStock
          recentPrice
          initialPrice
          status
        }
      }
    }
  }
`;

export const Browse = () => {
  const { data: trendingMusicsData } = useQuery<getTrendingMusics>(
    GET_TRENDING_MUSICS
  );
  const { data: recentMusicsData } = useQuery<getRecentMusics>(
    GET_RECENT_MUSICS
  );
  return (
    <div
      className="container overflow-auto relative"
      style={{ height: `${window.innerHeight}px` }}
    >
      <div className="w-full">
        <div className="w-full flex justify-between items-center mt-3">
          <h2 className="font-medium text-xl">browse</h2>
          <LogoutButton />
        </div>

        <div className="mt-3 shadow-drop rounded-md py-5 px-4">
          <div className="text-sm mb-3">top trending</div>
          {trendingMusicsData?.getTrendingMusics.musics?.map((music) => (
            <InvestingMusic music={music} key={music.id} />
          ))}
        </div>
        <div className="mt-12 shadow-drop rounded-md  py-5 px-4">
          <div className="text-sm mb-3">new arrivals</div>
          {recentMusicsData?.getRecentMusics.musics?.map((music) => (
            <InvestingMusic music={music} key={music.id} />
          ))}
        </div>
      </div>
      <BuyModal />
    </div>
  );
};
