import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { seed } from './seeding/seed';
import { router } from './router';
import { errorHandler } from './middlewares/error-handling.middleware';

dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) });

const app = express();

const connectMongo = async () => {
  const mongoURI = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  try {
    await mongoose.connect(mongoURI);
    console.log(`Mongo connected @ ${mongoURI}`);
  } catch (e) {
    console.log(e);
  }
};
connectMongo();

// seed the database with some data
seed();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

export const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
