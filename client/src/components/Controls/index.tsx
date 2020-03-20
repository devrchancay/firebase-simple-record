import React from 'react';

import Button from '../Button';
import audio from '../../utils/audio';
import { saveAudio } from '../../utils/db';
import Modal from '../Modal';
import { decodeAudio } from '../../utils/encode';

interface ControlProps {
  addTrack: (track: any) => void;
}

const Controls = ({ addTrack }: ControlProps) => {
  const [recording, setRecording] = React.useState(false);
  const [media, setMedia] = React.useState();
  const [currentRecord, setCurrentRecord] = React.useState(new FormData());
  const [isOpen, setOpen] = React.useState(false);

  const onCancel = () => {
    setOpen(false);
    setCurrentRecord(new FormData());
  };

  const saveRecord = async (title: string) => {
    const form = currentRecord;
    form.append('filename', title);
    const response = await saveAudio(form);
    response.record = decodeAudio(response.record);
    addTrack(response);
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
            const form = new FormData();
            const blob = new Blob(chunks, { type: 'audio/wav' });
            form.append('audio', blob, 'nuevo audio');
            setCurrentRecord(form);
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
