import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import browseIcon from "../assets/browse.svg";
import manageIcon from "../assets/manage.svg";
import playIcon from "../assets/play.svg";

export const TapBar = () => {
  const { pathname } = useLocation();
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    setKey(pathname);
  }, [pathname]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-16 shadow-tapbar bg-white">
      <div className="w-full h-full max-w-screen-sm mx-auto flex items-center justify-around ">
        <Link
          to="/browse"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
        >
          <img
            src={browseIcon}
            alt="link"
            style={{
              filter: `${key !== "/browse" ? "grayscale(1)" : "none"} `,
            }}
          />
        </Link>

        <Link
          to="/play"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
        >
          <img
            src={playIcon}
            alt="link"
            style={{ filter: `${key !== "/play" ? "grayscale(1)" : "none"} ` }}
          />
        </Link>

        <Link
          to="/manage"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
        >
          <img
            src={manageIcon}
            alt="link"
            style={{
              filter: `${key !== "/manage" ? "grayscale(1)" : "none"} `,
            }}
          />
        </Link>
      </div>
    </div>
  );
};
