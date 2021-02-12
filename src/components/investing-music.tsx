import { React } from "@ungap/global-this";
import { getTrendingMusics_getTrendingMusics_musics } from "../__generated__/getTrendingMusics";
import chevronRight from "../assets/chevron-right.svg";
import { useState } from "react";
import { buyMusicVar, modalOpenVar, musicSourceVar } from "../apollo";

interface IProps {
  music: getTrendingMusics_getTrendingMusics_musics;
}

export const InvestingMusic: React.FC<IProps> = ({ music }) => {
  const [open, setOpen] = useState(false);

  const toggleSection = () => {
    setOpen((prev) => !prev);
  };

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

  const openModal = () => {
    buyMusicVar(music.id);
    modalOpenVar(true);
  };

  return (
    <div
      className={`${
        open ? "h-48" : "h-16"
      } transition-all duration-700 overflow-hidden`}
    >
      <div className={`w-full flex items-center mb-8`}>
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
          <span className="text-sm">{`${music.token.stock}/${music.token.totalStock}`}</span>
          <span className="text-xs mt-1 text-purple-600">
            {music.token.recentPrice}Hbar
            <small className="opacity-40">/share</small>
          </span>
        </div>

        <div
          className="w-8 h-8 ml-2 rounded-full cursor-pointer bg-center bg-no-repeat transition-all"
          style={{
            backgroundImage: `url(${chevronRight})`,
            transform: `rotate(${open ? 90 : 0}deg)`,
          }}
          onClick={toggleSection}
        ></div>
      </div>

      <div className="flex align-end mb-6 transition-all duration-700 ease-in-out">
        <table className="w-8/12">
          <tbody>
            <tr>
              <th className="font-medium text-right text-xs">Artist</th>
              <td className="font-light text-center text-xs">
                {music.artist.join(", ")}
              </td>
            </tr>
            <tr>
              <th className="font-medium text-right text-xs">Composer</th>
              <td className="font-light text-center text-xs">
                {music.composer ? music.composer.join(", ") : "Unknown"}
              </td>
            </tr>
            <tr>
              <th className="font-medium text-right text-xs">Lyricist</th>
              <td className="font-light text-center text-xs">
                {music.lyricist ? music.lyricist.join(", ") : "Unknown"}
              </td>
            </tr>
            <tr>
              <th className="font-medium text-right text-xs">Arrager</th>
              <td className="font-light text-center text-xs">
                {music.arranger ? music.arranger.join(", ") : "Unknown"}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-4/12 flex flex-col items-end justify-end mr-4">
          <div
            className="btn w-20 text-center rounded-sm px-auto mb-auto"
            onClick={openSample}
          >
            SAMPLE
          </div>
          <div
            className="btn w-20 text-center rounded-sm px-auto"
            onClick={openModal}
          >
            INVEST
          </div>
        </div>
      </div>
    </div>
  );
};
