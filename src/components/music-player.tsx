import { musicSourceVar } from "../apollo";

import playBtn from "../assets/play-btn.svg";
import pauseBtn from "../assets/pause.svg";
import closeBtn from "../assets/next.svg";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

import { useTimer } from "use-timer";

export const MusicPlayer = () => {
  const music = useReactiveVar(musicSourceVar);
  const audioRef = useRef<HTMLAudioElement>();

  const { time, start, pause, reset } = useTimer();

  const [isPlaying, setIsPlaying] = useState(false);

  const [totalTime, setTotalTime] = useState(0);

  const toggleIsPlay = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
        start();
      } else {
        audioRef.current.pause();
        pause();
      }
    }
    setIsPlaying((prev) => !prev);
  };

  const closePlayer = () => {
    musicSourceVar({
      sourceUrl: "",
      title: "",
      coverImage: "",
      artist: "",
    });
    setIsPlaying(false);
  };

  useEffect(() => {
    if (music.artist !== "") {
      audioRef.current?.play();
      reset();
      start();
      setIsPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music]);

  return (
    <div
      className={`w-full absolute left-0 ${
        music.sourceUrl !== "" ? "bottom-24" : "bottom-gone"
      } transition-all duration-700`}
    >
      <div className="shadow-mini rounded-md flex mx-3 bg-white">
        <div
          className="w-3/12 flex bg-center bg-cover"
          style={{ backgroundImage: `url(${music.coverImage})` }}
        ></div>
        <div className="w-9/12 h-full flex flex-col py-4 px-5 ">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <span>{music.title}</span>
              <span className="text-xs opacity-40">{music.artist}</span>
            </div>
            <div className="flex items-center">
              <div
                className="mx-2 w-8 h-8 bg-center cursor-pointer "
                style={{
                  backgroundImage: `url(${isPlaying ? pauseBtn : playBtn})`,
                }}
                onClick={toggleIsPlay}
              ></div>
              <div
                className="w-8 h-8 bg-cover bg-center cursor-pointer"
                style={{
                  backgroundImage: `url(${closeBtn})`,
                  transform: "rotate(90deg)",
                }}
                onClick={closePlayer}
              ></div>
            </div>
          </div>
          <div className="w-full mt-2 flex h-1 bg-gray-100 relative">
            <div
              className="bg-purple-800 transition-all duration-1000 ease-linear"
              style={{ width: `${(time * 100) / totalTime}%` }}
            ></div>
          </div>
          <audio
            src={music.sourceUrl}
            ref={(el) => {
              if (el) audioRef.current = el;
            }}
            onEnded={() => {
              setIsPlaying(false);
              pause();
            }}
            onChange={(e) => console.log(e)}
            onLoadedMetadata={() => {
              setTotalTime(Math.floor(audioRef.current?.duration!));
            }}
          />
          <div className="w-full mt-1 flex justify-between text-xs opacity-40">
            <span>0:{time < 10 ? `0${time}` : time}</span>
            <span>0:{totalTime < 10 ? `0${totalTime}` : totalTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
