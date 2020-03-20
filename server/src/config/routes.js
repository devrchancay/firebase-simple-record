import express from 'express';
import multer from 'multer';
import fs from 'fs';

import models from '../models';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/records', async (request, response) => {
  const doc = await models.Records.find().limit(10);

  return response.json(
    doc
      .map(d => ({
        filename: d.filename,
        id: d._id,
        record: d.record.data.toString('base64'),
        date: d.date
      }))
      .sort((a, b) => b.date - a.date)
  );
});

router.post('/records', upload.single('audio'), async (request, response) => {
  try {
    const newRecord = new models.Records();
    newRecord.filename =
      request.body.filename || `nueva grabación ${new Date().toISOString()}`;
    newRecord.record.data = fs.readFileSync(request.file.path);
    newRecord.record.contentType = 'audio/wav';
    await newRecord.save();
    response.json({
      id: newRecord.id,
      filename: newRecord.filename,
      date: newRecord.date,
      record: newRecord.record.data.toString('base64')
    });
  } catch (err) {
    response.status(500).json({ error: 'Ocurrio un error inesperado' });
  }
});
router.delete('/records/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await models.Records.findByIdAndDelete(id);
    response.json('ok');
  } catch (err) {
    response.status(500).json({ error: 'Ocurrio un error inesperado' });
  }
});
router.put('/records/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { filename } = request.body;
    await models.Records.updateOne(
      { _id: id },
      { $set: { filename: filename } }
    );
    const record = await models.Records.findById(id);

    return response.json({
      id: record.id,
      filename: record.filename,
      date: record.date,
      record: record.record.data.toString('base64')
    });
  } catch (err) {
    response.status(500).json({ error: 'Ocurrio un error inesperado' });
  }
});

export default router;
