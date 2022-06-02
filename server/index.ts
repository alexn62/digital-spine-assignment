import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { seed } from './seeding/seed';

dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) });

const app = express();

const connectMongo = async () => {
  const mongoURI = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  try {
    await mongoose.connect(mongoURI);
    console.log('Mongo connected');
  } catch (e) {
    console.log(e);
  }
};
connectMongo();
// seed the database with some data
seed();

const server = app.listen(() => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
