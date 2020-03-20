import fetch from 'unfetch';
import env from './env';

export async function saveAudio(formData: any) {
  const response = await fetch(env.recordsEndPoint, {
    method: 'POST',
    body: formData
  });

  return response.json();
}

export async function deleteRecord(id: string) {
  try {
    await fetch(`${env.recordsEndPoint}/${id}`, {
      method: 'DELETE'
    });
  } catch (err) {}
}

export async function updateRecord(id: string, filename: string) {
  try {
    const form = new FormData();
    form.append('filename', filename);
    console.log(form);
    await fetch(`${env.recordsEndPoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ filename })
    });
  } catch (err) {}
}
