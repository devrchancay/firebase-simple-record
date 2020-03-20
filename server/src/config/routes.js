import express from 'express';
import models from '../models';

const router = express.Router();

router.get('/records', async (request, response) => {
  const doc = await models.Records.find().limit(10);

  return response.json(
    doc.map(d => ({
      filename: d.filename,
      id: d._id,
      record: d.record.data
      // .data.toString('base64')
    }))
  );
});

router.post('/records', async (request, response) => {
  const buffer = Buffer.from(request.body.record, 'base64');
  const payload = {
    ...request.body,
    record: {
      data: buffer
    }
  };
  await models.Records.create(payload);

  response.json(payload);
});
router.delete('/records', (request, response) => {});
router.put('/records', (request, response) => {});

export default router;
