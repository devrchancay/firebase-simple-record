function processFile(blob: any) {
  return new Promise(function(resolve) {
    const reader = new FileReader();
    reader.onload = function() {
      if (reader && typeof reader.result === 'string') {
        const b64 = reader.result.replace(/^data:.+;base64,/, '');
        resolve(b64);
      }
    };
    reader.readAsDataURL(blob);
  });
}

export async function encodeAudio(chunks: any[]) {
  const blob = new Blob(chunks, { type: 'audio/wav' });
  const base64 = await processFile(blob);
  return base64;
}

export function decodeAudio(base64: string) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: 'audio/wav' });
  const url = URL.createObjectURL(blob);
  return url;
}
