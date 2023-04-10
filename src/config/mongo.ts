import mongoose from 'mongoose';
import bluebird from 'bluebird';

export const connectDatabase = () => {
  mongoose.Promise = bluebird;
  mongoose.set('strictQuery', true); // any query that includes fields that are not defined in the schema will throw an error
  mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`).then(() => {
    console.log('Database connection created');
  });
};
