import mongoose from 'mongoose';

export const clearDatabase = async () => {
  await mongoose.connection.dropDatabase();
};

export const closeConnection = async () => {
  await clearDatabase();
  await mongoose.connection.close();
};
