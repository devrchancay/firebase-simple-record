import React from 'react';
import Play from '../Icons/Play';
import Pause from '../Icons/Pause';
import format from '../../utils/format';

interface track {
  id: string;
  filename: string;
  record: string;
  removeTrack: (id: string) => void;
}

const Player = ({ id, filename, record, removeTrack }: track) => {
  const ref = React.createRef<HTMLAudioElement>();
  const [playing, setPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState('0:00');
  const [currentTime, setCurrentTime] = React.useState('0:00');
  const [progress, setProgress] = React.useState(0);

  const handleAudio = () => {
    const audio = ref.current;
    let interval: any;
    if (audio?.paused) {
      audio?.play();
      interval = setInterval(() => {
        const current = audio.currentTime;
        setCurrentTime(format(current));
        setProgress((current * 100) / audio.duration);
      }, 1000);
    } else {
      audio?.pause();
      setPlaying(false);
      clearInterval(interval);
    }
  };

  return (
    <div className="w-full bg-gray-900">
      <div className="flex justify-center md:h-screen border border-gray-800 bg-gray-800 py-8 md:py-4">
        <div className="w-11/12 md:w-1/2 flex justify-center items-center content-center flex-col">
          <div
            style={{
              backgroundImage: `linear-gradient(224deg,#B298FF 0%,#7A5EFF 100%)`
            }}
            className="w-20 h-20 rounded-full flex  justify-center content-center item-center hover:bg-gray-800 cursor-pointer"
          >
            <div className="w-12 h-12 flex justify-center items-center content-center pt-5 mt-1 pl-2">
              <button onClick={handleAudio}>
                {playing ? <Pause /> : <Play />}
              </button>
            </div>
          </div>
          {!!id && (
            <>
              <h1 className="text-white my-4 text-xl text-center">
                {filename}
              </h1>
              <div className="w-full flex justify-center items-center content-center">
                <p className="text-gray-500 mx-2">{currentTime}</p>
                <div className="h-2 bg-gray-700 w-1/2">
                  <div
                    style={{
                      width: `${progress}%`,
                      backgroundImage: `linear-gradient(224deg,#B298FF 0%,#7A5EFF 100%)`
                    }}
                    className="h-full"
                  />
                </div>
                <p className="text-gray-500 mx-2">{duration}</p>
              </div>
              <div className="flex">
                <button
                  onClick={() => {
                    removeTrack(id);
                  }}
                  className="py-2 text-white hover:underline mx-2"
                >
                  Eliminar
                </button>
                <a
                  href={record}
                  className="py-2 text-white hover:underline mx-2"
                >
                  Descargar
                </a>
              </div>
            </>
          )}
        </div>
        <audio
          src={record}
          ref={ref}
          onCanPlay={() => {
            if (ref.current && ref.current.duration) {
              setDuration(`${format(ref.current.duration)}`);
            }
          }}
          onPlay={() => {
            setPlaying(true);
          }}
          onEnded={() => {
            setPlaying(false);
          }}
        />
      </div>
    </div>
  );
};

export default Player;
