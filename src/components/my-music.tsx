import { React } from "@ungap/global-this";

import { musicSourceVar } from "../apollo";
import { getMyInvestments_getMyInvestments_music } from "../__generated__/getMyInvestments";

interface IProps {
  music: getMyInvestments_getMyInvestments_music;
  amount: number;
}

export const MyMusic: React.FC<IProps> = ({ music, amount }) => {
  const openSample = () => {
    if (musicSourceVar().title !== music.title) {
      musicSourceVar({
        title: music.title,
        sourceUrl: music.sourceUrl,
        coverImage: music.coverImage,
        artist: music.artist.join(", "),
      });
    }
  };

  return (
    <div
      className={`w-full transition-all duration-700 cursor-pointer  flex items-center  px-4 py-4 hover:bg-purple-100`}
      onClick={openSample}
    >
      <div
        className={`w-12 h-12 rounded-full shadow-none bg-contain bg-center`}
        style={{ backgroundImage: `url(${music.coverImage})` }}
      ></div>
      <div className="flex flex-col ml-4">
        <span className="text-sm">{music.title}</span>
        <span className="text-xs opacity-40 mt-1">
          {music.artist?.join(", ")}
        </span>
      </div>

      <div className="ml-auto flex flex-col items-end">
        <span className="text-xs mt-1 text-purple-600">{amount} Shares</span>
      </div>
    </div>
  );
};
