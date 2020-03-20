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
  updateName: (id: string, filename: string) => void;
}

const PlayList = ({
  tracks,
  trackActive,
  setTrack,
  addTrack,
  updateName
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
                  id={audio.id}
                  date={audio.date}
                  isActive={audio.id === trackActive}
                  filename={audio.filename}
                  updateName={updateName}
                />
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default PlayList;
