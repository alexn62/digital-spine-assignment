import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { seed } from './seeding/seed';
import { router } from './router';
import { errorHandler } from './middlewares/error-handling.middleware';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';

dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) });

const app = express();

const mongoURI = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const connectMongo = mongoose.connect(mongoURI).then((m) => m.connection.getClient());

// seed the database with some data
seed();

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);

// app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    cookie: {
      // sameSite: 'none',
      secure: process.env.NODE_ENV === 'prod',
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: new MongoStore({
      clientPromise: connectMongo,
    }),
  })
);

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

export const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
