import { User } from '../db/models/user.model';
import { userMocks } from './mocks/user.mocks';
import request from 'supertest';
import { server } from '../index';
import { LOGGED_IN, USER_CREATED } from '../shared/success-messages';
import {
  INVALID_EMAIL_ERROR,
  INVALID_EMAIL_OR_PASSWORD_ERROR,
  INVALID_PASSWORD_ERROR,
  USER_ALREADY_EXISTS_ERROR,
} from '../shared/errors/error-messages';
import mongoose from 'mongoose';
import { clearDatabase } from './test-helpers';

describe('POST /login', () => {
  beforeAll(async () => {
    await clearDatabase();
    await request(server).post('/api/register').send(userMocks.user);
  });

  afterAll((done) => {
    mongoose.connection.close().then(() => {
      server.close();
      return done();
    });
  });

  it('User should be able to login through http requests', async () => {
    const response = await request(server).post('/api/login').send(userMocks.user);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(LOGGED_IN);
    const users = await User.find({});
    expect(users.length).toBe(1);
  });

  it('User should not be able to login with an invalid email', async () => {
    const response = await request(server).post('/api/login').send({
      email: 'invalidEmail',
      password: userMocks.password,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(INVALID_EMAIL_OR_PASSWORD_ERROR);
    const users = await User.find({});
    expect(users.length).toBe(1);
  });

  it('User should not be able to login with an invalid password', async () => {
    const response = await request(server).post('/api/login').send({
      email: userMocks.email,
      password: 'wrongPassowrd',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(INVALID_EMAIL_OR_PASSWORD_ERROR);
    const users = await User.find({});
    expect(users.length).toBe(1);
  });

  it('Response should have a session cookie', async () => {
    const response = await request(server).post('/api/login').send(userMocks.user);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(LOGGED_IN);
    expect(response.headers['set-cookie']).toBeDefined();
    const user = await User.findOne({
      email: userMocks.email,
    });
    const session = response.headers['set-cookie'][0];
    expect(session).toMatch(/connect.sid/);
    const sessions = await mongoose.connection.db.collection('sessions').find({}).toArray();
    const userSession = JSON.parse(sessions[0].session);
    expect(userSession.uid).toBe(user._id.toString());
  });
});
