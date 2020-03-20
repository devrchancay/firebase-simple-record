import mongoose from 'mongoose';

const RecordSchema = mongoose.Schema({
  filename: String,
  record: {
    data: Buffer
  },
  date: Date
});

const Record = mongoose.model('Record', RecordSchema);
export default Record;
