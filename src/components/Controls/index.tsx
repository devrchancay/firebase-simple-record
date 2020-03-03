import React from 'react';

import Button from '../Button';
import audio from '../../utils/audio';
import { encodeAudio, decodeAudio } from '../../utils/encode';
import { saveAudio } from '../../utils/db';
import Modal from '../Modal';

interface ControlProps {
  addTrack: (track: any) => void;
}

const Controls = ({ addTrack }: ControlProps) => {
  const [recording, setRecording] = React.useState(false);
  const [media, setMedia] = React.useState();
  const [currentRecord, setCurrentRecord] = React.useState();
  const [isOpen, setOpen] = React.useState(false);

  const onCancel = () => {
    setOpen(false);
    setCurrentRecord(null);
  };

  const saveRecord = async (title: string) => {
    const record = await saveAudio({
      record: currentRecord.record,
      filename: title
    });

    addTrack({
      record: decodeAudio(currentRecord.record),
      filename: title,
      id: record.id
    });
    setOpen(false);
  };

  const startRecording = async () => {
    try {
      let chunks: any = [];
      setRecording(true);
      const r = await audio.startRecording();
      if (r && r.recorder) {
        r.recorder.addEventListener('dataavailable', async (e: any) => {
          chunks.push(e.data);
          if (r.recorder.state === 'inactive') {
            const base64 = await encodeAudio(chunks);
            setCurrentRecord({
              record: base64
            });
            setOpen(true);
          }
        });
        r.recorder.start(1000);
        setMedia(r);
      }
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  const stopRecording = () => {
    setRecording(false);
    media.recorder.stop();
    media.mediaStream.getAudioTracks()[0].stop();
  };

  return (
    <React.Fragment>
      {isOpen && (
        <Modal
          title="Guardar archivo como"
          onAccept={saveRecord}
          onCancel={onCancel}
        />
      )}
      <div className="w-full shadow-lg bg-gray-900">
        <div className="flex justify-around  py-4">
          <div className="flex justify-center px-4">
            {recording ? (
              <Button onClick={stopRecording} variant="red" label="Stop" />
            ) : (
              <Button onClick={startRecording} variant="green" label="Record" />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Controls;
