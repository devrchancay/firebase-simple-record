import { db } from '../config/firebase';
import { decodeAudio } from '../utils/encode';

export async function requestAudios() {
  const doc = await db
    .collection('audios')
    .orderBy('date', 'desc')
    .get();
  let records: any = [];
  doc.forEach(doc => {
    const data = doc.data();

    const converterAudio = {
      id: doc.id,
      ...data,
      record: decodeAudio(data.record),
      date: data.date
    };
    records.push(converterAudio);
  });

  return records;
}

interface saveAudioParams {
  filename: string;
  record: any;
}

export async function saveAudio({ record, filename }: saveAudioParams) {
  const response = await db.collection('audios').add({
    record,
    filename,
    date: new Date()
  });
  return response;
}

export async function watchRecords() {
  db.collection('audios').onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      console.log(change.type, change.doc.id);
      if (change.type === 'added') {
        console.log('agregado', change.doc.data());
      }
      if (change.type === 'modified') {
        console.log('modified', change.doc.data());
      }
    });
  });
}

export async function deleteRecord(id: string) {
  await db
    .collection('audios')
    .doc(id)
    .delete();
}
