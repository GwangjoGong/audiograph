import chevronRight from "../assets/chevron-right.svg";
import { useState } from "react";
import { InvestedMusic } from "../pages/manage";

interface IProps {
  music: InvestedMusic;
}

export const ManagedMusic: React.FC<IProps> = ({ music }) => {
  const [open, setOpen] = useState(false);

  const toggleSection = () => {
    setOpen((prev) => !prev);
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
          <span className="text-xs opacity-40 mt-1">{music.artist}</span>
        </div>

        <div className="ml-auto flex flex-col items-end">
          <span className="text-xs mt-1 text-purple-600">
            {music.amount} Shares
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
        <table className="w-full mr-4">
          <tbody>
            <tr>
              <th className="font-medium text-right text-xs">Shares</th>
              <td className="font-light text-right text-xs">{music.amount}</td>
              <th className="font-medium text-right text-xs">Return</th>
              <td className="font-light text-right text-xs text-purple-600">
                {(music.recentPrice - music.price) * music.amount} Hbar (
                {Math.floor(
                  ((music.recentPrice - music.price) * 10000) / music.price
                ) / 100}
                %)
              </td>
            </tr>
            <tr>
              <th className="font-medium text-right text-xs">Avg cost</th>
              <td className="font-light text-right text-xs">
                {music.price} Hbar
              </td>

              <th className="font-medium text-right text-xs">Current Price</th>
              <td className="font-light text-right text-xs">
                {music.recentPrice} Hbar
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
