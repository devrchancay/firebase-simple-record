import React from 'react';

import Audio from '../Audio';
import Controls from '../Controls';

type track = {
  id: string;
  filename: string;
  record: string;
};
interface PaylistProps {
  tracks: track[];
  trackActive: string;
  setTrack: (track: any) => void;
  addTrack: (track: any) => void;
}

const PlayList = ({
  tracks,
  trackActive,
  setTrack,
  addTrack
}: PaylistProps) => {
  return (
    <div>
      <div className="h-screen overflow-scroll">
        <Controls addTrack={addTrack} />
        {tracks &&
          tracks.map((audio: any) => {
            return (
              <button
                onClick={() => {
                  setTrack(audio);
                }}
                className="w-full flex flex-start text-left"
                key={audio.id}
              >
                <Audio
                  date={audio.date}
                  isActive={audio.id === trackActive}
                  filename={audio.filename}
                />
              </button>
            );
          })}

        {/* <Audio url={''} filename={'Record 1'} />
        <Audio url={''} filename={'Record 2'} />
        <Audio url={''} filename={'Record 3'} />
        <Audio url={''} filename={'Record 4'} />
        <Audio url={''} filename={'Record 5'} />
        <Audio url={''} filename={'Record 6'} />
        <Audio url={''} filename={'Record 7'} />
        <Audio url={''} filename={'Record 8'} />
        <Audio url={''} filename={'Record 9'} />
        <Audio url={''} filename={'Record 10'} /> */}
      </div>
    </div>
  );
};

export default PlayList;
