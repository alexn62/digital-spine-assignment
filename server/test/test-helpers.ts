import mongoose from 'mongoose';
import { server } from '..';

export const clearDatabase = async () => {
  await mongoose.connection.dropDatabase();
};

// export const setupConnection = async () => {
//   await clearDatabase();
// };

export const closeConnection = async () => {
  await clearDatabase();
  await mongoose.connection.close();
};
