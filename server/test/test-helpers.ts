import path from 'path';
import { Product } from '../db/models/product.model';
import { User } from '../db/models/user.model';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { server } from '..';

export const clearDatabase = async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
};

export const setupConnection = async () => {
  await clearDatabase();
};

export const closeConnection = async () => {
  await clearDatabase();
  await mongoose.connection.close();
  server.close();
};
