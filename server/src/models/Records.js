import mongoose from 'mongoose';

const RecordSchema = mongoose.Schema({
  filename: String,
  record: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Record = mongoose.model('Record', RecordSchema);
export default Record;
