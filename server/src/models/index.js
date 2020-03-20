import mongoose from 'mongoose';

import Records from './Records';

const connectDb = () => {
  if (process.env.DATABASE_URL) {
    return mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true
    });
  }
};

const models = { Records };

export { connectDb };

export default models;
