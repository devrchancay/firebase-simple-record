declare global {
  interface Window {
    MediaRecorder: any;
  }
}

interface startRecordingResponse {
  mediaStream: any;
  recorder: any;
}

async function startRecording(): Promise<startRecordingResponse | undefined> {
  try {
    const options = {
      audioBitsPerSecond: 256000,
      videoBitsPerSecond: 2500000,
      bitsPerSecond: 2628000,
      mimeType: `audio/mpeg`
    };

    const constraints = { audio: true };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    const recorder = new window.MediaRecorder(mediaStream, options);

    return { recorder, mediaStream };
  } catch (e) {
    alert(JSON.stringify(e));
  }
}

function processAudio(chunks: any[]): string {
  const blob = new Blob(chunks, {
    type: 'audio/wav'
  });
  const url = window.URL.createObjectURL(blob);
  return url;
}

const audio = { startRecording, processAudio };

export default audio;
